const mongoose = require('mongoose');

const userbooksSchema = new mongoose.Schema({
    bookId: { type: String, required: true },
    userId: { type: String, required: true },
    state: { type: String, required: false },
    title: { type: String, required: false }, 
    thumbnail: { type: String, required: false },
    review: {
        description: { type: String, default: null },
        rating: { type: Number, default: null }
    }
});

const Userbooks = mongoose.model('Userbooks', userbooksSchema);
exports.Userbooks = Userbooks;