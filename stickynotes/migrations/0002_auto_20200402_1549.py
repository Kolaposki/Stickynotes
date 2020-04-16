# Generated by Django 3.0.3 on 2020-04-02 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='background_color',
            field=models.CharField(default='white', max_length=25),
        ),
        migrations.AlterField(
            model_name='note',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='note',
            name='title',
            field=models.CharField(max_length=25),
        ),
    ]
