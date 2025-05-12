## Como rodar o projeto





1. crie uma virtual env:
   ```sh
   python -m venv venv
   ```
2. inicie o ambiente virtual,Execute o comando abaixo quando estiver na pasta do projeto:

   ```sh
   ./venv/Scripts/Activate
   ```

3. Instale os requisitos:

   ```sh
   pip intall -r requirements.txt
   ```


4. crie um arquivo .env com as seguintes variáveis (é necessário ter o banco de dados postgres instalado e criar um banco para utilizar como base):
   ```sh
   DB_NAME=Seu_banco
   DB_USER=postgres
   DB_PASSWORD=Sua_senha
   DB_HOST=localhost
   DB_PORT=5432
   ```

5. Após conectar com o banco, faça as migrações:
   ```sh
   python manage.py makemigrations
   ```
   ```sh
   python manage.py migrate
   ```

6. Rode o Projeto:

   ```sh
   python manage.py runserver
   ```

7. Para ver a documentação com o swagger, vá para:
   ```sh
    http://127.0.0.1:8000/api/docs
   ```
