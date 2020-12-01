
let mongoose = require("mongoose");
const colors = require('colors');
const dotenv =  require('dotenv').config();


const URI = process.env.DB_CONNECT
class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
            .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log("Connection Established with Atlas Database".green.bold))
            .catch((err) => console.log("DATABASE ERROR -> ".red + err.message.red.bold));
    }
}

module.exports = new Database();
