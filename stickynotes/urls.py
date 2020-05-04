from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views # Use django inbuilt authentication to handle login and logout
from django_registration.backends.one_step.views import RegistrationView
from .forms import UserRegistrationForm

urlpatterns = [
    path('', views.index, name='home'),
    path('shared/<str:link>/', views.shared, name='shared'),
    # path("register/", views.register, name="register"),
    path('', include("django.contrib.auth.urls")),  # for authentication purposes
    path('login', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout', auth_views.LogoutView.as_view(template_name='registration/logged_out.html'), name='logout'),
    path('register/',
         views.UserRegistrationView.as_view(form_class=UserRegistrationForm),
         name='django_registration_register'),

    # changing password views urls
    path('password_change/', auth_views.PasswordChangeView.as_view(template_name='registration/password_change_form.html'),
         name='password_change'),
    path('password_change/done/', auth_views.PasswordChangeDoneView.as_view(template_name='registration/password_change_done.html'),
         name='password_change_done'),

    # Resetting password views urls
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='registration/password_reset_form.html'),
         name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='registration/password_reset_done.html'),
         name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='registration/password_reset_confirm.html'),
         name='password_reset_confirm'),
    path('reset/done', auth_views.PasswordResetCompleteView.as_view(template_name='registration/password_reset_complete.html'),
         name='password_reset_complete'),

    path('', include('django_registration.backends.one_step.urls'))
]
