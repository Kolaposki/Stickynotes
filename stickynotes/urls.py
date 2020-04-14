from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    # path('home/', views.index, name='home'),
    # path('update/', views.new_update, name='update'),
    path('<pk>/delete/', views.delete, name='delete'),
]
