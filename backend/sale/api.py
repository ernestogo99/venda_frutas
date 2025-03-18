from ninja import Router
from .models import Venda
from fruits.models import Frutas
from .schemas import ModelVendaSchema
from django.shortcuts import get_object_or_404
from decimal import Decimal

venda_router=Router()


@venda_router.post('/',response=ModelVendaSchema)
def sell_fruit(request,id,quantidade:int,desconto=0):
    fruta=get_object_or_404(Frutas,id=id)
    if fruta.quantidade_disponivel< quantidade:
        return {"error": "Quantidade insuficiente."}, 400
    
    valor_total=fruta.valor_venda * quantidade
    desconto_decimal=Decimal(desconto)
    valor_com_desconto = valor_total * (Decimal(1) - desconto_decimal / Decimal(100))
    print(valor_total)
    print(valor_com_desconto)
    venda=Venda.objects.create(
        fruta=fruta,
        quantidade=quantidade,
        total=valor_com_desconto,
        desconto=desconto,
        vendedor=request.user
    )
    
    fruta.quantidade_disponivel-=1
    fruta.save()
    return venda
    