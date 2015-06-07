var router      = require('express').Router();
var Dessert     = require('../models/dessert.js');
var BAD_REQUEST = 400;

// GET items from the nutrition database
router.get('/:filter?/:limit?/:page?', function (req, res, next) {
  console.log('filter: ' + req.query.filter);
  console.log('limit: '  + req.query.limit);
  console.log('page: '   + req.query.page + '\n\n');
  
  var query = Dessert.find({});
  
  if(req.query.filter) {
    query.sort(req.query.filter);
  }
  
  if(req.query.limit) {
    query.limit(req.query.limit);
    
    if(req.params.page) {
      query.offset(req.query.limit * --req.query.page);
    }
  }
  
  query.exec(function (error, results) {
    res.json(results);
  });
});

module.exports = router;