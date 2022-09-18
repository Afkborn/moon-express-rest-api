const express = require("express");
const router = express.Router();
const multer = require("multer");
var Image = require("../modules/Image");

router.get("/main/:_id", async (req, res) => {
  console.log("GET /media");
  try {
    var mainImage = await Image.findOne({ _id: req.params._id, imageType: "main" });
    var img = Buffer.from(mainImage.img.data, "base64");

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": img.length,
    });
    res.end(img);
  } catch (err) {
    res.json({ message: "Bad Request" });
  }
});

module.exports = router;
