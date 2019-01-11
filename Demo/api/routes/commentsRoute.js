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

/**
 * @typedef Comments
 * @property {string} body.required
 * @property {integer} postId.required
 */

/**
 * @route GET /comments
 * @group Comments
 * @returns {Array.<Comments>} get all comments
 */

// GET '/comments' Route to get all comments
router.get('/', (req, res, next) => {
  commentsController.getAllComments((err, success) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: success});
  });
});

/**
 * @route GET /comments/{commentsId}
 * @group Comments
 * @param {string} comments.path.required 
 * @returns {Array.<Comments>} get all comments
 */

// GET '/comments/:commentsId' Route to get a particular comments
router.get('/:commentsId', (req, res, next) => {
  commentsController.getComments(req.params.commentsId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

/**
 * @route POST /comments
 * @group Comments
 * @param {Comments.model} comments.body.required
 * @returns {Array.<Comments>} post a  comments
 */

// POST '/comments' Route to add new comments
router.post('/', (req, res, next) => {
  commentsController.addComments(req.body, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

/**
 * @route PUT /comments/{commentsId}
 * @group Comments
 * @param {string} commentsId.path.required 
 * @param {Comments.model} comments.body.required
 * @returns {Array.<Comments>} get one comments
 */

// PUT '/comments/:commentsId' Route to modify comments
router.put('/:commentsId', (req, res, next) => {
  commentsController.modifyComments(req.params.commentsId, req.body, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

/**
 * @route DELETE /comments/{commentsId}
 * @group Comments
 * @param {string} commentsId.path.required 
 * @returns {Array.<Comments>} get one {comments
 */

// DELETE '/comments/:commentsId' Route to delete comments
router.delete('/:commentsId', (req, res, next) => {
  commentsController.deleteComments(req.params.commentsId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  })
});

module.exports = router;
    