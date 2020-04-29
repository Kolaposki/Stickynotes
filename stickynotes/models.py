from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth.models import User
import random
import string
from django.template.defaultfilters import slugify


def random_string():
    """Generates 4 random alaphabets"""
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(4))


# Create your models here.
class Note(models.Model):
    manager = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=25, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    date_added = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)
    background_color = models.CharField(max_length=10)
    is_done = models.BooleanField(blank=True, null=True, default=False)
    link = models.CharField(null=False, max_length=20)

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.link:
            self.link = slugify(random_string())
        return super().save(*args, **kwargs)

    def note_link(self):
        """Returns any random 4 alphabets and append the note pk to it.
            Example:  'scro34' ==> 34 is the note id
        """
        return f"{random_string()}{self.title}"

    def get_absolute_url(self):
        return reverse('home')
