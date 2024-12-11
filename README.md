# Desafio 1.3 - Persistencia dos Dados da Clinica Odontologica

 Este desafio foi proposto pela iUUL para os alunos da Residência em Node.js/Express como forma de nivelamento de conhecimentos sobre Javascript.

 O objetivo é implementar a persistência dos dados na aplicação desenvolvida no Desafio #1.2. A persistência deverá ser implementada, obrigatoriamente, usando o Sequelize. O SGBD usado foi o Postgresql.

 ## 🛠️ Passos para executar a aplicação
Para testar os arquivos no seu computador, deve se ter instalado o node. Após isso, basta realizar um git clone ou baixar os arquivos e coloca-los no seu diretório local e executar o seguinte comando no terminal ``` npm install ``` para instalar os pacotes necessários para rodar os códigos.

 Para a hospedagem do banco de dados PostgreSQL, foi utilizado o Docker, que permite configurar e executar o banco de forma isolada e simplificada. Seguem os passos para executar o PostgreSQL usando Docker:


### 🛠️ Passos para rodar o PostgreSQL no Docker

1. **Certifique-se de ter o Docker instalado:** Se ainda não tem o Docker instalado, siga as instruções de instalação [aqui](https://docs.docker.com/get-started/get-docker/).

2. **Criar um arquivo .env:** Defina as variáveis de ambiente necessárias para o banco de dados no arquivo .env. O arquivo .env deve ser configurado conforme:</br> ```DB_USER=seu_usuario```</br> ```DB_PASS=sua_senha```

3. **Rodar o Docker Compose**: Execute o comando abaixo para inicializar o contêiner com o PostgreSQL: </br> ```docker-compose up -d```

4. **Acessando o Banco de Dados**: Agora, o banco de dados PostgreSQL estará acessível na porta 5432. Você pode conectar-se a ele utilizando um cliente PostgreSQL.
'

### Para rodar a aplicação, utilize o comando ```node ./src/index.js ```.

