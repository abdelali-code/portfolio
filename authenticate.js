const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ where: { username: username } })
        .then((user) => {
            if (!user) {
                console.log("incorrect username");
                return done(null, false, { message: "username or password are incorrect" });
            }
            bcrypt.compare(password, user.password)
                .then((result) => {
                    if (result === true) {
                        console.log("done");
                        return done(null, user);
                    }
                    else {
                        console.log("incorrect password");
                        return done(null, false, { message: "username or password are incorrect" })
                    }
                })
                .catch(err => next(err));
        })
        .catch(err => {
            return done(err)
        });
}))


passport.serializeUser(function (user, done) {
    console.log("serialieze user");
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log("desirialize user");
    User.findByPk(id, function (err, user) {
        done(err, user);
    });
});


// create a token
exports.getJsonToken = (user_id) => {
    return jwt.sign(user_id, config.secretKey);
}


// verify token
let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretKey
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findByPk(jwt_payload.id)
        .then((user) => {
            if (user) {
                console.log("jwt user ", user);
                return done(null, user);
            }
            else {
                console.log("none of user or error");
                return done(null, false);
            }
        })
        .catch(err => {
            console.log("jwt error ", err);
            return done(err, false);
        })
}))

exports.test = (req, res, next) => {
    console.log("headers ", req.headers);
    console.log("body ", req.body);
    next();
}

exports.verifyUser = passport.authenticate('jwt', { session: false });
// verify if user is admin
exports.verifyAdmin = (req, res, next) => {
    console.log(req.user.admin);
    if (req.user.admin) {
        next();
    }
    else {
        let err = new Error("You are not authorised to perform this operation");
        err.status = 401;
        next(err);
    }
}

