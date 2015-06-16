var router = require('express').Router();

router.get('/:secret', function (req, res, next) {
  if(req.params.secret !== process.env.SECRET) {
    return next(new Error('Invalid Secret'));
  }
  
  res.send(res.status = 200);
});

module.exports = router;