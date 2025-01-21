//connect to db on mongodb atlas
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const utilities = require("./utilities/utilities");
const books_routes = require("./Routes/route_books");
const users_routes = require("./Routes/route_users");
const urimongodb = process.env.MONGO_URI;
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(utilities.auth);
app.use("/books", books_routes);
app.use("/users", users_routes);
app.use(cors());

app.listen(port, () => {
  console.log("Server is running on port " + port);
  mongoose.connect(urimongodb);
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);

mongoose.connection.once("open", function () {
  console.log("Base de dados conectada");
});
