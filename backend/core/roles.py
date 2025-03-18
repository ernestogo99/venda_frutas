from rolepermissions.roles import AbstractUserRole

class Admin(AbstractUserRole):
    available_permissions = {'cadastrar_fruta': True}
    
    
class Vendedor(AbstractUserRole):
    available_permissions = {'realizar_venda': True, 'visualizar_relatorio': True}