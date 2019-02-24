const router = require('express').Router();
const Mock = require('mockjs');

const homedetail = router.get('/api/v1/homedetail', (req, res) => {
  res.json(Mock.mock(
    {
      code: 200,
      data: {
        img: '@img(750x375,@color)',
        title: '@ctitle(4,6)',
        desc: '@ctitle(8,9)',
      },
    },
  ));
});

module.exports = homedetail;
