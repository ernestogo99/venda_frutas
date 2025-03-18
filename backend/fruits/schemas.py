from ninja import ModelSchema
from .models import Frutas


class FrutaSchema(ModelSchema):
    class Meta:
        model=Frutas
        fields='__all__'
        
        
        
class UpdateFrutaSchema(ModelSchema):
    class Meta:
        model=Frutas
        exclude=['id']
    