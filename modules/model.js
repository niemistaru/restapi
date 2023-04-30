// File: ./modules/model.js

// Require Mongoose
var mongoose = require("mongoose");

// Määritellään Schema, eli tietomalli.
const MovieSchema = new mongoose.Schema({
     _id: String,
    title: String,
    year: Number,
    poster: String,
    directors: String
});

/* The next step is to export MovieSchema based Movie Model */
module.exports = mongoose.model('Movie', MovieSchema, 'movies');