const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  roler: {
    type: String,
    required: true,
    default: 'Student',
  },
  status: {
    type: String,
    required: true,
    default: 'Waiting',
  },
  lastLogin: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model('Users', userSchema);
