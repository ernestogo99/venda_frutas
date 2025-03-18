from ninja import ModelSchema,Schema
from .models import User

class UserSchema(ModelSchema):
    class Meta:
        model=User
        fields=['username','password']
        
        

class TypeSchema(Schema):
    type:str
    
    
class TypeUserSchema(Schema):
    user:UserSchema
    type_user:TypeSchema