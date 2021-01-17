const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  nickName: { type: String, required: true },
});

module.exports = mongoose.model('users', UserSchema);