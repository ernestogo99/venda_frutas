from django.db import models

class Frutas(models.Model):
    classificões=[
        ('e','Extra'),
        ('p','De primeira'),
        ('s','De segunda'),
        ('t','De terceira')
    ]
    nome=models.CharField(max_length=100)
    classificacao=models.CharField(max_length=1,choices=classificões)
    fresca=models.BooleanField(default=True)
    quantidade_disponivel=models.PositiveIntegerField()
    valor_venda=models.DecimalField(max_digits=5,decimal_places=2)
    
    def __str__(self):
        return f'{self.nome}'
    
