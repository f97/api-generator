// Dependencies
const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
 body: {
    type: String,
    required: true,
  },
 postId: {
    type: String,
    required: true,
  },
createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = {
  Comments : mongoose.model('Comments', commentsSchema),
}
    