const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', _ => {
  console.log('Success!');
});

const kittySchema = new mongoose.Schema({
  name: String,
  color: String
});

const Kitten = mongoose.model('Kitten', kittySchema);
 
const silence = new Kitten({ name: 'Silence' });
console.log(silence.name);