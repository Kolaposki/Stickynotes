from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path("register/", views.register, name="register"),
    path('', include("django.contrib.auth.urls")),  # for authentication purposes
]
