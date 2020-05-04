from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth.models import User
import random
import string
from django.template.defaultfilters import slugify
from django.conf import settings


# Extending user model so as edit profile
class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=True, null=True)
    photo = models.ImageField(upload_to='users/%Y/%m/%d', blank=True)

    def __str__(self):
        return f'Profile for user {self.user.username}'

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
            # generate 4 random alphabets then set it to be the note link
            self.link = slugify(random_string())
        return super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('home')