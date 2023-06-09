from django.urls import include, path
from rest_framework import routers

from .views import FolderViewSet, SnippetViewSet

router = routers.DefaultRouter()
router.register(r'folder', FolderViewSet, basename="folder")
router.register(r'snippet', SnippetViewSet, basename="snippet")

urlpatterns = [
    path('', include(router.urls)),
]
