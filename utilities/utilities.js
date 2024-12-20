var jwt = require("jsonwebtoken");
const modelUsers = require("../Models/model_users.js");
let secret = "%)$2sF55Idf(Rm&jyPnkqAL^+8m4dSw)";
const modelBooks = require("../Models/model_books.js");

const generateToken = (user_info, callback) => {
  let token = jwt.sign(
    {
      data: user_info,
    },
    secret,
    { expiresIn: "24h" }
  );
  return callback(token);
};

const validateToken = (token, callback) => {
  if (!token) {
    return callback(false, null);
  }
  jwt.verify(token.replace("Bearer ", ""), secret, function (error, decoded) {
    if (error) {
      return callback(false, null);
    }

    let loggedUser = decoded.data.user;

    modelUsers
      .find({ username: loggedUser })
      .then(user => {
        if (error || !user) {
          return callback(false, null);
        }
        return callback(true, user);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });
};

/* MIDDLEWARE search books*/
const getBookById = async function (req, res, next) {
  let book;
  try {
    book = await modelBooks.Books.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Cannot find book" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.book = book;
  next();
};

exports.generateToken = generateToken;
exports.validateToken = validateToken;
exports.getBookById = getBookById;
