from ninja import ModelSchema,Schema
from .models import Venda
from pydantic import Field
class ModelVendaSchema(ModelSchema):
    class Meta:
        model=Venda
        fields='__all__'
        
        
 
class VendaSchema(Schema):
    id:int
    quantidade:int
    desconto:int=Field(default=0,ge=0,le=25) 
        
        
class RelaTorioVendaSchema(ModelSchema):
    class Meta:
        model=Venda
        fields= ['data','total','fruta','quantidade']