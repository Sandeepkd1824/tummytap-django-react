# Generated by Django 5.2.4 on 2025-07-31 19:16

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_remove_product_tags_delete_tag_product_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartitem',
            name='added_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
