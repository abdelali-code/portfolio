const express = require('express');
const router = express.Router();
const User = require("../models/users");
const passport = require('passport');
const bcrypt = require("bcrypt");
const authenticate = require("../authenticate");
const db = require("../bin/db");
const { QueryTypes } = require("sequelize");



/* GET users listing. */
router.options('*', (req, res) => {
  res.sendStatus(200);
})
router.get('/', function (req, res, next) {
  db.query("SELECT `id`, `username`, `description`, `firstname`, `lastname`, `admin`, `createdAt`, `updatedAt` FROM `Users` AS `User`;", { type: QueryTypes.SELECT })
    .then(result => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(result);
    })
    .catch(err => next(err));
});

router.post("/signup", (req, res, next) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (user) {
        res.statusCode = 303;//representation of an existing resource
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, message: `${req.body.username} username already exist` });
      }
      else if (!user) {
        bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            req.body.password = hash;
            return User.create(req.body);
          })
          .then(() => {
            // passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, message: 'Registration Successful!' });
            // });
          })
          .catch(err => next(err));
      }

    })
    .catch(err => next(err));
})


router.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, message: 'Login Unsuccessful!', err: info });
    }
    console.log(req.logIn);
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'Login Unsuccessful!', err: 'Could not log in user!' });
      }
      let token = authenticate.getJsonToken({ id: req.user.id });
      console.log(req.admin);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, message: 'You are successfully logged in!', token: token });
    })
  })(req, res, next)
})

module.exports = router;