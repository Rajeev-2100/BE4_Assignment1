const express = require('express')
const app = express()

app.use(express.json())

const Book = require('./model/book.model.js')
const { intailizeDatabase  } = require('./db/db.connect.js')

intailizeDatabase()

async function createNewBook (newBook) {
    try {
        const book = new Book(newBook)
        const savedBook = await book.save()
        return savedBook
    } catch (error) {
        throw error
    }
}

app.post('/books', async (req,res) => {
    try {
        const books = await createNewBook(req.body)
        res.status(201).json(books)
    } catch (error) {
        res.status(404).json({error: 'Added to failed book data'})
    }
})

async function getAllBooksData(){
    try {
        const books = Book.find()
        return books
    } catch (error) {
        throw error
    }
}

app.get('/books', async (req,res) => {
    try {
        const books = await getAllBooksData()
        res.status(201).json({message: 'Book Data is this', book: books})
    } catch (error) {
        res.status(404).json({error: 'Failed to get All Book Data'})
    }
} )


const PORT = 3000
app.listen(PORT, () => {
    console.log("Server running on", PORT)
})
