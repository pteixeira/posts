// express stuff
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

// Webpack configuration for front-end
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import users from './routes/users';
let app = express();

app.use(bodyParser.json());
app.use('/api/users', users);

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));
///////////////////////////////////////

// const bodyParser = require('body-parser');
// const session = require('express-session');
// const crypto = require('crypto');
// const passport = require('passport');
// const RedditStrategy = require('passport-reddit').Strategy;
// const redditConfig = {
//   reddit: {
//     consumerKey: 'NDW1PPHUaOmLGA',
//     consumerSecret: '6I8uqO06LvDKsCtScyV_Jqb_oL4',
//     callbackURL: 'http://localhost:3000/auth/reddit/callback'
//   }
// }.reddit;

// passport.use(new RedditStrategy({
//   clientID: redditConfig.consumerKey,
//   clientSecret: redditConfig.consumerSecret,
//   callbackURL: redditConfig.callbackURL,
//   passReqToCallback: true
// }, (req, accessToken, refreshToken, profile, done) => {
//   process.nextTick(() => {
//     return done(null, profile);
//   });
// }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({ secret: 'topkek', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// app.get('/auth/reddit', (req, res, next) => {
//   req.session.state = crypto.randomBytes(32).toString('hex');
//   passport.authenticate('reddit', { state: req.session.state })(req, res, next);
// });

// app.get('/auth/reddit/callback', (req, res, next) => {
//   if (req.session.state === req.query.state) {
//     passport.authenticate('reddit', {
//       successRedirect: '/',
//       failureRedirect: '/login'
//     })(req, res, next);
//   }
// });

///////////////////////////////////////
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

