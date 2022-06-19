# Store Manager 🛍️

Projeto de uma API de loja, utilizando um banco de dados SQL, desenvolvido durante o curso de Desenvolvimento Web Full Stack da [Trybe](https://www.betrybe.com/).

A API foi construída utilizando os princípios REST e seguindo a arquitetura MSC (Model, Service, Controller).

Suas principais funcionalidades são:
- Busca, cadastro, atualização e remoção de productos
- Busca, cadastro, atualização e remoção de vendas

⚠️ O conteúdo do aqruivo `StoreManager.sql` é responsável pela criação do banco de dados usado pela API e foi fornecido pela [Trybe](https://www.betrybe.com/).

## Tecnologias
As tecnologias utilizadas para o desenvolvimento da aplicação foram:
- Node.js
- MySQL
- Express
- Dotenv
- Joi
- Mocha
- Chai
- Sinon

## Executando o projeto
Para executar o projeto, é necessário:

1. Clonar este repositório
  ```
  git clone https://github.com/tainnaps/trybe-smith.git
  ```
2. Instalar as dependências na branch `main`
  ```
  npm install
  ```
3. Iniciar o servidor da aplicação
  ```
  npm start
  ```
  
  ## Executando os testes
  O projeto conta com testes unitários, desenvolvidos por mim usando `Mocha`, `Chai` e `Sinon`, para as camadas de Model, Service e Controller, cobrindo 62% dessas camadas.
  
  Para rodar os testes do projeto, é necessário executar o seguinte comando:
  ```
  npm run test:mocha
  ```
