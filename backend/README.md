# 📚 API Consulta de Livros

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

No repositório backend, executador o comando:

```bash
yarn test
```

---


## ⚠️ Observações do Upload de Imagem

* Apenas um arquivo é aceito por requisição (`file`)
* Enviar campo de arquivo com nome diferente resultará em erro do Multer
