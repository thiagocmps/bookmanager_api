const express = require("express");
const bookRouter = express.Router();
const controllerBooks = require("../Controllers/controller_books");
const utilities = require("../utilities/utilities");

/* GET All books FUNCIONANDO */
bookRouter.get("/", async function (req, res) {
  try {
    await controllerBooks.listAll(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET just one by name */
bookRouter.get("/:id", utilities.getBookById, async function (req, res) {
  res.send(res.book);
});

/* POST book */
bookRouter.post("/", async function (req, res) {
  try {
    await controllerBooks.createBook(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* UPDATE book - Patch update just the field that the user changed */
bookRouter.patch("/:id", utilities.getBookById, async function (req, res) {
  if (req.body.name != null)  {
    res.book.name = req.body.name
  }
  if (req.body.album != null)  {
    res.book.album = req.body.album
  }
  if (req.body.duration != null)  {
    res.book.duration = req.body.duration
  }
  if (req.body.genre != null)  {
    res.book.genre = req.body.genre
  }

  try {
    const updatedBook = await res.book.save()
    res.json(updatedBook)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

/* DELETE */
bookRouter.delete("/:id", utilities.getBookById, async function (req, res) {
    try {
      /* await books_controller.deleteBookById(req, res); */
      await res.book.deleteOne()
      res.json({ message: "Book deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = bookRouter;
