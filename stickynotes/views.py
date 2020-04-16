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
    if request.method == 'PUT':
        print("REQUEST IS PUT")
        # note_id = request.POST.get('note_id')
        note_id = int(QueryDict(request.body).get('note_id'))
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

        # Note.objects.get(pk=request.DELETE['pk']).delete()

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


"""
class UpdateNoteView(UpdateView):
    model = Note
    template_name = 'update.html'
    context_object_name = 'up_form'
    success_url = 'home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["up_form"] = NoteForm2
        return context

    def form_valid(self, form):
        instance = form.save()
        form.instance.pk = self.request.POST.get('note_id')
        # return redirect('home')
        return super().form_valid(form)


def all_actions(request):
    if request.method == 'POST' and 'update_btn' in request.POST:
        pass
    if request.method == 'POST' and 'create_btn' in request.POST:
        pass


# Create your views here.
class HomeView(CreateView):
    model = Note
    template_name = 'home.html'
    context_object_name = 'notes'
    form_class = NoteForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["notes"] = self.model.objects.all().order_by('-date_added')
        return context


# update view for details
def update_view(request):
    note_id = 0
    obj = get_object_or_404(Note, id=note_id)

    if request.method == 'POST':
        note_id = request.POST.get('note_id')

        # fetch the object related to passed id
        obj = get_object_or_404(Note, id=note_id)

        # pass the object as instance in form
        form = NoteForm2(request.POST)

        if form.is_valid():
            instance.pk = note_id
            form.save()
            return HttpResponseRedirect("/")

    else:
        form = NoteForm2()

    return render(request, template_name='home.html',
                  context={"up_form": form, "obj": obj, "hello": "hello"})


def new_update(request):
    print("UPDATE IS CALLED")
    note_id = 50
    obj = get_object_or_404(Note, id=note_id)
    print(f"Here is object: {obj}")
    form = NoteForm2(request.POST or None, instance=obj)

    # Note.objects.filter(id=note_id).update(title="", description="")

    if form.is_valid():
        # instance.pk = note_id
        form.save()
        return HttpResponseRedirect("/")

    return render(request, template_name='update.html',
                  context={"up_form": form, "obj": obj, "hello": "hello"})
"""


def delete(request):
    print("REQUEST IS ", request.method)

    print(f"{request.POST.get('submit') == 'delete'}")
    print(f"{request.POST.get('delete-note') == 'delete'}")
    print(f"{'delete-note' in request.POST}")

    if request.method == "POST":
        note_id = request.POST.get('note_id')
        # note_id = 118
        print("NOTED-ID: ", note_id)

        obj = get_object_or_404(Note, id=note_id)
        print(f"To DELETE object: {obj}")
        print(f"{'delete-note' in request.POST}")

        obj.delete()
        return HttpResponseRedirect('/')

    return render(request, "home.html")


@csrf_protect
def delete_note(request):
    csrfContext = RequestContext(request)
    if request.method == 'DELETE':
        print("REQUEST IS DELETE")
        note_id = request.POST.get('note_id')
        print("NOTED-ID: ", note_id)

        new_id = Note.objects.get(pk=int(QueryDict(request.body).get('note_id')))
        print("NEW ID: ", new_id)

        # Note.objects.get(pk=request.DELETE['pk']).delete()

        obj = get_object_or_404(Note, id=note_id)
        print(f"Here is object to delete: {obj}")

        data['message'] = 'Note successfully deleted'
        data['note_pk'] = note_id
        data['title'] = obj.title

        obj.delete()
        print("NOTE DELETED")

        return JsonResponse(data)

    return render(request, 'home.html', csrfContext)
