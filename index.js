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
        res.status(500).json({error: 'Added to failed book data'})
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
        res.status(500).json({error: 'Failed to get All Book Data'})
    }
} )

async function getBookDetailByTitle(bookTitle){
    try {
        const books = await Book.findOne({ title: bookTitle })
        return books
    } catch (error) {
        throw error
    }
}

app.get('/books/title/:bookTitle', async (req,res) => {
    try {
        const data = await getBookDetailByTitle(req.params.bookTitle)

        if (!data) {
            return res.status(404).json({ error: "Book data not found" })
        }
        return res.status(200).json({ 
            message: "Book data is this:",  
            book: data 
        })

    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch book Data' })
    }
})

async function getBookDetailsByAuthor(authorName) {
    try {
        return await Book.find({ author: authorName })
    } catch (error) {
        throw error
    }
}

app.get('/books/author/:authorName', async (req,res) => {
    try {
        const data = await getBookDetailsByAuthor(req.params.authorName)

        if (!data) {
            return res.status(404).json({ error: "Book data not found" })
        }
        return res.status(200).json({ 
            message: "Book data:",  
            book: data 
        })

    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch book Data' })
    }
})

async function getBooksByGenre(genre) {
    try {
        return await Book.find({ genre: genre })
    } catch (error) {
        throw error
    }
}

app.get('/books/genre/:genre', async (req, res) => {
    try {
       const data = await getBooksByGenre(req.params.genre)
       
       if(!data){
        res.status(404).json({error: 'No book found'})
       }
       return res.status(200).json({message: 'Book Data:', book: data})

    } catch (error) {
        return res.status(500).json({error: "Failed to fetch books by genre"})
    }
})

async function getAllBookDetailReleasedYear(year){
    try {
        const book = await Book.findOne({publishedYear: year})
        return book 
    } catch (error) {
        throw error
    }
}

app.get('/books/publishedYear/:year', async (req,res) => {
    try {
        const data = await getAllBookDetailReleasedYear(req.params.year)
        if(!data){
            res.status(400).json({error: 'Book not found'})
        }

        res.status(200).json({message: 'Book Data:', book: data})
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch Data'})
    }
})

async function updateBookRating(bookId, dataToUpdate) {
    try {
        const book = await Book.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        return book 
    } catch (error) {
        throw error
    }
}

app.post('/books/:bookId', async (req,res) => {
    try {
        const updateBook = await updateBookRating(req.params.bookId, req.body)
       if(!updateBook){
           res.status(404).json({ error: "Book not found" })
    }else{
            res.status(200).json({ message: "Book update successfully", book: updateBook })
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch book data'})
    }
})

async function updateBookRatingByTitle(bookTitle, dataToUpdate){
    try {
        const book = await Book.findOneAndUpdate({title: bookTitle}, dataToUpdate, {new: true})
        return book   
    } catch (error) {
        throw error
    }
}

app.post('/books/title/:bookTitle', async (req,res) => {
    try {
        const updateBook = await updateBookRatingByTitle(req.params.bookTitle, req.body)
        if(!updateBook){
            res.status(404).json({error: 'Book Data not found'})
        }

        res.status(200).json({message: 'Book Data udpate Successfully', book: updateBook})
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch Book Data'})
    }
})

async function deleteBookByBookId(bookId) {
    try {
        const book = await Book.findByIdAndDelete({_id: bookId})
        return book
    } catch (error) {
        throw error
    }
}

app.delete('/books/:bookId', async (req,res) => {
    try {
        const deleteBook = await deleteBookByBookId(req.params.bookId)
        if(!deleteBook){
            res.status(404).json({error: 'Bookid not found'})
            console.error(error.message)
        }
        res.status(200).json({message: 'Book data delete successfully', book: deleteBook})
    } catch (error) {
        res.status(500).json({error : 'Failed to fetch Book Data'})
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log("Server running on", PORT)
})
