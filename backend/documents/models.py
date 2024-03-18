from django.contrib.auth import get_user_model
from django.db import models

from api.models import BaseModel
from documents.choices import DocumentImportStatusesChoices
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class DocumentImport(BaseModel):
    name = models.CharField(
        max_length=100,
        null=True,
        blank=True,
    )
    file = models.FileField(
        upload_to="imports/",
        null=False,
        blank=False,
        max_length=1000,
    )
    status = models.CharField(
        max_length=20,
        null=False,
        choices=DocumentImportStatusesChoices.choices,
        default=DocumentImportStatusesChoices.NEW,
    )
    column_data_types = models.JSONField(
        default=list,
        null=True,
        blank=True,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="document_imports",
        verbose_name=_("Owner"),
    )

    def __str__(self):
        return f"{self.id} - {self.name}"

    class Meta:
        verbose_name = _("Document Import")
        verbose_name_plural = _("Document Imports")
        get_latest_by = [
            "-name",
        ]
        ordering = [
            "-created_at",
        ]
