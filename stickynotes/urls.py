from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    # path('', views.create_note, name='create'),
    # path('', views.update_note, name='update'),
    # path('', views.delete_note, name='delete'),


    path("register/", views.register, name="register"),
    path('', include("django.contrib.auth.urls")),  # for authentication purposes
]
