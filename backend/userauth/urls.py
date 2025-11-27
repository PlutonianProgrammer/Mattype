from django.urls import path, include
from .views import update_user_score_records, leaderboard_placement_best, leaderboard_placement_avg

urlpatterns = [
    #path('info/', include('userauth.urls')),
    path('submit-score/', update_user_score_records.as_view()),
    path('get-leaderboard-placement-best/', leaderboard_placement_best),
    path('get-leaderboard-placement-avg/', leaderboard_placement_avg),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
