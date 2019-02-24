const router = require('express').Router();
const Mock = require('mockjs');

const brandList = router.get('/api/v1/brandList', (req, res) => {
  res.json(Mock.mock(
    {
      'code|200': 1,
      'data|4': [
        {
          'id|+1': 1,
          text: '@ctitle(1,2)',
        },
      ],
    },
  ));
});

module.exports = brandList;
