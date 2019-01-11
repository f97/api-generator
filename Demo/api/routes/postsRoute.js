// Dependencies
const express = require('express');
const router = express.Router();
const postsController = require('./../controllers/postsController');

// Enable CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

/**
 * @typedef Posts
 * @property {integer} id.required
 * @property {string} title.required
 * @property {string} author.required
 */

/**
 * @route GET /posts
 * @group Posts
 * @returns {Array.<Posts>} get all posts
 */

// GET '/posts' Route to get all posts
router.get('/', (req, res, next) => {
  postsController.getAllPosts((err, success) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: success});
  });
});

/**
 * @route GET /posts/{postsId}
 * @group Posts
 * @param {string} posts.path.required 
 * @returns {Array.<Posts>} get all posts
 */

// GET '/posts/:postsId' Route to get a particular posts
router.get('/:postsId', (req, res, next) => {
  postsController.getPosts(req.params.postsId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

/**
 * @route POST /posts
 * @group Posts
 * @param {Posts.model} posts.body.required
 * @returns {Array.<Posts>} post a  posts
 */

// POST '/posts' Route to add new posts
router.post('/', (req, res, next) => {
  postsController.addPosts(req.body, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

/**
 * @route PUT /posts/{postsId}
 * @group Posts
 * @param {string} postsId.path.required 
 * @param {Posts.model} posts.body.required
 * @returns {Array.<Posts>} get one posts
 */

// PUT '/posts/:postsId' Route to modify posts
router.put('/:postsId', (req, res, next) => {
  postsController.modifyPosts(req.params.postsId, req.body, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

/**
 * @route DELETE /posts/{postsId}
 * @group Posts
 * @param {string} postsId.path.required 
 * @returns {Array.<Posts>} get one {posts
 */

// DELETE '/posts/:postsId' Route to delete posts
router.delete('/:postsId', (req, res, next) => {
  postsController.deletePosts(req.params.postsId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  })
});

module.exports = router;
    