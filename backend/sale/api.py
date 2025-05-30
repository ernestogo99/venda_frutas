from ninja import Router
from .models import Venda
from fruits.models import Frutas
from .schemas import ModelVendaSchema,VendaSchema,RelaTorioVendaSchema
from fruits.api import check_permission,auth
from django.shortcuts import get_object_or_404
from decimal import Decimal
from typing import List

venda_router=Router(tags=['Vendas'])


@venda_router.post('/',response={200:ModelVendaSchema,400:dict,401:dict,403:dict},auth=auth)
def sell_fruit(request,body:VendaSchema):
    """Rota para realizar a venda de frutas."""
    
    tem_permissao,erro=check_permission(request,'realizar_venda')
    if not tem_permissao:
        return erro['status'], {'error': erro['error']}
 
    fruta=get_object_or_404(Frutas,id=body.id)
 
    if fruta.quantidade_disponivel< body.quantidade:
        return {"error": "Quantidade insuficiente."}, 400
  
    
    descontos_validos = [0, 5, 10, 15, 20, 25]
    if body.desconto not in descontos_validos:
        return 400, {"error": f"Desconto inválido. Use: {descontos_validos}"}

    
    valor_total=fruta.valor_venda * body.quantidade
    desconto_decimal=Decimal(body.desconto)
    valor_com_desconto = valor_total * (Decimal(1) - desconto_decimal / Decimal(100))
    venda=Venda.objects.create(
        fruta=fruta,
        quantidade=body.quantidade,
        total=valor_com_desconto,
        desconto=body.desconto,
        vendedor=request.auth
    )
    fruta.quantidade_disponivel-=body.quantidade
    fruta.save()
    return venda



@venda_router.get('/relatorio',response={200:List[RelaTorioVendaSchema],401:dict,403:dict},auth=auth)
def get_relatorio(request):
    """Rota para obter o relatório de vendas."""
    
    tem_permissao,erro=check_permission(request,'visualizar_relatorio')
    if not tem_permissao:
        return erro['status'], {'error': erro['error']}
    
    vendas=Venda.objects.filter(vendedor=request.auth).select_related('fruta')
    
    relatorio = [
        RelaTorioVendaSchema(
            total=venda.total,
            data=venda.data,
            fruta_nome=venda.fruta.nome,
            quantidade=venda.quantidade
        )
        for venda in vendas
    ]
    
    return relatorio
    
    
    
    