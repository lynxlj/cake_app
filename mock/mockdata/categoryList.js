const router = require('express').Router();
const Mock = require('mockjs');

const categoryList = router.get('/api/v1/categoryList', (req, res) => {
  res.json(Mock.mock(
    {
      'code|200': 1,
      'data|9': [
        {
          'id|+1': 1,
          text: '@ctitle(2)',
        },
      ],
    },
  ));
});

module.exports = categoryList;
