const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

Users = require('./auth-model.js')

//registration
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log('User Registration', err)
      res.status(500).json(error);
  })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
