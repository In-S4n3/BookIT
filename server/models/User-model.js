const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email:  { type: String,  unique: true },
  googleID: String,
  password: String
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;