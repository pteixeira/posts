import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as RedditStrategy } from 'passport-reddit';
import User from '../models/user';
import config from './secrets';


module.exports = function(passport) {
  // serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new RedditStrategy({
    clientID: config.reddit.consumerKey,
    clientSecret: config.reddit.consumerSecret,
    callbackURL: config.reddit.callbackURL,
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      // check if user is already logged in
      if (!req.user) {
        User.findOne({ 'reddit.id': profile.id }, (err, user) => {
          if (err) return done(err);

          // check if we have the user in the system
          if (user) {
            // check if we have the user in the system, if he unlinked reddit's account
            if (!user.reddit.accessToken) {
              user.reddit.displayName = profile.name;
              user.reddit.id = profile.id;
              user.reddit.accessToken = accessToken;

              user.save(err => {
                if (err) throw err;
                return done(null, user);
              });
            }

            return done(null, user); // user was found, so we return it
          } else {
            // there is no user, so we create it
            let newUser = new User();
            newUser.reddit.id = profile.id;
            newUser.reddit.accessToken = accessToken;
            newUser.reddit.displayName = profile.name;

            newUser.save(err => {
              if (err) throw err;
              return done(null, user);
            });
          }
        });
      } else {
        // User already exists, so we link accounts!
        let user = req.user;

        user.reddit.id = profile.id;
        user.reddit.accessToken = accessToken;
        user.reddit.displayName = profile.name;

        user.save(err => {
          if (err) throw err;
          return done(null, user);
        })
      }
      // return done(null, profile);
    });
  }));

  // Local Signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    process.nextTick(() => {
      User.findOne({ 'local.email': email }, (err, user) => {
        if (err) return done(err);

        // check if there is already user with email
        if (user) {
          return done(null, false);
        } else {
          // if no user with such email, create it
          let newUser = new User();

          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          // save the user
          newUser.save(err => {
            if (err) throw err;

            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'identifier',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, identifier, password, done) => {
    User.findOne({ 'local.email': identifier }, (err, user) => {
      if (err) return done(err);

      if (!user) return done(null, false); // done(null, false, req.flash('loginMessage', 'No user and shit'))

      if (!user.validPassword(password)) return done(null, false); // done(null, false, req.flash('loginMessage', 'wrong pw'))

      return done(null, user);
    })
  }))
};
