var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../db/models/User');

var isAuthenticated = passport.authenticate('jwt', { session: false });

router.get('/', isAuthenticated, function(req, res, next) {
  User.find(function(err, items, count) {
    if (err) { res.send(err); }
    res.status(200).send(items);
  });
});

router.get('/:id', isAuthenticated, function(req, res, next) {
  User.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

router.post('/', isAuthenticated, function(req, res, next) {
  var newUser = new User(req.body);

  newUser.save(function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  })
});

router.put('/:id', isAuthenticated, function(req, res, next) {
  User.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }

    User = req.body;
    User.save(function(err, item) {
      if (err) { res.send(err); }
      res.status(200).send(item);
    });
  });
});

router.delete('/:id', isAuthenticated, function (req, res, next) {
  User.remove({ _id: req.params.id }, function (err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

module.exports = router;
