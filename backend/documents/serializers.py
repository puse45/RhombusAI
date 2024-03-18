from collections import Counter
from django.conf import settings
from rest_framework import serializers

from documents.helpers.infer_data_types import process_file
from documents.models import DocumentImport
from documents.validators import validate_file_extension
from documents.choices import DocumentImportStatusesChoices


class DocumentImportSerializer(serializers.ModelSerializer):
    file = serializers.FileField(
        max_length=1000, allow_empty_file=False, validators=[validate_file_extension]
    )

    class Meta:
        model = DocumentImport
        fields = (
            "id",
            "name",
            "file",
            "status",
            "is_archived",
            "column_data_types",
            "created_at",
        )

    def validate_file(self, value):
        if value.content_type not in [
            "text/csv",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
        ]:
            raise serializers.ValidationError("File type not supported")
        return value

    def process_chunk_data(self, validated_data):
        file = validated_data.get("file")
        chunk_size = settings.DOCUMENT_CHUNK_SIZE
        if file:
            df_chunks = process_file(file, chunk_size=chunk_size)
            chunk_data_type = dict()
            chunk_list = list()
            most_common_values = dict()
            try:
                for count, df_chunk in enumerate(df_chunks, start=1):
                    try:
                        chunk_data_type[count] = {
                            key: value.__str__()
                            for key, value in df_chunk.dtypes.to_dict().items()
                        }
                        chunk_list.append(
                            {
                                key: value.__str__()
                                for key, value in df_chunk.dtypes.to_dict().items()
                            }
                        )
                    except AttributeError:
                        pass
                if chunk_data_type:
                    # Use Counter to find the most common value for each key
                    most_common_values = {
                        key: Counter(d[key] for d in chunk_list).most_common(1)[0][0]
                        for key in chunk_data_type[1].keys()
                    }
                validated_data["status"] = DocumentImportStatusesChoices.COMPLETE
                validated_data["column_data_types"] = most_common_values
            except Exception as e:
                validated_data["status"] = DocumentImportStatusesChoices.FAILED
                validated_data["column_data_types"] = [{"error": str(e)}]
        return validated_data

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        processed_validated_data = self.process_chunk_data(validated_data)
        return super().create(processed_validated_data)

    def update(self, instance, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        _column_data_types = validated_data.pop("column_data_types", None)

        processed_validated_data = self.process_chunk_data(validated_data)
        if _column_data_types:
            db_column_data_types = instance.column_data_types
            if isinstance(db_column_data_types, dict):
                db_column_data_types.update({**_column_data_types})
                validated_data["column_data_types"] = db_column_data_types
            else:
                validated_data["column_data_types"] = _column_data_types
        return super().update(instance, processed_validated_data)

    def validate(self, attrs):
        file = attrs.get("file")
        if self.instance:
            if self.instance.status == DocumentImportStatusesChoices.COMPLETE and file:
                raise serializers.ValidationError(
                    {"error": "File process completed. Cannot update."}
                )
        return attrs
