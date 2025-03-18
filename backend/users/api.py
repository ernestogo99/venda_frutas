import core.roles  
from ninja import Router
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from .schemas import TypeUserSchema
from .models import User
from rolepermissions.roles import assign_role
from rolepermissions.exceptions import RoleDoesNotExist

users_router = Router()

@users_router.post('/', response={200: dict, 400: dict, 500: dict})
def create_user(request, type_user_schema: TypeUserSchema):
    user = User(**type_user_schema.user.dict())
    user.password = make_password(user.password)
    try:
        user.full_clean()
        user.save()
        assign_role(user, type_user_schema.type_user.type)

    except ValidationError as e:
        return 400, {'errors': e.message_dict}

    except RoleDoesNotExist as e:
        return 400, {'errors': f'Tipo de usuário inválido ou não registrado: {str(e)}'}

    except Exception as e:
        return 500, {'errors': str(e)}

    return {'user_name': user.username}
