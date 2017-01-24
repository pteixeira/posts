// express stuff
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
let app = express();

import passport from 'passport';

// database stuff
import mongoose from 'mongoose';
import configDB from './config/database';
mongoose.connect(configDB.url);

// Webpack configuration for front-end
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));


// passport stuff
import passportConfig from './config/passport';

passportConfig(passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'topkek', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

import apiRoute from './routes/users';
import apiAuth from './routes/auth';
import apiEvents from './routes/events';
app.use('/api/users', apiRoute(passport));
app.use('/api/auth', apiAuth(passport));
app.use('/api/events', apiEvents);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

