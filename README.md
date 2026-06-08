# 📚 Book Management API

A RESTful API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** to manage a collection of books. This API supports creating, retrieving, updating, and deleting books from a MongoDB database.

---

## 🚀 Features

* Add a new book
* Get all books
* Get book details by title
* Get books by author
* Get books by genre
* Get books by published year
* Update book details by ID
* Update book details by title
* Delete book by ID
* MongoDB database integration using Mongoose

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* dotenv

---

## 📂 Project Structure

```bash
project-folder/
│
├── db/
│   └── db.connect.js
│
├── model/
│   └── book.model.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

## 📖 Book Schema

```javascript
{
  title: String,
  author: String,
  publishedYear: Number,
  genre: [String],
  language: String,
  country: String,
  rating: Number,
  summary: String,
  coverImgUrl: String
}
```

### Validation Rules

| Field         | Type          | Required |
| ------------- | ------------- | -------- |
| title         | String        | ✅        |
| author        | String        | ✅        |
| publishedYear | Number        | ✅        |
| genre         | Array[String] | ❌        |
| language      | String        | ✅        |
| country       | String        | ❌        |
| rating        | Number (0-10) | ❌        |
| summary       | String        | ❌        |
| coverImgUrl   | String        | ❌        |

---

## ⚙️ Database Connection

### db.connect.js

```javascript
const mongoose = require('mongoose')

async function intailizeDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database Connected Successfully")
  } catch (error) {
    console.log("Failed to connecting Database")
    console.error(error)
  }
}

module.exports = { intailizeDatabase }
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URL=your_mongodb_connection_string
```

Example:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/books?retryWrites=true&w=majority
```

---

## 📦 Installation

### 1. Clone Repository

```bash
git clone https://github.com/Rajeev-2100/BE4_Assignment1.git
```

### 2. Navigate to Project

```bash
cd BE4_Assignment1
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Server

```bash
node index.js
```

or

```bash
npm start
```

---

## 🌐 Base URL

```http
http://localhost:3000
```

---

# API Endpoints

## Create a New Book

### POST `/books`

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "publishedYear": 2018,
  "genre": ["Self-help"],
  "language": "English",
  "rating": 9
}
```

---

## Get All Books

### GET `/books`

```http
GET /books
```

---

## Get Book by Title

### GET `/books/title/:bookTitle`

Example:

```http
GET /books/title/Atomic Habits
```

---

## Get Books by Author

### GET `/books/author/:authorName`

Example:

```http
GET /books/author/James Clear
```

---

## Get Books by Genre

### GET `/books/genre/:genre`

Example:

```http
GET /books/genre/Self-help
```

---

## Get Books by Published Year

### GET `/books/publishedYear/:year`

Example:

```http
GET /books/publishedYear/2018
```

---

## Update Book by ID

### POST `/books/:bookId`

```json
{
  "rating": 10
}
```

Example:

```http
POST /books/684f4d1a1c9c7e89a4a1b123
```

---

## Update Book by Title

### POST `/books/title/:bookTitle`

```json
{
  "rating": 9.5
}
```

Example:

```http
POST /books/title/Atomic Habits
```

---

## Delete Book by ID

### DELETE `/books/:bookId`

Example:

```http
DELETE /books/684f4d1a1c9c7e89a4a1b123
```

---

## ▶️ Running the Server

When the server starts successfully:

```bash
Database Connected Successfully
Server running on 3000
```

---

## 📌 Future Improvements

* Pagination
* Sorting and Filtering
* Search functionality
* Authentication & Authorization
* API Documentation with Swagger
* Input Validation using Joi or Express Validator

---

## 👨‍💻 Author

Built with Node.js, Express, MongoDB, and Mongoose for learning and practicing REST API development.
