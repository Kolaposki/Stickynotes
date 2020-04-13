from django.shortcuts import render, get_object_or_404, redirect, HttpResponseRedirect
from django.views.generic import CreateView, ListView, UpdateView
from .models import Note
from .forms import *
from django.http import JsonResponse


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


def index(request):
    form = NoteForm()
    up_form = NoteForm2()

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
                data['message'] = 'form note is saved'
                data['title'] = title
                data['description'] = description
                data['background_color'] = background_color
                data['note_pk'] = note_pk

                return JsonResponse(data)

    if request.is_ajax() and 'update_dummy' in request.POST:
        print("THIS REQUEST IS AJAX and FROM UPDATE DUMMY")
        # up_form = NoteForm2(request.POST)
        # print(up_form)

        if request.method == 'POST':
            note_id = request.POST.get('note_id')
            # note_id = 118
            print("NOTED-ID: ", note_id)

            obj = get_object_or_404(Note, id=note_id)
            print(f"Here is object: {obj}")

            up_form = NoteForm2(request.POST or None, instance=obj)
            print(f"UPDATE FORM: {up_form}")

            if up_form.is_valid():
                print("UPDATE FORM IS VALID")
                data = {}
                title = request.POST.get('title')
                up_form.save()
                data['message'] = 'form note is updated'
                data['pk'] = note_id
                data['title'] = title

                return JsonResponse(data)
            

    """
    if request.method == 'POST' and 'update_btn' in request.POST:
        note_id = request.POST.get('note_id')
        print("NOTED-ID: ", note_id)

        obj = get_object_or_404(Note, id=note_id)
        print(f"Here is object: {obj}")

        up_form = NoteForm2(request.POST or None, instance=obj)

        if up_form.is_valid():
            up_form.save()
            print("SAVED UPDATE FORM")
            return redirect('home')
        else:
            print("UPDATE FORM IS NOT VALID")
            print(up_form.errors)
    """

    notes = Note.objects.all().order_by('-date_added')
    return render(request, 'duplicate_home.html',
                  context={'form': form, 'notes': notes, "up_form": up_form})


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
