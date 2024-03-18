from django.contrib import admin
from django.db import models
from django.utils.html import format_html
from django_json_widget.widgets import JSONEditorWidget

from documents.models import DocumentImport


# Register your models here.
@admin.register(DocumentImport)
class DocumentImportAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "status", "user", "created_at", "updated_at")
    search_fields = ("id", "name", "user__username")
    list_filter = ("created_at", "updated_at", "status")
    readonly_fields = ("file",)
    list_per_page = 50
    autocomplete_fields = ("user",)
    save_on_top = True
    formfield_overrides = {models.JSONField: {"widget": JSONEditorWidget}}

    @admin.display
    def file(self, obj):
        file_list = " ".join(
            [
                f'<dt><a href="{_.file.url}" target="_blank">{_.file_type.name}</a></dt>'
                for _ in obj.files.all()
            ]
        )
        html = f"<dl>{file_list}</dl>"
        return format_html(html)
