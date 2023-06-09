from rest_framework import serializers

from .models import Folder, Snippet


class SnippetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Snippet
        fields = '__all__'


class FolderSerializer(serializers.ModelSerializer):
    snippets = SnippetSerializer(many=True, read_only=True, source="snippet_set")

    class Meta:
        model = Folder
        fields = '__all__'