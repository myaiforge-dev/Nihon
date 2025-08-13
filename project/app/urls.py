from django.urls import path
from . import views

urlpatterns = [
    path('', views.blog_list, name='blog_list'),
    path('japan-map/', views.japan_map, name='japan_map'),

]
