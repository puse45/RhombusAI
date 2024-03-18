from django.db import models


class BaseModelQuerySet(models.QuerySet):
    def archive(self):
        self.update(is_archived=True)

    def active(self):
        return self.filter(is_archived=False)

    def delete(self):
        deleted = self.update(is_archived=True)
        return deleted, True


class BaseManager(models.Manager):
    """
    Manager to enable archiving.
    """

    def get_queryset(self):
        return BaseModelQuerySet(self.model, using=self._db).active()

    def active(self):
        return self.get_query_set().active()

    def archived(self):
        return self.get_query_set().archived()
