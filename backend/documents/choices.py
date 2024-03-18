from django.db.models import TextChoices
from django.utils.translation import gettext_lazy as _


class DocumentImportStatusesChoices(TextChoices):
    NEW = "new", _("New")
    PENDING = "pending", _("Pending")
    IN_PROGRESS = "in_progress", _("In Progress")
    COMPLETE = "complete", _("Complete")
    FAILED = "failed", _("Failed")
