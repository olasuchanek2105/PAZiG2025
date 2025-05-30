# Generated by Django 5.2 on 2025-05-07 21:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('listing_id', models.CharField(blank=True, max_length=20, null=True, unique=True)),
                ('user_id', models.IntegerField(blank=True, null=True)),
                ('category_id', models.CharField(blank=True, max_length=255, null=True)),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('status', models.CharField(blank=True, max_length=255, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('producent', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Orders',
        ),
        migrations.AddIndex(
            model_name='listing',
            index=models.Index(fields=['listing_id'], name='listings_li_listing_d29eec_idx'),
        ),
    ]
