const express = require("express");
const router = express.Router();
const User = require("../modules/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth");

router.post("/login", (request, response) => {
  console.log("POST /login");
  User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          response.status(200).send({
            message: "Login Successful",
            _id: user._id,
            email: user.email,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

router.get("/me", auth, (request, response) => {
  console.log(`GET /users/me`);
  // _id is the id of the user from auth.js
  User.findOne({ _id: request.user.userId })
    .then((user) => {
      response.status(200).send(user);
    })
    .catch((error) => {
      response.status(404).send({
        message: "User not found",
        error,
      });
    });
});


// register endpoint
router.post("/register", (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
        name: request.body.name,
        surname: request.body.surname,
      });

      user
        .save()
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          console.log(`POST USER Error: ${error}`);
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

//update a user with id
router.put("/:userID", auth, async (req, res) => {
  console.log("PUT /users/" + req.params.userID);
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userID },
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          surname: req.body.surname,

        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a user with id
router.delete("/:userID", auth, async (req, res) => {
  console.log("DELETE /users/" + req.params.userID);
  try {
    const removedUser = await User.remove({ _id: req.params.userID });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
