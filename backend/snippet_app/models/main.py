from django.db import models

# Create your models here.
class Snippet(models.Model):
    title = models.CharField(max_length=512)
    text = models.TextField()
    folder = models.ForeignKey(
        "snippet_app.Folder", 
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    index_nr = models.IntegerField(default=0, unique=True),
    owner = models.ForeignKey(
        "user.CustomUser", 
        on_delete=models.CASCADE,
    )
