// Dependencies
const express = require('express');
const router = express.Router();

// Enable CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

/**
 * @route GET /
 * @group Home
 * @returns {string} get api version
 */

router.get('/', (req, res, next) => {
  res.send('API running version 0.0.8');
});

module.exports = router;
    