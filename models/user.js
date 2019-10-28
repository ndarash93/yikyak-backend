const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    likedPosts: [{post: mongoose.Schema.Types.ObjectId}],
    dislikedPosts:[{post: mongoose.Schema.Types.ObjectId}],
    dateCreated: {type: Date, default: new Date}  
});

module.exports = userSchema