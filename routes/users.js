const express = require('express');
const router = express.Router();
const User = require("../models/users");
const passport = require('passport');
const bcrypt = require("bcrypt");
const db = require("../bin/db");
const { QueryTypes } = require("sequelize");
const authenticate = require("../authenticate");


/* GET users listing. */
router.options('*', (req, res) => {
  res.sendStatus(200);
})
router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, function (req, res, next) {
  db.query("SELECT `id`, `username`, `description`, `firstname`, `lastname`, `admin`, `createdAt`, `updatedAt` FROM `Users` AS `User`;", { type: QueryTypes.SELECT })
    .then(result => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(result);
    })
    .catch(err => next(err));
});

router.delete("/", authenticate.verifyUser, authenticate.verifyAdmin, function (req, res, next) {
  User.destroy({ where: { id: req.body } })
    .then((result) => {
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


router.post("/login", passport.authenticate("local"), (req, res, next) => {
  let token = authenticate.getJsonToken({ id: req.user.id });
  console.log(req.user.admin);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, message: 'You are successfully logged in!', token: token, admin: req.user.admin });
})

module.exports = router;






// passport.authenticate('local', (err, user, info) => {
//   if (err) {
//     return next(err);
//   };

//   if (!user) {
//     res.statusCode = 401;
//     res.setHeader('Content-Type', 'application/json');
//     res.json({ success: false, message: 'Login Unsuccessful!', err: info });
//   }

//   req.logIn(user, (err) => {
//     if (err) {
//       res.statusCode = 401;
//       res.setHeader('Content-Type', 'application/json');
//       res.json({ success: false, message: 'Login Unsuccessful!', err: 'Could not log in user!' });
//     }
//     else {
//       let token = authenticate.getJsonToken({ id: req.user.id });
//       console.log(req.user.admin);
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'application/json');
//       res.json({ success: true, message: 'You are successfully logged in!', token: token, admin: req.user.admin });
//     }
//   })
// })