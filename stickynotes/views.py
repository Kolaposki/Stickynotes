from django.shortcuts import render


# shared link handler
def shared(request):
    """
   http://127.0.0.1:9000/shared/?note=18&title=Hello World&description=sticky notes&color=red&date=Sun, 9th Aug 2020&checked=false
    """
    note_id = request.GET.get('note' or "")
    title = request.GET.get('title' or "")
    description = request.GET.get('description' or "")
    color = request.GET.get('color' or "")
    date = request.GET.get('date' or "")
    checked = str(request.GET.get('checked' or ""))

    if checked == 'false':
        checked = False
    elif checked == 'true':
        checked = True

    print(request.GET)
    print(checked, "checked")
    context = {'id': note_id, "title": title,
               "description": description,
               "color": color,
               "date": date,
               "checked": checked,
               }
    return render(request, 'shared.html', context)


def home(request):
    return render(request, 'home.html')
