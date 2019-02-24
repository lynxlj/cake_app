const router = require('express').Router();
const Mock = require('mockjs');

const categoryTypeList = router.get('/api/v1/categoryTypeList/:id', (req, res) => {
  res.json(Mock.mock(
    {
      'code|200': 1,
      'data|9': [
        {
          title: '@ctitle(2,4)',
          img: '@img(60x60,@color)',
          'id|+1': 1,
        },
      ],
    },
  ));
});

module.exports = categoryTypeList;
