from django.shortcuts import render, get_object_or_404, redirect, HttpResponseRedirect
from .models import Note
from .forms import *
from django.http import JsonResponse
from django.http import QueryDict
from django.views.decorators.csrf import csrf_protect


def index(request):
    form = NoteForm()
    up_form = NoteForm2()

    # Creating note
    if request.is_ajax() and 'new_dummy' in request.POST:
        print("THIS REQUEST IS AJAX and FROM NEW DUMMY")
        form = NoteForm(request.POST)

        if request.method == 'POST':
            if form.is_valid():
                note_form = form.save()
                note_pk = note_form.pk

                title = request.POST.get('title')
                description = request.POST.get('description')
                background_color = request.POST.get('background_color')

                data = {}
                data['message'] = 'form note is created'
                data['title'] = title
                data['description'] = description
                data['background_color'] = background_color
                data['note_pk'] = note_pk

                return JsonResponse(data)

    # Updating note

    if request.is_ajax() and 'new_dummy' not in request.POST:
        print("THIS REQUEST IS AJAX AND REQUESTING TO UPDATE OR DELETE")

        if request.method == 'POST':
            print("REQUEST IS POST")
            # note_id = int(QueryDict(request.body).get('note_id'))
            note_id = request.POST.get('note_id')
            print("NOTED-ID: ", note_id)

            obj = get_object_or_404(Note, id=note_id)
            print(f"Here is object: {obj}")
            up_form = NoteForm2(request.POST or None, instance=obj)
            if up_form.is_valid():
                print("UPDATE FORM IS VALID")

                data = {}
                title = request.POST.get('title')
                up_form.save()
                print(f"Updated Note: {obj}")

                data['message'] = 'form note is updated'
                data['note_pk'] = note_id
                data['title'] = title

                return JsonResponse(data)

        elif request.method == 'DELETE':
            print("REQUEST IS DELETE")
            note_id = int(QueryDict(request.body).get('note_id'))
            print("NOTED-ID: ", note_id)

            new_id = Note.objects.get(pk=int(QueryDict(request.body).get('note_id')))
            print("NEW ID: ", new_id)

            obj = get_object_or_404(Note, id=note_id)
            print(f"Here is object to delete: {obj}")

            data = {}
            data['message'] = 'Note successfully deleted'
            data['note_pk'] = note_id
            data['title'] = obj.title

            obj.delete()
            print("NOTE DELETED")

            return JsonResponse(data)

    # Read note     
    notes = Note.objects.all().order_by('-date_added')

    return render(request, 'home.html',
                  context={'form': form, 'notes': notes, "up_form": up_form})
