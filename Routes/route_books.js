const express = require("express");
const bookRouter = express.Router();
const controllerBooks = require("../Controllers/controller_books");
const utilities = require("../utilities/utilities");

/* GET All userbooks FUNCIONANDO */
bookRouter.get("/", utilities.isAdmin, async function (req, res) {
  try {
    await controllerBooks.listAllUserbooks(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET one by id */
 bookRouter.get("/:id", utilities.getBookById, async function (req, res) {
  res.send(res.userbook);
});

/* POST book and userbooks */
bookRouter.post("/createbook", async function (req, res) {
  try {
    await controllerBooks.createBook(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* UPDATE userbook - Patch update just the field that the user changed */
 bookRouter.patch("/:id", utilities.getBookById, async function (req, res) {
  console.log("req.userbook: " + res.userbook)
  console.log("res.userbook.review.rating: " + res.userbook.review.rating)
  console.log("req.body.rating: " + req.body.review.rating)
  res.userbook.review.rating = req.body.review.rating
  res.userbook.review.description = req.body.review.description

  try {
    const updatedUserbook = await res.userbook.save()
    res.json(updatedUserbook)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

/* DELETE userbook ADMIN */
bookRouter.delete("/admin/:id", utilities.getBookById, utilities.isAdmin, async function (req, res) {
    try {
      await res.userbook.deleteOne()
      res.json({ message: "Book deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* DELETE userbook */
bookRouter.delete("/:id", utilities.getBookById, utilities.isAdmin, async function (req, res) {
  try {
    await res.userbook.deleteOne()
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
);

module.exports = bookRouter;
