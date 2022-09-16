const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../auth");


// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // create a folder called uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("/", upload.single("image"), auth, (req, res) => {
  console.log("POST /upload");
  const file = req.file;
  try {
    res.send({
      message: "File uploaded successfully",
      file,
    });
  } catch (err) {
    console.log(`POST UPLOAD Error: ${err}`);
    res.status(400).send(err);
  }
});



module.exports = router;
