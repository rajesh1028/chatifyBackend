const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect("mongodb+srv://Rajesh:rajesh@cluster0.odfmnjk.mongodb.net/chatify?retryWrites=true&w=majority");

module.exports = {
    connection
}