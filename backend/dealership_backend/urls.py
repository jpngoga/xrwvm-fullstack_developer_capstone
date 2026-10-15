from django.contrib import admin
from django.urls import include, path
from .car_views import get_cars

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("users.urls")),
    path("djangoapp/get_cars", get_cars, name="get_cars"),
]
