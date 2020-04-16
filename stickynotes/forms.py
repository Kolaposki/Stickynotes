"""
    name='forms',
    project='ideacloud'
    date='3/13/2020',
    author='Oshodi Kolapo',
"""

from .models import Note
from django import forms


class NoteForm(forms.ModelForm):
    title = forms.CharField(max_length=20, required=True, strip=True)
    description = forms.CharField(required=False)
    is_done = forms.BooleanField(required=False)
    new_dummy = forms.CharField(required=False)

    class Meta:
        model = Note
        fields = ('title', 'description', 'background_color', 'is_done', 'new_dummy')


class NoteForm2(forms.ModelForm):
    title = forms.CharField(max_length=20, required=True, strip=True)

    description = forms.CharField(required=False)

    background_color = forms.CharField(max_length=10, required=True, strip=True)

    is_done = forms.BooleanField(required=False)

    class Meta:
        model = Note
        fields = ('title', 'description', 'background_color', 'is_done')
