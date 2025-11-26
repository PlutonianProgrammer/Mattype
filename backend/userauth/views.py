from django.shortcuts import render

from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

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