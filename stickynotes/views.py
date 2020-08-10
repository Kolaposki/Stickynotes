from django.shortcuts import render, get_object_or_404, redirect, HttpResponseRedirect


# shared link handler
def shared(request, link: str):
    """
    http://engtechnos.com/HTML/note/demo/share.html?
    note=%7B%22
    id%22%3A1%2C%22
    title%22%3A%22Senior%20Data%20Analyst%22%2C%22
    text%22%3A%22Lorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsumLorem%20ipsum%22%2C%22
    color%22%3A%22red%22%2C%22
    long%22%3Atrue%2C%22
    completed%22%3Afalse%7D

    """
    print(link)
    print(request.GET)
    print(request.GET.get('note'))
    # http://127.0.0.1:9000/shared/note=lorem%20ipsum&title=hello%20world
    return render(request, 'shared.html')


def home(request):
    return render(request, 'home.html')
