// Dependencies
const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
 id: {
    type: Number,
    required: true,
  },
 title: {
    type: String,
    required: true,
  },
 author: {
    type: String,
    required: true,
  },
 createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = {
  Posts : mongoose.model('Posts', postsSchema),
}
    