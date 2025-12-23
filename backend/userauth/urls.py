from django.urls import path, include
from .views import update_user_score_records, leaderboard_placement_best, leaderboard_placement_avg, get_user_graph, get_user_heatmaps

urlpatterns = [
    #path('info/', include('userauth.urls')),
    path('submit-score/', update_user_score_records.as_view()),
    path('get-leaderboard-placement-best/', leaderboard_placement_best),
    path('get-leaderboard-placement-avg/', leaderboard_placement_avg),
    path('get-user-graph/', get_user_graph.as_view()),
    path('get-user-heatmaps/', get_user_heatmaps.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
