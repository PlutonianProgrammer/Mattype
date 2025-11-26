from django.urls import path, include
from .views import update_user_score_records

urlpatterns = [
    #path('info/', include('userauth.urls')),
    path('submit-score/', update_user_score_records.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
