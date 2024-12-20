const Model = require("../Models/model_books");

const listAll = async function (req, res) {
  Model.Books.find()
    .then((list) => {
      res.status(200).json(list);
    })
    .catch((error) => {
      res.status(error);
    });
};

const createBook = async function (req, res) {
  const book2save = new Model.Books({
    id: req.body.id,
    title: req.body.title,
    subtitle: req.body.subtitle,
    selflink: req.body.selflink,
    authors: req.body.authors,
    publisher: req.body.publisher,
    description: req.body.description,
    publishedDate: req.body.publishedDate,
    pageCount: req.body.pageCount,
    categories: req.body.categories,
    averageRating: req.body.averageRating,
    ratingsCount: req.body.ratingsCount,
    imageLinks: {
      smallThumbnail: req.body.smallThumbnail,
      thumbnail: req.body.thumbnail,
    },
    previewLink: req.body.previewLink,
    buyLink: req.body.buyLink,
    webReaderLink: req.body.webReaderLink,
  }); 

  try {
    const newBook = await book2save.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* exports.deleteBookById = deleteBookById; */
exports.createBook = createBook;
exports.listAll = listAll;
