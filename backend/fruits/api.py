from ninja import Router
from .schemas import FrutaSchema,UpdateFrutaSchema
from .models import Frutas
from users.models import User
from rolepermissions.checkers import has_permission   
from typing import List
from django.shortcuts import get_object_or_404
from django.db.models import Q
fruits_router = Router()



def check_permission(request, permission):
    user = request.user 
    if not has_permission(user, permission):
        return False
    return True



@fruits_router.post('/', response=FrutaSchema,)
def add_fruit(request, fruit: FrutaSchema):
    if not check_permission(request,'cadastrar_fruta'):
        return 403, {'error': 'Você não tem permissão para cadastrar frutas'}
    fruta = fruit.dict()  
    fruta_instance = Frutas(**fruta)  
    fruta_instance.save()  
    return fruta_instance


@fruits_router.get('/',response= List[FrutaSchema])
def get_all_fruits(request):
    frutas=Frutas.objects.all()
    return frutas


@fruits_router.delete('/{id}',response={204:None})
def delete_fruit(request,id:int):
    if not check_permission(request,'cadastrar_fruta'):
        return 403, {'error': 'Você não tem permissão para excluir frutas'}
    fruit=get_object_or_404(Frutas,id=id)
    fruit.delete()
    return 204,None


@fruits_router.put('/{id}',response=UpdateFrutaSchema)
def update_fruit(request,id:int,fruit_update:UpdateFrutaSchema):
    if not check_permission(request,'cadastrar_fruta'):
        return 403, {'error': 'Você não tem permissão para atualizar frutas'}
    Frutas.objects.filter(id=id).update(**fruit_update.dict())
    
    fruta=Frutas.objects.get(id=id)
    
    return fruta
    
    
@fruits_router.get("/", response=List[FrutaSchema])
def list_fruits(request, nome: str = None, classificacao: str = None):
    query = Q()
    if nome:
        query &= Q(nome__icontains=nome)
    if classificacao:
        query &= Q(classificacao=classificacao)

    frutas = Frutas.objects.filter(query)
    return frutas
