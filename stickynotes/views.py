from django.shortcuts import render, get_object_or_404, redirect, HttpResponseRedirect


# shared link handler
def shared(request, link: str):
    return render(request, 'shared.html')


def home(request):
    return render(request, 'home.html')
