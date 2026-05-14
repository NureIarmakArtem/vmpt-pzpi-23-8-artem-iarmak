from django.db import models

class Organization(models.Model):
    name = models.CharField(max_length=255, verbose_name="Назва організації")
    resources = models.TextField(verbose_name="Ресурси")
    volunteers_count = models.IntegerField(verbose_name="Кількість волонтерів")
    projects = models.TextField(verbose_name="Проекти")

    def __str__(self):
        return self.name

class Fundraiser(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='fundraisers')
    title = models.CharField(max_length=255, verbose_name="Назва збору")
    description = models.TextField(verbose_name="Опис збору")

    def __str__(self):
        return self.title