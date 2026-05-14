from django.urls import path
from . import views

urlpatterns = [
    path('', views.org_list, name='org_list'),
    path('org/<int:pk>/', views.org_detail, name='org_detail'),
    path('org/<int:org_pk>/fundraiser/add/', views.fundraiser_create, name='fundraiser_create'),
    path('fundraiser/<int:pk>/edit/', views.fundraiser_update, name='fundraiser_update'),
    path('fundraiser/<int:pk>/delete/', views.fundraiser_delete, name='fundraiser_delete'),
]