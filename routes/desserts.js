var router  = require('express').Router();
var Dessert = require('../models/dessert.js');

// get desserts from the nutrition database
router.get('/', function (req, res, next) {
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

// delete dessert
router.delete('/:id', function (req, res, next) {
  Dessert.findByIdAndRemove(req.params.id, function (error, item) {
    if(error) {
      return next(error);
    }
    res.send(res.status = 200);
  })
});

// create dessert
router.post('/', function (req, res, next) {
  new Dessert(req.body.dessert).save(function (error, item) {
    if(error) {
      return next(error);
    }
    res.send(res.status = 200);
  });
});

module.exports = router;