const router = require('express').Router();
const Mock = require('mockjs');

const hotSearch = router.get('/api/v1/hotsearch', (req, res) => {
  res.json(Mock.mock(
    {
      'code|200': 1,
      'data|6': [
        {
          'id|+1': 1,
          title: '@title(1)',
        },
      ],
    },
  ));
});

module.exports = hotSearch;
