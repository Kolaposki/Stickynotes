from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views  # Use django inbuilt authentication to handle login and logout

from django_registration.backends.one_step.views import RegistrationView
from .forms import UserRegistrationForm

urlpatterns = [
    path('', views.index, name='home'),
    path('shared/<str:link>/', views.shared, name='shared'),
    # path("register/", views.register, name="register"),
    path('', include("django.contrib.auth.urls")),  # for authentication purposes
    path('login', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout', auth_views.LogoutView.as_view(template_name='registration/logout.html'), name='logout'),

    path('register/',
         views.UserRegistrationView.as_view(form_class=UserRegistrationForm),
         name='django_registration_register', ),

    path('', include('django_registration.backends.one_step.urls'))
]
