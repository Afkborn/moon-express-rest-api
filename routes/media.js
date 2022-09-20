const express = require("express");
const router = express.Router();
const multer = require("multer");

var Image = require("../model/Image");

router.get("/:_id", async (req, res) => {
  console.log("GET /media");
  try {
    const image = await Image.findById(req.params._id);

    if (!image) {
      return res.status(404).json({
        error: "Image not found",
      });
    }
    const fileName = image._id + "." + image.extension;
    const type = req.query.type;
    if (type === "thumbnail") {
      res.sendFile(fileName, { root: "media/thumbnail" });
    } else if (type === "800w") {
      res.sendFile(fileName, { root: "media/800w" });
    } else if (type === "1200w") {
      res.sendFile(fileName, { root: "media/1200w" });
    } else {
      res.sendFile(fileName, { root: "media/images" });
    }

    if (!image.inUse) {
      image.inUse = true;
      image.save();
    }
  } catch (err) {
    res.json({ message: "Bad Request" });
  }
});

module.exports = router;
