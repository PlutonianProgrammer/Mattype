from django.shortcuts import render

from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import JsonResponse

from .models import CustomUser

# Create your views here.
class update_user_score_records(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        wpm = request.data.get('wpm')
        if wpm is None:
            return Response({'error': 'No WPM specified'}, status=status.HTTP_400_BAD_REQUEST)
        user = request.user
        user.update_score_record(float(wpm))
        return Response(status=204)
    
def leaderboard_placement_best(request):
    def fill_dict(dictionary, user):
        dictionary['username'] = user.username
        dictionary['best_wpm'] = user.best_wpm
    users = CustomUser.objects.order_by('-best_wpm')
    participants = len(users)
    first, second, third = {}, {}, {}
    placement = -1
    count = 1
    filled_fields = 0 if request.user.is_authenticated else 1
    for user in users:
        if filled_fields == 4:
            break
        if not first:
            fill_dict(first, user)
            filled_fields += 1
        elif not second:
            fill_dict(second, user)
            filled_fields += 1
        elif not third:
            fill_dict(third, user)
            filled_fields += 1
            
        if request.user.is_authenticated and user.username == request.user.username:
            placement = count
            filled_fields += 1
        else:
            count += 1

    return JsonResponse({
        'first': first,
        'second': second,
        'third': third,
        'placement': placement,
        'participants': participants,
    })

def leaderboard_placement_avg(request):
    def fill_dict(dictionary, user):
        dictionary['username'] = user.username
        dictionary['best_wpm'] = user.avg_wpm
    users = CustomUser.objects.order_by('-avg_wpm')
    first, second, third = {}, {}, {}
    placement = -1
    count = 1
    filled_fields = 0 if user.is_authenticated else 1
    for user in users:
        if filled_fields == 4:
            break
        if not first:
            fill_dict(first, user)
            filled_fields += 1
        elif not second:
            fill_dict(second, user)
            filled_fields += 1
        elif not third:
            fill_dict(third, user)
            filled_fields += 1
            
        if request.user.is_authenticated and user.username == request.user.username:
            placement = count
            filled_fields += 1
        else:
            count += 1

    return JsonResponse({
        'first': first,
        'second': second,
        'third': third,
        'placement': placement
    })
