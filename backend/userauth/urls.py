from django.urls import path, include

urlpatterns = [
    path('userauth/', include('userauth.urls'))
    path('auth/', include('djoser.urls'))
    path('auth/', include('djoser.urls.jwt'))
]
