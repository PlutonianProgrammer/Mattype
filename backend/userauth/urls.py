from django.urls import path, include
from .views import update_user_score_records, leaderboard, get_user_graph, get_user_heatmaps, google_auth

urlpatterns = [
    #path('info/', include('userauth.urls')),
    path('submit-score/', update_user_score_records),
    path('get-leaderboard/', leaderboard),
    path('get-user-graph/', get_user_graph),
    path('get-user-heatmaps/', get_user_heatmaps),
    path('google-auth/', google_auth),
    # path('get-typing-par/', get_typing_par),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
