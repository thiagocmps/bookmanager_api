const mongoose = require('mongoose');

const userbooksSchema = new mongoose.Schema({
    bookId: String,
    userId: String,
    state: String,
    review: {
        description: { type: String, default: null },
        rating: { type: Number, default: null }
    }
});

const Userbooks = mongoose.model('Userbooks', userbooksSchema);
exports.Userbooks = Userbooks;