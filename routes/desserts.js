var router      = require('express').Router();
var Dessert     = require('../models/dessert.js');
var BAD_REQUEST = 400;

// GET items from the nutrition database
router.get('/:order?/:limit?/:page?', function (req, res, next) {
  console.log('order: ' + req.query.order);
  console.log('limit: '  + req.query.limit);
  console.log('page: '   + req.query.page + '\n\n');
  
  var query = Dessert.find({});
  var count = 0;
  
  Dessert.count({}, function (error, result) {
    count = result;
  });
  
  if(req.query.order) {
    query.sort(req.query.order);
  }
  
  if(req.query.limit) {
    query.limit(req.query.limit);
    
    if(req.query.page) {
      query.skip(req.query.limit * --req.query.page);
    }
  }
  
  query.exec(function (error, results) {
    res.json({
      count: count,
      data: results
    });
  });
});

module.exports = router;