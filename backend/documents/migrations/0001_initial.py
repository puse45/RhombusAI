# Generated by Django 5.0.3 on 2024-03-13 09:53

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DocumentImport',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('is_archived', models.BooleanField(default=False)),
                ('metadata', models.JSONField(blank=True, default=dict, null=True)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('file', models.FileField(max_length=1000, upload_to='imports/')),
                ('status', models.CharField(choices=[('new', 'New'), ('pending', 'Pending'), ('in_progress', 'In Progress'), ('complete', 'Complete'), ('failed', 'Failed')], default='new', max_length=20)),
                ('column_data_types', models.JSONField(blank=True, default=list, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='document_imports', to=settings.AUTH_USER_MODEL, verbose_name='Owner')),
            ],
            options={
                'verbose_name': 'Document Import',
                'verbose_name_plural': 'Document Imports',
                'ordering': ['-created_at'],
                'get_latest_by': ['-name'],
            },
        ),
    ]