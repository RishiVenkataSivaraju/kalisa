const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userDetails = new Schema({
    fromDate: String,
    toDate: String,
    gmail: String,
    phonenumber: Number,
    noOfRooms: Number,
    people: Number
})

const USERDETAILS = mongoose.model("USERDETAILS", userDetails);
module.exports = USERDETAILS;