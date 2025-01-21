var jwt = require("jsonwebtoken");
const modelUsers = require("../Models/model_users.js");
const modelUserbooks = require("../Models/model_userbooks.js");
let secret = "%)$2sF55Idf(Rm&jyPnkqAL^+8m4dSw)";
const modelBooks = require("../Models/model_books.js");


const generateToken = (user_info, callback) => {
  let token = jwt.sign(
    {
      data: user_info,
    },
    secret,
    { expiresIn: "1000h" }
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
    console.log("Decoded: ", decoded);
    let loggedUser = decoded.data.username;
    console.log("User Authorized: " + loggedUser);
    console.log("Token: " + token);
    modelUsers
      .findOne({ username: loggedUser })
      .then(user => {
        if (!user) {
          return callback(false, null);
        }
        console.log("User founded:", user);
        return callback(true, user);
      })
  });
};


/* MIDDLEWARE search userbooks*/
const getBookById = async function (req, res, next) {
  let userbook;
  try {
    userbook = await modelUserbooks.Userbooks.findById(req.params.id);
    console.log("getBookById: " + userbook);
    if (userbook == null) {
      return res.status(404).json({ message: "Cannot find userbook" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.userbook = userbook;
  console.log("res.userbook: " + res.userbook);
  console.log("userbook: " + userbook);
  next();
};


const isAdmin = function(req, res, next) {
  if (req.loggedUser.role === "admin") {
    return next();
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};


const auth = function(req, res, next) {
    let exception = ["/users/login", "/users/register"];
    if (exception.indexOf(req.url) >= 0) {
      return next();
    } else {
      validateToken(req.headers.authorization, (result, user) => {
        if (result) {
          req.loggedUser = user;
          console.log("logged user: " + user);
          return next();
        } else {
          return res.status(401).json({ message: "Not authorized" });
        }
      });
    }
} 

exports.isAdmin = isAdmin;
exports.generateToken = generateToken;
exports.validateToken = validateToken;
exports.getBookById = getBookById;
exports.auth = auth;