from django.contrib.auth.models import Group
from rest_framework.response import Response
from rest_framework.generics import ListAPIView


class GroupList(ListAPIView):
    """Define all GroupList methods"""
    queryset = Group.objects.all().order_by('name')

    def list(self, request):
        """ Return a list of all group names"""
        return Response(
            self.queryset.values_list('name', flat=True)
        )
