const router = require('express').Router();
const Mock = require('mockjs');

const proList = router.get('/api/v1/proList/:id', (req, res) => {
  res.json(Mock.mock(
    {
      'code|200': 1,
      'data|8': [
        {
          'id|+1': 1,
          title: '@title(1)',
          img: '@img(160x160,@color)',
          'newPrice|500-10000': 1,
          'oldPrice|10000-2000': 1,
          page: 3,
        },
      ],
    },
  ));
});

module.exports = proList;
