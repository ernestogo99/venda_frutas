from ninja import NinjaAPI
from users.api import users_router
from fruits.api import fruits_router
from sale.api import venda_router
api=NinjaAPI()

api.add_router('users/',users_router)
api.add_router('frutas/',fruits_router)
api.add_router('vendas/',venda_router)