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

//Login
router.post('/login', (req, res) => {
  let { username, password } = req.body;
  // console.log({username, password })
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken({ user })
        res.status(200).json({ token })
      } else {
        res.status(401).json({ message: 'Invalid Login Credentials' })
      }
    })
    .catch(err => {
      console.log('Login Error', err)
      res.status(500).json(error);
    })
});

//Generating token: This can be in a separate file
function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
