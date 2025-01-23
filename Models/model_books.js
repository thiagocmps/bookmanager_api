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
    required: false,
  },
  subtitle: {
    type: String,
    required: false,
  },
  authors: {
    type: Array,
    required: false,
  },
  publisher: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  publishedDate: {
    type: String,
    required: false,
  },
  pageCount: {
    type: Number,
    required: false,
  },
  categories: {
    type: Array,
    required: false,
  },
  averageRating: {
    type: Number,
    required: false,
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