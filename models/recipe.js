const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    name: String,
    description: String,
    calories: Number,
    type: Array,
    ingredients: Object,
    directions: String,
    likes: Number,
    comments: Object
});

module.exports = recipeSchema;