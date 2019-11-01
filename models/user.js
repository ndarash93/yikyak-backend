const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    likedPosts: [{post: mongoose.Schema.Types.ObjectId, timeStamp: Date}],
    dislikedPosts:[{post: mongoose.Schema.Types.ObjectId, timeStamp: Date}],
    dateCreated: {type: Date, default: new Date}  
});

module.exports = userSchema