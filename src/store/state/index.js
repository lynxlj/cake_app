export default {
  userinfo: JSON.parse(window.localStorage.getItem('user-token')) || {},
  Header: {
    home: false,
    cart: false,
    prolist: false,
    detail: false,
    tool: false,
    search: false,
  },
  hasHeader: false,
  hasTabbar: false,
  isLogin: Boolean(window.localStorage.getItem('token')),
  cart: JSON.parse(window.localStorage.getItem('ih-cart')) || [],
  searchHistory: JSON.parse(window.localStorage.getItem('ih-search')) || [],
};
