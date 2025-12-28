from django.shortcuts import render

from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
from django.http import HttpResponse

from .models import CustomUser

# Create your views here.
class update_user_score_records(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):

        wpm = request.data.get('wpm')
        mistakes = request.data.get('mistakes')
        word_count = request.data.get('wordCount')

        if wpm is None:
            return Response({'error': 'No WPM specified'}, status=status.HTTP_400_BAD_REQUEST)
        if mistakes is None:
            return Response({'error': 'No mistake profile specified'}, status=status.HTTP_400_BAD_REQUEST)
        if word_count is None:
            return Response({'error': 'No word-count profile specified'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = request.user
        user.update_score_record(float(wpm), mistakes, word_count)
        return Response(status=204)

def helper_leaderboard(score_type_str, username):

    def fill_dict(dictionary, user):
        dictionary['username'] = user.username
        dictionary[score_type_str] = user.best_wpm if score_type_str == 'best_wpm' else user.avg_wpm

    users = CustomUser.objects.order_by(f'-{score_type_str}')
    participants = len(users)
    first, second, third = {}, {}, {}
    placement = -1
    count = 1
    filled_fields = 0 if username != None else 1
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
            
        if username != None and user.username == username:
            placement = count
            filled_fields += 1
        else:
            count += 1

    return Response({
        'first': first,
        'second': second,
        'third': third,
        'placement': placement,
        'participants': participants,
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def leaderboard_placement_best(request):
    return helper_leaderboard('best_wpm', request.user.username if request.user.is_authenticated else None)

@api_view(['GET'])
@permission_classes([AllowAny])
def leaderboard_placement_avg(request):
    return helper_leaderboard('avg_wpm', request.user.username if request.user.is_authenticated else None)

class get_user_graph(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        date_and_wpm_tuple = request.user.getDataOfGraph()
        
        # Create and style graph
        fig, ax = plt.subplots(figsize=(8, 6))
        ax.scatter(date_and_wpm_tuple[0], date_and_wpm_tuple[1],
                   color="#42f2ff")

        fig.patch.set_facecolor('#808080')
        #ax.set_facecolor('#808080')

        ax.set_xlabel("Date", color="#42f2ff")
        ax.set_ylabel("WPM", color="#42f2ff")

        buffer = io.BytesIO()
        fig.savefig(buffer, format='png')
        plt.close(fig)

        buffer.seek(0)

        return HttpResponse(buffer.getvalue(), content_type='image/png')
    
class get_user_heatmaps(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        def accumulateToSingleDict(dict_list):
            resulting_dict = {}
            if not dict_list:
                return resulting_dict
            
            for dictionary in dict_list:
                for key in dictionary:
                    if dictionary[key] != None:
                        if key not in resulting_dict:
                            resulting_dict[key] = dictionary[key]
                        else:
                            resulting_dict[key] += dictionary[key]
            return resulting_dict

        user = request.user

        return Response({
            'last_ten_tests_mistakes': accumulateToSingleDict(user.last_ten_tests_mistakes),
            'last_ten_tests_word_count': accumulateToSingleDict(user.last_ten_tests_word_count),
            'lifetime_mistakes': user.lifetime_mistakes,
            'lifetime_word_count': user.lifetime_word_count
        })
