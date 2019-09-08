var router  = require('express').Router();
var Dessert = require('../models/dessert.js');

// get desserts from the nutrition database
router.get('/', function (req, res, next) {
  var filter = req.query.filter ? {nameToLower: new RegExp('^' + req.query.filter.toLowerCase())} : {};
  var query  = Dessert.find(filter);

  if(req.query.order) {
    query.sort(req.query.order);
  }

  if(!isNaN(req.query.limit)) {
    query.limit(parseInt(req.query.limit, 10));

    if(!isNaN(req.query.page)) {
      query.skip(req.query.limit * --req.query.page);
    }
  }

  var promise = query.exec();

  Dessert.count(filter, function (error, count) {
    if(error) {
      return next(error);
    }

    promise.addBack(function (error, results) {
      if(error) {
        return next(error);
      }

      res.json({
        count: count,
        data: results
      });
    });
  });
});

// delete dessert
router.delete('/:id', function (req, res, next) {
  if(req.query.secret !== process.env.SECRET) {
    res.status(401);
    return next(new Error('Invalid Secret'));
  }

  Dessert.findByIdAndRemove(req.params.id, function (error, item) {
    if(error) {
      return next(error);
    }
    res.status(200).send();
  });
});

// create dessert
router.post('/', function (req, res, next) {
  req.body.dessert.nameToLower = req.body.dessert.name.toLowerCase();
  new Dessert(req.body.dessert).save(function (error, item) {
    if(error) {
      return next(error);
    }
    res.status(200).send();
  });
});

module.exports = router;