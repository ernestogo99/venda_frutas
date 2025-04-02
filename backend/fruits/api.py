from ninja import Router
from .schemas import FrutaSchema,UpdateFrutaSchema
from .models import Frutas
from users.models import User
from rolepermissions.checkers import has_permission   
from typing import List
from django.shortcuts import get_object_or_404
from django.db.models import Q
from login.auth import JWTAuth
from django.contrib.auth.models import AnonymousUser

fruits_router = Router(tags=['Frutas'])
auth=JWTAuth()


def check_permission(request, permission):
    user = request.auth

    if not user or isinstance(user, AnonymousUser):
        return False, {'status': 401, 'error': 'Usuário não autenticado'}

    if not has_permission(user, permission):
        return False, {'status': 403, 'error': 'Usuário sem permissão'}

    return True, {}



@fruits_router.post('/', response={200:UpdateFrutaSchema,401:dict,403:dict},auth=auth)
def add_fruit(request, fruit: UpdateFrutaSchema):
    """Rota para adicionar uma fruta."""
    
    tem_permissao,erro=check_permission(request,'cadastrar_fruta')
    if not tem_permissao:
        return erro['status'], {'error': erro['error']}
    fruta = fruit.dict()  
    fruta_instance = Frutas(**fruta)  
    fruta_instance.save()  
    return fruta_instance


@fruits_router.get('/',response= List[FrutaSchema])
def get_all_fruits(request):
    """Rota para obter todas as frutas."""
    
    frutas=Frutas.objects.all()
    return frutas


@fruits_router.delete('/{id}',response={204:None,403:dict,401:dict},auth=auth)
def delete_fruit(request,id:int):
    """Rota para excluir alguma fruta."""
    
    tem_permissao,erro=check_permission(request,'cadastrar_fruta')
    if not tem_permissao:
        return erro['status'], {'error': erro['error']}
    fruit=get_object_or_404(Frutas,id=id)
    fruit.delete()
    return 204,None


@fruits_router.put('/{id}',response={200:UpdateFrutaSchema,401:dict,403:dict},auth=auth)
def update_fruit(request,id:int,fruit_update:UpdateFrutaSchema):
    """Rota para atualizar alguma fruta."""
    
    tem_permissao,erro=check_permission(request,'cadastrar_fruta')
    if not tem_permissao:
        return erro['status'], {'error': erro['error']}
    Frutas.objects.filter(id=id).update(**fruit_update.dict())
    
    fruta=Frutas.objects.get(id=id)
    
    return fruta
    
    
@fruits_router.get("/filter", response=List[FrutaSchema])
def list_fruits(request, nome: str = None, classificacao: str = None):
    """Rota para filtrar as frutas por nome e por classificação."""
    
    query = Q()
    if nome:
        query &= Q(nome__icontains=nome)
    if classificacao:
        query &= Q(classificacao=classificacao)

    frutas = Frutas.objects.filter(query)
    return frutas

@fruits_router.get('/disponiveis/',response=List[FrutaSchema])
def get_available_fruits(request):
    """Rota para obter frutas disponíveis (quantidade maior que 0)."""
    frutas=Frutas.objects.filter(quantidade_disponivel__gt=0)
    return frutas


@fruits_router.get('/{id}',response=FrutaSchema)
def get_fruit_by_id(request,id):
    """Rota para obter frutas por id."""
    fruta=get_object_or_404(Frutas,id=id)
    return fruta