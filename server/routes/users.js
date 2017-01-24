import express from 'express';
import validateInput from '../shared/validations/signup';
import passport from 'passport';

// router.post('/', (req, res) => {

//   const { errors, isValid } = validateInput(req.body);

//   if (isValid) {
//     res.json({ success: true });
//   } else {
//     res.status(400).json(errors);
//   }
// });

let router = express.Router();
export default (passport) => {
  router.post('/', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      req.login(user, loginErr => {
        if (loginErr) return next(loginErr);
        return res.send({
          success: true,
          message: 'we have signup or something'
        });
      })
    })(req, res, next);
  });


  // router.post('/', passport.authenticate('local-signup', {
  //   successRedirect: '/',
  //   failureRedirect: '/topkek',
  //   failureFlash: false
  // }));

  // router.post('/login', passport.authenticate('local-login', {
  //   successRedirect: '/',
  //   failureRedirect: '/login',
  //   failureFlash: false
  // }));

  return router;
}
