from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views  # Use django inbuilt authentication to handle login and logout

urlpatterns = [
    path('', views.index, name='home'),
    path('shared/<int:pk>/', views.shared, name='shared'),
    path('search/', views.search, name='search'),
    path("register/", views.register, name="register"),
    path('', include("django.contrib.auth.urls")),  # for authentication purposes
    path('login', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout', auth_views.LogoutView.as_view(template_name='registration/logout.html'), name='logout'),
]
