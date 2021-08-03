const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    typre: String,
    required: true,
    validate: [({ length }) => length >= 8, "Password must be at least 8 characters."],
  }
});

const User = model('User', userSchema);

module.exports = User;