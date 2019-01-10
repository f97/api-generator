// Dependencies
const { Comments } = require('./../models/commentsModel');
const { ObjectId } = require('mongodb');

// Get All comments
const getAllComments = callback => {
  Comments.find({}, (err, success) => {
    return callback(err, success);
  })
}

// Get A Particular comments
const getComments = (commentsId, callback) => {
  if(!ObjectId.isValid(commentsId))
    return callback('Invalid comments Id', 400, null);
  
  Comments.findOne({_id: commentsId}, (err, data) => {
    if(err)
      return callback(err, 500, null);
    else if(!data)
      return callback('Comments Not Found', 404, null);
    else
      return callback(null, 200, data);
  });
}

// Add a comments
const addComments = (data, callback) => {
  let comments = new Comments(data);

  comments.save((err, success) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, success);
  });
}

// Modify a comments
const modifyComments = (commentsId, data, callback) => {
  if(!ObjectId.isValid(commentsId))
    return callback('Invalid Comments Id', 400, null);
  
  Comments.findOne({_id: commentsId}, (err, success) => {
    if(err)
      return callback(err, 500, null);
    else if(!success)
      return callback('Comments Not Found', 404, null);
    else{
      Comments.update({_id: commentsId}, data, (err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      });
    }
  });
}

// Delete a comments
const deleteComments = (commentsId, callback) => {
  if(!ObjectId.isValid(commentsId))
    return callback('Invalid Comments Id', 400, null);
  
  Comments.findOne({_id: commentsId}, (err, success) => {
    if(err)
      return callback(err, 500, null);
    else if(!success)
      return callback('Comments Not Found', 404, null);
    else{
      Comments.remove({_id: commentsId}, (err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      })
    }
  })
}

module.exports = {
  getAllComments,
  getComments,
  addComments,
  modifyComments,
  deleteComments
}
    