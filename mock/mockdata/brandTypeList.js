const router = require('express').Router();
const Mock = require('mockjs');

const brandTypeList = router.get('/api/v1/brandTypeList/:id', (req, res) => {
  res.json(Mock.mock(
    {
      'code|200': 1,
      'data|30': [
        {
          title: '@title(1)',
          'id|+1': 1,
        },
      ],
    },
  ));
});

module.exports = brandTypeList;
