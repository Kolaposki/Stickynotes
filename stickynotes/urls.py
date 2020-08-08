from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('shared/<str:link>/', views.shared, name='shared'),
]
