const router = require('express').Router();
const Mock = require('mockjs');

const detail = router.get('/api/v1/detail/:id', (req, res) => {
  res.json(Mock.mock(
    {
      'code|200': 1,
      data: {
        'id|+1': 1,
        title: '@title(1,2)',
        'newPrice|5000-10000': 1,
        'oldPrice|10000-20000': 1,
        'imgs|4': [
          {
            'id|+1': 10001,
            src: '@img(355x355,@color)',
          },
        ],
        'sildes|4': [
          {
            'id|+1': 20001,
            src: '@img(375x300,@color)',
          },
        ],
        'details|4': [
          {
            detailTitle: '@title(1,2)',
            detailText: '@title(1,2)',
          },
        ],
        brand: '@ctitle(2,3)',
      },
    },
  ));
});

module.exports = detail;
