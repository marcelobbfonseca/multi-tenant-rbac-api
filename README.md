# Simple multi tenant Role based access control

express API with typescript

##  requirements

Node 18.19

npm 10.2.3

Docker and docker-compose


## commands

    docker-compose up -d # to start databases containers

    npm install # install dependencies

    npm run tsc # to compile typescript code

    npm run start # to start development server


## Funcionamento

    Ao criar uma empresa(tenant) será gerado um usuário admin para a empresa;
    Será criado as permissoes padrões ```reader, editor, admin```;
    Um usuario admin de uma empresa só tem poder de admin dentro da própria empresa;
    A API permite criar permissoes customizadas;
    autenticacao com token JWT;
    Usuário superuser=true tem poder sobre toda a aplicacão;
    Aplicacao pode ser aprimorada com o uso de grupos e refreshtokens;
    Um Admin pode adicionar permissoes a um outro usuario da empresa pela rota POST /api/v1/roles/:roleId/permissions
    Pode se ver a lista de roles e privilegios de uma empresa pela rota GET /api/v1/roles/:tenantName
    Para criar permissoes a um role. pela rota POST /api/v1/roles/:roleId/permissions
    Utilizar Postman ou Insomnia para testar localmente;




