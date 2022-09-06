const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seoUrl: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
});




module.exports = mongoose.model("Category", CategorySchema);