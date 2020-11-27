const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const session = require('express-session');
// const FileStore = require('session-file-store')(session);

const passport = require('passport');
const authenticate = require('./authenticate');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const projectRouter = require("./routes/projects");
const messageRouter = require("./routes/messages");
const blogRouter = require("./routes/blog");
const blogtRouter = require('./routes/blog');
const categoryRouter = require("./routes/category");
const skillsRouter = require("./routes/skills");
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// need configuration !!!!!!!!!!
app.use(cors());
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var sess = {
//   secret: "123@sessionid1234567890", // in production the secret for best load it from envirement variable
//   name: "session-id",
//   resave: false,
//   saveUninitialized: false,
//   store: new FileStore(),
//   cookie: {},

// }
// if (app.get('env') === 'production') {
//   // app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }

// app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());


// function auth(req, res, next) {
//   console.log(req.user);

//   if (!req.user) {
//     var err = new Error('You are not authenticated!');
//     err.status = 403;
//     next(err);
//   }
//   else {
//     next();
//   }
// }
app.use('/users', usersRouter);
// app.use(auth);



app.use('/', indexRouter);
app.use("/projects", projectRouter);
app.use("/messages", messageRouter);
app.use("/articles", blogtRouter);
app.use("/categories", categoryRouter);
app.use("/skills", skillsRouter);


// serve static files 
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, 'build')));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   })
// }
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
