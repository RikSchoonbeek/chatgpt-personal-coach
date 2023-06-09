from django.db.models import F
from rest_framework import viewsets

from .models import Folder, Snippet
from .serializers import FolderSerializer, SnippetSerializer


class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer\

    def create(self, request, *args, **kwargs):
        # For now just set fixed user folder.
        request.data["owner"] = 1
        return super().create(request, *args, **kwargs)
    

    def get_queryset(self):
        # For now just get fixed user folders.
        return super().get_queryset().filter(owner_id=1).prefetch_related("snippet_set")


class SnippetViewSet(viewsets.ModelViewSet):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

    def get_queryset(self):
        # For now just get fixed user Snippets.
        return super().get_queryset().filter(owner_id=1)