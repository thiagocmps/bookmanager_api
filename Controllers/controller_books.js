const ModelBooks = require("../Models/model_books");
const ModelUserbooks = require("../Models/model_userbooks");

const listAllUserbooks = async function (req, res) {
  ModelUserbooks.Userbooks.find()
    .then((list) => {
      console.log("userId: " + req.loggedUser._id)
      res.status(200).json(list);
    })
    .catch((error) => {
      res.status(error);
    });
};

const createBook = async function (req, res, next) {
  try {
    console.log("userId: " + req.loggedUser._id);
    const existingBook = await ModelBooks.Books.findOne({ id: req.body.id });
    if (existingBook) {
      const save2Userbooks = new ModelUserbooks.Userbooks({
        userId:req.loggedUser._id,
        bookId: existingBook.id,
        state: req.body.state,
        review: {
          description: null,
          rating: null,
        },
      });
      await save2Userbooks.save();
      return res.status(200).json({ message: "Book already exists, added to userbooks" });
    } else {
      const book2save = new ModelBooks.Books({
        id: req.body.id,
        title: req.body.title,
        subtitle: req.body.subtitle,
        authors: req.body.authors,
        publisher: req.body.publisher,
        description: req.body.description,
        publishedDate: req.body.publishedDate,
        pageCount: req.body.pageCount,
        categories: req.body.categories,
        averageRating: req.body.averageRating,
        imageLinks: {
          smallThumbnail: req.body.smallThumbnail,
          thumbnail: req.body.thumbnail,
        },
      });
      const save2Userbooks = new ModelUserbooks.Userbooks({
        userId: req.loggedUser._id,
        bookId: book2save.id,
        state: req.body.state,
        review: {
          description: null,
          rating: null,
        },
      });
      await save2Userbooks.save();
      const newBook = await book2save.save();
      res.status(201).json(newBook);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createBook = createBook;
exports.listAllUserbooks = listAllUserbooks;
