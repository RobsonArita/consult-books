# 📚 API Consulta de Livros

API REST para cadastro, consulta, atualização e remoção de livros. Cada livro possui informações básicas como autor, título, descrição, data de publicação e também uma imagem associada enviada via upload.

A aplicação foi desenvolvida com foco em organização de código, separação de responsabilidades, testes automatizados e facilidade de execução utilizando Docker. As imagens enviadas são armazenadas no sistema de arquivos do backend e o caminho da imagem é persistido no banco de dados.

---

## 🛠️ Tecnologias

* Node.js
* TypeScript
* Express
* MongoDB + Mongoose
* Multer (upload de arquivos)
* Docker / Docker Compose
* Jest + Supertest (testes)

---

## 📦 Estrutura do Projeto

```
backend/
 ├─ src/
 │  ├─ config/
 │  ├─ controllers/
 │  ├─ services/
 │  ├─ repositories/
 │  ├─ models/
 │  ├─ routes/
 │  ├─ middlewares/
 │  └─ server.ts
 ├─ uploads/
 ├─ tests/
 ├─ Dockerfile
 └─ package.json
```

---

## 📁 Upload de imagens

* As imagens são armazenadas no diretório `uploads/`
* O volume é persistido via Docker para evitar perda dos arquivos

```yaml
volumes:
  - ./uploads:/server/uploads
```

---

## 📌 Endpoints

### ➕ Criar livro

**POST** `/books`

**Form-data:**

| Campo         | Tipo         |
| ------------- | ------------ |
| title         | string       |
| author        | string       |
| description   | string       |
| publishedDate | string (ISO) |
| image          | image        |

**Exemplo (curl):**

```bash
curl -X POST http://localhost:3000/books \
  -F "title=Clean Code" \
  -F "author=Robert C. Martin" \
  -F "description=Livro sobre boas práticas" \
  -F "publishedDate=2008-08-01" \
  -F "image=@cover.jpg"
```

---

### 📄 Listar livros

**GET** `/books`

---

### 🔍 Buscar livro por ID

**GET** `/books/:id`

---

### ✏️ Atualizar livro

**PATCH** `/books/:id`

* Aceita envio opcional de nova imagem
* Caso uma nova imagem seja enviada, a imagem antiga é removida automaticamente

**Form-data** igual ao POST

---

### ❌ Remover livro

**DELETE** `/books/:id`

* Remove o livro do banco
* Remove a imagem associada do sistema de arquivos

---

## 🧪 Testes

### Tipos de teste

* **Unitários:** uso de mocks para repositórios e filesystem
* **Integração:** MongoDB em memória (`mongodb-memory-server`)

### Executar testes

```bash
npm run test
```

---


## ⚠️ Observações

* Apenas um arquivo é aceito por requisição (`file`)
* Enviar campo de arquivo com nome diferente resultará em erro do Multer
