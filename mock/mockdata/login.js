const router = require('express').Router();
const Mock = require('mockjs');

const login = router.post('/api/v1/login', (req, res) => {
  res.json(Mock.mock(
    {
      code: 200,
      data: {
        islogin: true,
        token: '@guid',
        info: {
          'level|1-3': 1,
          'coupon|1-5': 1,
          'envelopes|20-100': 1,
          'credit|0-10': 1,
          username: req.body.username,
        },
      },
    },
  ));
});

module.exports = login;
