from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

class Folder(MPTTModel):
    name = models.CharField(max_length=50, unique=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    owner = models.ForeignKey(
        "user.CustomUser", 
        on_delete=models.CASCADE,
    )
    
    class MPTTMeta:
        order_insertion_by = ['name']