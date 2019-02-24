const express = require('express');
const categoryList = require('./mockdata/categoryList');
const categoryTypeList = require('./mockdata/categoryTypeList');
const brandList = require('./mockdata/brandList');
const brandTypeList = require('./mockdata/brandTypeList');
const proList = require('./mockdata/proList');
const detail = require('./mockdata/detail');
const login = require('./mockdata/login');
const homedetail = require('./mockdata/homedetail');
const hotSearch = require('./mockdata/hotSearch');
const bodyParser = require('body-parser');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,username');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(categoryList);
app.use(categoryTypeList);
app.use(brandList);
app.use(brandTypeList);
app.use(proList);
app.use(detail);
app.use(login);
app.use(homedetail);
app.use(hotSearch);

app.listen('1121', () => {
  console.log(' mock server is running on localhost:1121 ');
});
