const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: String,
    password: String,
    dateCreated: Date    
});

module.exports = userSchema