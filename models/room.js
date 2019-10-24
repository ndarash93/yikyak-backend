const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const roomSchema = new Schema({
    location: String,
    members: Array,
    dateCreated: Date    
});

module.exports = userSchema