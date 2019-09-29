const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    friends: Array,
    recipes: Array,
    dateCreated: Date    
});

module.exports = userSchema