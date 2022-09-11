const express = require("express");
const router = express.Router();
const auth = require("../auth");

router.get("/free", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

router.get("/auth", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

module.exports = router;
