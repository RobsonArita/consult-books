# Consulta de Livros 📚

## Overview da Aplicação

A aplicação **Consulta de Livros** é um sistema fullstack desenvolvido para cadastro, consulta e gerenciamento de livros.

Ela é composta por três camadas principais:

- **Frontend**: Interface web desenvolvida em React + Vite, responsável pela interação com o usuário.
- **Backend**: API REST desenvolvida em Node.js + TypeScript, responsável pelas regras de negócio, validações e persistência de dados.
- **Banco de Dados**: MongoDB, utilizado para armazenamento das informações dos livros.

A aplicação foi projetada com foco em:
- Separação clara de responsabilidades
- Facilidade de execução via Docker
- Ambiente consistente para desenvolvimento e testes
- Escalabilidade e manutenção

Toda a aplicação pode ser executada utilizando Docker e Docker Compose, sem necessidade de instalar dependências manualmente na máquina local.

Para mais detalhes da API, consulte o [README](https://github.com/RobsonArita/consult-books/blob/main/backend/README.md) do backend.

---

## Tecnologias Utilizadas

### Backend
- Node.js
- TypeScript
- Express
- MongoDB + Mongoose
- Multer (upload de arquivos)
- Docker / Docker Compose
- Jest + Supertest (testes)
### Frontend
- React
- Vite
- TypeScript
- Docker

### Infraestrutura
- Docker
- Docker Compose

---

## Estrutura do Projeto

```text
.
├── backend
│   ├── src
│   ├── Dockerfile
│   └── .env.docker
├── frontend
│   ├── src
│   ├── Dockerfile
│   ├── vite.config.ts
│   └── .env.docker
├── uploads
├── docker-compose.yml
└── README.md
```

## Pré-requisitos

Antes de iniciar, é necessário ter instalado na máquina:

- Docker
- Docker Compose

## Instalação e Execução

### 1. Clonar o repositório

```
git clone https://github.com/RobsonArita/consult-books.git
cd consulta-livros
```

### 2. Configuração de variáveis de ambiente

No diretório `backend`, existe um arquivo `.env.docker` contendo as variáveis necessárias para execução da aplicação em Docker.

Exemplo:

```
PORT=3000
MONGO_URI=mongodb://mongo:27017/consulta-livros
MONGO_URI_TEST=mongodb://mongo:27017/consulta-livros-test
IP=localhost
```

No diretório `frontend`, existe um arquivo `.env.docker` contendo as variáveis necessárias para execução da aplicação em Docker.
```
VITE_API_URL=http://localhost:3000
```

### 3. Iniciar a aplicação com Docker Compose

Na raiz do projeto, execute:

```
yarn docker:up
```

Esse comando irá:

- Criar e iniciar o container do MongoDB
- Criar e iniciar o backend
- Criar e iniciar o frontend

### Acessos da Aplicação

Após subir os containers, a aplicação estará disponível em:

- Frontend: http://localhost:5173

- Backend (API): http://localhost:3000

- MongoDB: mongodb://localhost:27017

### Observações Importantes

- O frontend utiliza o Vite com a flag `--host`, permitindo acesso externo ao container.

- O backend depende do MongoDB e só inicia após o banco estar disponível.

- Os uploads são persistidos localmente no diretório uploads.

### Encerrando a Aplicação

Para parar os containers:
```
yarn docker:down
```

Para remover volumes (dados do banco):
```
yarn docker:reset
```
