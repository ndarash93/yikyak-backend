const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = require('./models');

mongoose.connect('mongodb://localhost:27017/test', 
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'nick',
    pass: 'pepsi1'
});


const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
});
db.on('open', _ => {
  console.log('Success!');
});
db.on('disconnected', _ => {
  console.log('Disconnected');
})

userSchema.methods.fullname = function(){
  console.log('Hi! My name is ' + this.fname + ' ' + this.lname);
}

const User = mongoose.model('User', userSchema);

bcrypt.genSalt(10, (err, salt) => {
  console.log(`Salt: ${salt}`);
  bcrypt.hash('#WCne6425', salt, function(err, hash) {
    const user = new User({
      fname: 'Nick',
      lname: 'darash',
      email: 'nickdarash@gmail.com',
      password: hash
    });
    user.save((err => {
      if (err) console.log(err);
      else console.log('Save successful!');
    }));
    user.fullname();
  });
});