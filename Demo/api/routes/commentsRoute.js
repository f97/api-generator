// Dependencies
const express = require('express');
const router = express.Router();
const commentsController = require('./../controllers/commentsController');

// Enable CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/comments' Route to get all comments
router.get('/', (req, res, next) => {
  commentsController.getAllComments((err, success) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: success});
  });
});

// GET '/comments/:commentsId' Route to get a particular comments
router.get('/:commentsId', (req, res, next) => {
  commentsController.getComments(req.params.commentsId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// POST '/comments' Route to add new comments
router.post('/', (req, res, next) => {
  commentsController.addComments(req.body, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// PUT '/comments/:commentsId' Route to modify comments
router.put('/:commentsId', (req, res, next) => {
  commentsController.modifyComments(req.params.commentsId, req.body, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// DELETE '/comments/:commentsId' Route to delete comments
router.delete('/:commentsId', (req, res, next) => {
  commentsController.deleteComments(req.params.commentsId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  })
});

module.exports = router;
    