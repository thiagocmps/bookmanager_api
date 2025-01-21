const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  
  id: {
    type: String,
    required: true,
  },
  selflink: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
  authors: {
    type: Array,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  averageRating: {
    type: Number,
    required: true,
  },
  imageLinks: {
    smallThumbnail: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      required: false,
    } 
  },
});

const Books = mongoose.model("Books", booksSchema);
exports.Books = Books;