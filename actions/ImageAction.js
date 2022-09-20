const sharp = require("sharp");

function createThumbnail(fileName, width = 200, height = 200) {
  sharp("media/images/" + fileName)
    .resize(width, height)
    .toFile("media/thumbnail/" + fileName, (err, _) => {
      if (err) {
        console.log(err);
      }
    });
}

function create800w(fileName) {
  sharp("media/images/" + fileName)
    .resize(800)
    .toFile("media/800w/" + fileName, (err, _) => {
      if (err) {
        console.log(err);
      }
    });
}

function create1200w(fileName) {
  sharp("media/images/" + fileName)
    .resize(1200)
    .toFile("media/1200w/" + fileName, (err, _) => {
      if (err) {
        console.log(err);
      }
    });
}

exports.createThumbnail = createThumbnail;
exports.create800w = create800w;
exports.create1200w = create1200w;
