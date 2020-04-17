from django.shortcuts import render, get_object_or_404, redirect, HttpResponseRedirect
from .models import Note
from .forms import *
from django.http import JsonResponse
from django.http import QueryDict
from django.contrib.auth.models import User


# ALL CRUD FUNCTIONALITIES FOR NOTE
def index(request):
    form = NoteForm()
    up_form = NoteForm2(request.POST)
    notes = Note.objects.all().order_by('-date_added')

    # Getting note
    if request.method == 'GET':
        print("GETTING ALL NOTES")
        # Read note
        if not request.user.is_authenticated:
            notes = Note.objects.none()
            print("Anonymous [NO USER IS LOGGED IN]")
        elif request.user:
            print("GETTING ALL NOTES for ", request.user)
            notes = Note.objects.filter(manager=request.user).order_by('-date_added')
        else:
            notes = Note.objects.all().order_by('-date_added')

    # Creating note
    if 'new_dummy' in request.POST:
        print("THIS REQUEST IS FROM NEW DUMMY")
        form = NoteForm(request.POST)

        if form.is_valid():
            instance = form.save(commit=False)  # get the form but dont save in db yet
            instance.manager = request.user
            username = request.user.username
            print("USER who created note is: ", username)
            note_form = form.save()
            note_pk = note_form.pk

            title = request.POST.get('title')
            description = request.POST.get('description')
            background_color = request.POST.get('background_color')
            is_done = request.POST.get('is_done')
            date_added = request.POST.get('date_added')

            data = {}
            data['message'] = 'form note is created'
            data['title'] = title
            data['description'] = description
            data['background_color'] = background_color
            data['note_pk'] = note_pk
            data['username'] = username
            data['is_done'] = is_done
            data['date_added'] = date_added

            print("Created note for ", note_pk)
            return JsonResponse(data)

    # Updating note
    elif request.method == 'POST':
        print("REQUEST IS POST")
        if 'update_delete_dummy' in request.POST:
            print("update_delete_dummy")
            note_id = request.POST.get('note_id')
            print("NOTED-ID: ", note_id)

            obj = get_object_or_404(Note, id=note_id)
            print(f"Here is object to update: {obj}")
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

    # Deleting note
    elif request.method == 'DELETE':
        print("REQUEST IS DELETE")
        note_id = int(QueryDict(request.body).get('note_id'))
        print("NOTED-ID: ", note_id)
        obj = get_object_or_404(Note, id=note_id)
        print(f"Here is object to delete: {obj}")

        data = {}
        data['message'] = 'Note successfully deleted'
        data['note_pk'] = note_id
        data['title'] = obj.title

        obj.delete()
        print("NOTE DELETED")

        return JsonResponse(data)

    return render(request, 'home.html',
                  context={'form': form, 'notes': notes, "up_form": up_form})


def register(response):
    if response.method == "POST":
        form = RegisterForm(response.POST)
        if form.is_valid():
            form.save()

        return redirect("home")
    else:
        form = RegisterForm()

    return render(response, "register.html", {"form": form})
