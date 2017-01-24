import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config/secrets';

let router = express.Router();

export default (passport) => {
  router.post('/', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (!user) {
        return res.status(401).json({
          errors: {
            form: 'Invalid credentials'
          }
        })
      }
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);

        const token = jwt.sign({
          id: user._id,
          email: user.local.email
        }, config.jwtSecret);

        return res.send({ token });
      })
    })(req, res, next);
  });

  router.get('/reddit', (req, res, next) => {
    req.session.state = crypto.randomBytes(32).toString('hex');
    passport.authenticate('reddit', {
      state: req.session.state,
      scope: ['identity', 'history']
    })(req, res, next);
  });

  router.get('/reddit/callback', (req, res, next) => {
    if (req.session.state === req.query.state) {
      passport.authenticate('reddit', (err, user, info) => {
        if (user) {
          req.login(user, loginErr => {
            return res.redirect('http://localhost:3000')
          })
        }
      })(req, res, next);
    } else {
      console.log('errorororororororororor')
    }
  });
  return router;
}

// router.post('/', (req, res) => {
//   const { identifier, password } = req.body;
//   User.findOne({ 'local.email': identifier }, (err, user) => {
//     if (user) {
//       if (user.validPassword(password)) {

//       } else {
//         res.status(401).json({ errors: { form: 'Invalid credentials' }});
//       }
//     } else {
//       res.status(401).json({ errors: { form: 'Invalid credentials' }});
//     }
//   });
// });

// export default router;
