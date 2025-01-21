const bcrypt = require("bcrypt");
const modelUser = require("../Models/model_users");
const utilities = require("../utilities/utilities")
/* LOGIN */
const login = (req, res) => {
  modelUser
    .find({ username: req.body.username })
    .then(user => {
      if (user.length > 0) {
        bcrypt
          .compare(req.body.password, user[0].password)
          .then(result => {
            if (result) {
              console.log(result);
              utilities.generateToken(
                { username: req.body.username, role: user[0].role, id: user[0]._id },
                token => {
                  console.log(token);
                  res.status(200).json(token);
                }
              );
            } else {
              res.status(401).send("Not Authorized");
            }
          }) .catch((error) => {
            res.status(400).send(error);
          });
      } else {
        res.status(401).send("Not Authorized");
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

/* REGISTER */
const register = (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const userToCreate = new modelUser({
        username: req.body.username,
        password: hash,
        role: req.body.role || "user",
      });

      // find duplicate users
      modelUser
        .find({ username: req.body.username })
        .then(user => {
          if (err) {
            res.status(400).send(err);
          }

          if (user.length > 0) {
            res.status(406).send("Duplicated User");
          } else {
            userToCreate.save().then(newuser => {
              if (err) {
                res.status(400).send(err);
              }
              res.status(200).send("Registered User");
            });
          }
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    });
  });
};

exports.register = register;
exports.login = login;
