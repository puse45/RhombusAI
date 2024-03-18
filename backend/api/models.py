import uuid

from django.db import models
from timestampedmodel.models import TimestampedModel

from api.managers import BaseManager


# Create your models here.
class BaseModel(TimestampedModel):
    id = models.UUIDField(
        primary_key=True, editable=False, default=uuid.uuid4, db_index=True
    )
    is_archived = models.BooleanField(default=False)
    metadata = models.JSONField(default=dict, null=True, blank=True)
    objects = BaseManager()

    class Meta:
        abstract = True
        ordering = ("-updated_at", "-created_at")
        get_latest_by = ("updated_at",)
