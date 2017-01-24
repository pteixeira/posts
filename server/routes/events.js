import express from 'express';
import axios from 'axios';
import authenticate from '../middlewares/authenticate';
import User from '../models/user';
import config from '../config/secrets';

let router = express.Router();

router.get('/', authenticate, (req, res) => {
  // res.status(200).json({ user: req.currentUser });
  User.findById(req.currentUser.id, (err, user) => {
    axios.get('https://oauth.reddit.com/user/sardinhas/saved', {
      headers: {
        Authorization: `Bearer ${user.reddit.accessToken}`,
        'User-Agent': `web:${config.reddit.consumerKey}:0.1 (by /u/sardinhas)`
      },
      json: true
    })
    .then(res => {
      console.log(res.data.data.after)
      let count = res.data.data.children.length;
      axios.get(`https://oauth.reddit.com/user/sardinhas/saved?count=${count}&after=${res.data.data.after}`, {
        headers: {
          Authorization: `Bearer ${user.reddit.accessToken}`,
          'User-Agent': `web:${config.reddit.consumerKey}:0.1 (by /u/sardinhas)`
        },
        json: true
      })
        .then(res => console.log(res)) // and so on, untill res.data.data.after === null. fuck me
    })
  });
});

router.post('/', authenticate, (req, res) => {
  res.status(201).json({ user: req.currentUser });
});

export default router;
