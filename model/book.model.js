const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    genre: {
        type: [String],
        enum: ['Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Science Fiction', 'Fantasy', 'Romance', 'Historical', 'Biography','Self-help', 'Other']
    },
    language: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: 'United States',
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    summary: String,
    coverImgUrl: String,
}, {
    timestamps: true,
})

const book = mongoose.model('Book', bookSchema)

module.exports = book
