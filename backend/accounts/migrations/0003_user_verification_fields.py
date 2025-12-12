# Generated manually for email verification fields

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_pharmacistprofile_pharmacy'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='verification_code',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='verification_code_expires',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]




