// Dependencies
const { Posts } = require('./../models/postsModel');
const { ObjectId } = require('mongodb');

// Get All posts
const getAllPosts = callback => {
  Posts.find({}, (err, success) => {
    return callback(err, success);
  })
}

// Get A Particular posts
const getPosts = (postsId, callback) => {
  if(!ObjectId.isValid(postsId))
    return callback('Invalid posts Id', 400, null);
  
  Posts.findOne({_id: postsId}, (err, data) => {
    if(err)
      return callback(err, 500, null);
    else if(!data)
      return callback('Posts Not Found', 404, null);
    else
      return callback(null, 200, data);
  });
}

// Add a posts
const addPosts = (data, callback) => {
  let posts = new Posts(data);

  posts.save((err, success) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, success);
  });
}

// Modify a posts
const modifyPosts = (postsId, data, callback) => {
  if(!ObjectId.isValid(postsId))
    return callback('Invalid Posts Id', 400, null);
  
  Posts.findOne({_id: postsId}, (err, success) => {
    if(err)
      return callback(err, 500, null);
    else if(!success)
      return callback('Posts Not Found', 404, null);
    else{
      Posts.update({_id: postsId}, data, (err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      });
    }
  });
}

// Delete a posts
const deletePosts = (postsId, callback) => {
  if(!ObjectId.isValid(postsId))
    return callback('Invalid Posts Id', 400, null);
  
  Posts.findOne({_id: postsId}, (err, success) => {
    if(err)
      return callback(err, 500, null);
    else if(!success)
      return callback('Posts Not Found', 404, null);
    else{
      Posts.remove({_id: postsId}, (err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      })
    }
  })
}

module.exports = {
  getAllPosts,
  getPosts,
  addPosts,
  modifyPosts,
  deletePosts
}
    