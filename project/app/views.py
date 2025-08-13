from django.shortcuts import render
from .models import BlogPost


# Create your views here.

from django.http import HttpResponse
from app.models import BlogPost

def home(request):
    blogs = BlogPost.objects.all()
    print("DEBUG: Blogs count =", blogs.count())
    return render(request, 'home.html', {'blogs': blogs})

def blog_list(request):
    blogs = BlogPost.objects.all().order_by('-date_posted')
    return render(request, 'home.html', {'blogs': blogs})

def japan_map(request):
    return render(request, 'map.html')
    print("DEBUG: Blogs count =", blogs.count())  # <- Add this
    return render(request, 'home.html', {'blogs': blogs})



def blog_list(request):
    blogs = BlogPost.objects.all().order_by('-date_posted')
    return render(request, 'home.html', {'blogs': blogs})

from django.shortcuts import render

def japan_map(request):
    return render(request, 'map.html')

