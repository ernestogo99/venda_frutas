from django.db import models
from users.models import User
from fruits.models import Frutas



class Venda(models.Model):
    vendedor = models.ForeignKey(User, on_delete=models.CASCADE)
    fruta = models.ForeignKey(Frutas, on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField()
    desconto = models.PositiveIntegerField(choices=[(x, f"{x}%") for x in (5, 10, 15, 20, 25)], default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateTimeField(auto_now_add=True)
