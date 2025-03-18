from ninja import Router
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .schemas import LoginSchema

auth_router = Router()

@auth_router.post('/', response={200: dict, 401: dict})
def login(request, data: LoginSchema):
    """Rota para autenticar um usuário e gerar tokens JWT."""
    
    user = authenticate(username=data.username, password=data.password)

    if user is not None:
        refresh = RefreshToken.for_user(user)  
        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username
            }
        }
    else:
        return 401, {"error": "Credenciais inválidas"}
