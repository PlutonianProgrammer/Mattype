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

from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework_simplejwt.tokens import RefreshToken

from django.conf import settings
from django.contrib.auth import get_user_model

UserModel = get_user_model()

# Create your views here.
    
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def update_user_score_records(request):
        '''
        Docstring for update_user_score_records
        
        :param request: should specify wpm and mistake/word-count profiles
        update user's typing test data
        '''
        wpm = request.data.get('wpm')
        mistakes = request.data.get('mistakes')
        char_count = request.data.get('charCount')

        if wpm is None:
            return Response({'error': 'No WPM specified'}, status=status.HTTP_400_BAD_REQUEST)
        if mistakes is None:
            return Response({'error': 'No mistake profile specified'}, status=status.HTTP_400_BAD_REQUEST)
        if char_count is None:
            return Response({'error': 'No char-count profile specified'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = request.user
        user.update_score_record(float(wpm), mistakes, char_count)
        return Response(status=204)

def helper_leaderboard(score_type_str, username):

    def fill_dict(dictionary, user):
        dictionary['username'] = user.username
        dictionary[score_type_str] = user.best_wpm if score_type_str == 'best_wpm' else user.avg_wpm

    users = UserModel.objects.order_by(f'-{score_type_str}')
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

    return {
        'first': first,
        'second': second,
        'third': third,
        'placement': placement,
        'participants': participants,
    }

@api_view(['GET'])
@permission_classes([AllowAny])
def leaderboard(request):
    '''
    Docstring for leaderboard
    
    :param request: optional to include user
    Returns leaderboard stats for both best and average wpm
    '''
    username = request.user.username if request.user.is_authenticated else None
    return Response({
        'best_data': helper_leaderboard('best_wpm', username),
        'avg_data': helper_leaderboard('avg_wpm', username),
    })

@api_view(['get'])
@permission_classes([permissions.IsAuthenticated])
def get_user_graph(request):
    date_and_wpm_tuple = request.user.getDataOfGraph()
    
    # Create and style graph
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.scatter(date_and_wpm_tuple[0], date_and_wpm_tuple[1],
                color="#42f2ff")

    fig.patch.set_facecolor('#808080')

    ax.set_xlabel("Date", color="#42f2ff")
    ax.set_ylabel("WPM", color="#42f2ff")

    buffer = io.BytesIO()
    fig.savefig(buffer, format='png')
    plt.close(fig)

    buffer.seek(0)

    return HttpResponse(buffer.getvalue(), content_type='image/png')


@api_view(['get'])
@permission_classes([permissions.IsAuthenticated])
def get_user_heatmaps(request):
    '''
    Docstring for get_user_heatmaps
    
    :param request: Must be authenticated
    Returns data for use in heatmap feature
    '''

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
        'last_ten_tests_char_count': accumulateToSingleDict(user.last_ten_tests_char_count),
        'lifetime_mistakes': user.lifetime_mistakes,
        'lifetime_char_count': user.lifetime_char_count
    })

@api_view(['POST'])
def google_auth(request):
    '''
    Docstring for google_auth
    
    :param request: Contains auth token from google
    '''
    token = request.data.get('id_token')

    try:
        # Throws error if invalid token
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )

        # Create/get user
        email = idinfo['email']
        username = idinfo.get('name', email)
        
        user, created = UserModel.objects.get_or_create(
            email=email,
            defaults={'username': username}
        )

        # Sending JWT tokens to user
        refresh = RefreshToken.for_user(user)

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        })
    
    except Exception as e:
        return Response({'error': 'Invalid token'}, status=400)
