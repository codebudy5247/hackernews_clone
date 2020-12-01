let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdOn: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
});

module.exports = mongoose.model("users", userSchema);
