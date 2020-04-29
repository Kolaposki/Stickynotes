from django.shortcuts import render, get_object_or_404, redirect, HttpResponseRedirect
from .models import Note
from .forms import *
from django.http import JsonResponse
from django.http import QueryDict
from django.db.models import Q
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django_registration.backends.one_step.views import RegistrationView

HOMEPAGE = 'home.html'
# baseurl = 'https://stickyynotes.herokuapp.com'
baseurl = 'http://127.0.0.1:9000'


# https://stickyynotes.herokuapp.com/
# ALL CRUD FUNCTIONALITIES FOR NOTE
@login_required
def index(request):
    notes = None
    form = NoteForm()
    up_form = NoteForm2(request.POST)
    search_term = ''
    is_searching = False

    # Getting note
    if request.method == 'GET' and 'search_term' not in request.GET:
        print("REQUEST IS GET and not searching")
        # Read note
        if request.user.is_authenticated:
            print("GETTING ALL NOTES for ", request.user)
            notes = Note.objects.filter(manager=request.user).order_by('-date_updated')

    elif request.method == 'GET' and 'search_term' in request.GET:
        is_searching = True
        if request.user.is_authenticated:
            print("GETTING SEARCH NOTES for ", request.user)
            print("REQUEST IS GET and searching")
            print("SEARCHING.............................\n\n")
            search_term = request.GET['search_term']  # get value that was passed in url
            search_result = Note.objects.filter(
                Q(title__icontains=search_term) | Q(description__icontains=search_term)
            )

            notes = search_result.filter(manager=request.user).order_by('-date_updated')

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
            # append the generated link and note pk to the baseurl. Eg ==> https://stickyynotes.herokuapp.com/kros45
            note_link = f'{baseurl}/shared/{note_form.link}{note_pk}'
            print("NOTE LINK: ", note_link)

            title = request.POST.get('title')
            description = request.POST.get('description')
            background_color = request.POST.get('background_color')
            is_done = False
            date_added = timezone.now()

            data = {}
            data['message'] = 'form note is created'
            data['title'] = title
            data['description'] = description
            data['background_color'] = background_color
            data['note_pk'] = note_pk
            data['username'] = username
            data['is_done'] = is_done
            data['date_added'] = date_added
            data['note_link'] = note_link

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

    return render(request, HOMEPAGE, context={'notes': notes, 'form': form, 'up_form': up_form, 'baseurl': baseurl,
                                              "search_term": search_term, "is_searching": is_searching,
                                              })


# Registration View
class UserRegistrationView(RegistrationView):
    template_name = "register.html"
    success_url = reverse_lazy("home")


# shared link handler
def shared(request, link: str):
    # url to recieve ==> https://stickyynotes.herokuapp.com/shared/noix164 ==> noix164
    pk = int(''.join([i for i in link if i.isdigit()]))  # returns ==> 164
    note_link = str(''.join([i for i in link if i.isalpha()]))  # returns ==> noix

    # get the exact Note where the pk and link is the same as what's in the url
    # this design is done to make it harder for people to randomly guess a note shared url (:-
    note = get_object_or_404(Note, pk=pk, link=note_link)
    return render(request, 'shared.html', {'note': note})
