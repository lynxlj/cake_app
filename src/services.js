import { Indicator } from 'mint-ui';
import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';
const ajax = axios.create({
  baseURL: isDev ? 'http://localhost:1121' : '',
});
ajax.interceptors.request.use((config) => {
  Indicator.open('加载中...');
  return config;
});
ajax.interceptors.response.use((resp) => {
  const p = new Promise((resolve) => {
    switch (resp.data.code) {
      case 200:
        resolve(resp.data.data);
        break;
      default :
        resolve(resp);
        break;
    }
    Indicator.close();
  });
  return p;
});

export const getCategorylist = () => ajax.get('/api/v1/categoryList');
export const getCategoryTypeList = id => ajax.get(`/api/v1/categoryTypeList/${id}`);
export const getBrandlist = () => ajax.get('/api/v1/brandList');
export const getBrandTypeList = id => ajax.get(`/api/v1/brandTypeList/${id}`);
export const getProList = id => ajax.get(`/api/v1/proList/${id}`);
export const getDetailById = id => ajax.get(`/api/v1/detail/${id}`);
export const login = opts => ajax.post('/api/v1/login', opts);
export const homedetail = () => ajax.get('/api/v1/homedetail');
export const getHotSearch = () => ajax.get('/api/v1/hotsearch');
