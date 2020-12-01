
const mongoose = require("mongoose");
const db = require("../database");

const newsSchema = new mongoose.Schema({
    index: {
        type: Number,
        unique: true,
    },
    title: {
        type: String,
        unique: false,
    },
    createdOn: {
        type: Date,
        unique: false,
    },
    addedBy: {
        type: String,
        unique: false,
    },
    url: {
        type: String,
        unique: false,
    },
    points: {
        type: Number,
        unique: false,
    },
});

const news = mongoose.model("news", newsSchema);

module.exports = news;
