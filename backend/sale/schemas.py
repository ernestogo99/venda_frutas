from ninja import ModelSchema
from .models import Venda

class ModelVendaSchema(ModelSchema):
    class Meta:
        model=Venda
        fields='__all__'
        
        
        
        
class RelaTorioVendaSchema(ModelSchema):
    class Meta:
        model=Venda
        fields= ['data','total','fruta','quantidade']