from django.db import models

class Frutas(models.Model):
    classificões=[
        ('Extra','Extra'),
        ('De primeira','De primeira'),
        ('De segunda','De segunda'),
        ('De terceira','De terceira')
    ]
    nome=models.CharField(max_length=100)
    classificacao=models.CharField(max_length=20,choices=classificões)
    fresca=models.BooleanField(default=True)
    quantidade_disponivel=models.PositiveIntegerField()
    valor_venda=models.DecimalField(max_digits=5,decimal_places=2)
    
    def __str__(self):
        return f'{self.nome}'
    
