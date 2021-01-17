const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  dateAdded: { type: Date, required: true },
  userNickName: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
});

postSchema.index({ title: 'text', text: 'text' });

module.exports = mongoose.model('posts', postSchema);