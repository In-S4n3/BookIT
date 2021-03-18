const User = require("../models/User-model");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs"); // !!!
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const chalk = require("chalk");

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, next) => {
      User.findOne({ email }, (err, foundUser) => {
        if (err) {
          next(err);
          return;
        }
        if (!foundUser) {
          next(null, false, { message: "Incorrect email." });
          return;
        }
        if (!bcrypt.compareSync(password, foundUser.password)) {
          next(null, false, { message: "Incorrect password." });
          return;
        }
        next(null, foundUser);
      });
    }
  )
);

// Facebook strategy ========================
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackUrl: "/auth/facebook/callback",
    },
    (acessToken, refreshToken, profile, done) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      User.findOne({ googleId: profile.id })
        .then((user) => {
          if (user) {
            //Authenticate and persist in session
            done(null, user);
            return;
          }

          User.create({ googleId: profile.id, username: profile.displayName })
            .then((newUser) => {
              //Authenticate and persist in session
              done(null, newUser);
            })
            .catch((err) => done(err)); // closes User.create()
        })
        .catch((err) => done(err)); // closes User.findOne()
    }
  )
);
