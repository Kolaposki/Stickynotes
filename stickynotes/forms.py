"""
    name='forms',
    project='ideacloud'
    date='3/13/2020',
    author='Oshodi Kolapo',
"""

from .models import Note
from django import forms
# from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


# from django_registration.forms import RegistrationFormUniqueEmail


class NoteForm(forms.ModelForm):
    title = forms.CharField(max_length=20, required=True, strip=True)
    description = forms.CharField(required=False)

    class Meta:
        model = Note
        fields = ('title', 'description', 'background_color', 'is_done', 'new_dummy')


"""
class RegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]
"""
