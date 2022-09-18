
const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
    imageType: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    },   
    img : {
        data: Buffer,
        contentType: String
    }
});


module.exports = mongoose.model("Image", ImageSchema);