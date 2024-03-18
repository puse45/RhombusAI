import os

from django.conf import settings
from rest_framework import serializers


def validate_file_extension(value):
    """
    Validate that the file has a valid extension.
    """
    valid_extensions = settings.ALLOWED_DOCUMENT_IMPORT_EXTENSIONS
    extension = os.path.splitext(value.name)[1].lower()

    if extension not in valid_extensions:
        raise serializers.ValidationError(
            "Unsupported file extension. Supported extensions are: {}".format(
                ", ".join(valid_extensions)
            )
        )
