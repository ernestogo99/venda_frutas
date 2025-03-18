from ninja import ModelSchema,Schema
from .models import Venda
from pydantic import Field
from decimal import Decimal
from datetime import datetime
class ModelVendaSchema(ModelSchema):
    class Meta:
        model=Venda
        fields='__all__'
        
        
 
class VendaSchema(Schema):
    id:int
    quantidade:int
    desconto:int=Field(default=0,ge=0,le=25) 
        
        


class RelaTorioVendaSchema(Schema):
    total:Decimal
    data:datetime
    fruta_nome: str  
    quantidade:int

    
