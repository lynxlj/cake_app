import types from '../mutationsTypes';

export default {
  [types.CHANGE_PRO_CHECKED](state, id) {
    state.cart.map((item) => {
      const newItem = item;
      if (item.id === id) {
        newItem.isChecked = !newItem.isChecked;
      }
      return newItem;
    });
  },
  [types.INCREASE_NUM](state, id) {
    state.cart.map((item) => {
      const newItem = item;
      if (item.id == id) {
        newItem.cakenum += 1;
      }
      return newItem;
    });
  },
  [types.REDUCE_NUM](state, id) {
    state.cart.map((item) => {
      const newItem = item;
      if (item.id == id) {
        if (item.num > 1) {
          newItem.cakenum -= 1;
        } else {
          newItem.cakenum = 1;
        }
      }
      return newItem;
    });
  },
  [types.ADD_TO_CART](state, detail) {
    const newDetail = {
      ...detail,
      num: 1,
      isChecked: false,
    };
    let isExist = false;
    state.cart = state.cart.map((item) => {
      const newItem = item;
      if (item.id === newDetail.id) {
        newItem.num += 1;
        isExist = true;
      }
      return newItem;
    });
    if (isExist === false) {
      state.cart.push(newDetail);
    }
  },
  [types.CHANGE_LOG_STATUS](state) {
    state.isLogin = !state.isLogin;
    return state;
  },
  [types.STORAGR_USERINFO](state, userinfo) {
    state.userinfo = { ...userinfo };
    return state;
  },
  [types.CHANGE_HEADER](state, where) {
    state.Header[where] = !state.Header[where];
    return state;
  },
  [types.CHANGE_HASHEADER](state, status) {
    state.hasHeader = status;
    return state;
  },
  [types.CHANGE_HASTABBAR](state, status) {
    state.hasTabbar = status;
    return state;
  },
  [types.DELETE_CART_BY_ID](state, id) {
    state.cart = state.cart.filter(item => item.id !== id);
  },
  [types.ADD_TO_SEARCH](state, search) {
    const newSearchHistory = {
      ...search,
    };
    let repeatIndex = '';
    let isRepeat = false;
    state.searchHistory = state.searchHistory.map((item, index) => {
      const newItem = item;
      if (newItem.title === newSearchHistory.title) {
        repeatIndex = index;
        isRepeat = true;
      }
      return newItem;
    });
    if (isRepeat) {
      state.searchHistory.splice(repeatIndex, 1);
    }
    state.searchHistory.unshift(newSearchHistory);
  },
  [types.CLEAN_SEARCH_HISTORY](state) {
    state.searchHistory = [];
    window.localStorage.removeItem('ih-search');
  },
  [types.TOTAL_CART_COUNT_FN](state) {
    let total = 0;
    let arr = JSON.parse(window.localStorage.getItem('user-token')) || [];
    if(arr.length !== 0){
      JSON.parse(window.localStorage.getItem('user-token')).cart.map((item,index) => {
        total = total + item.cakenum;
      })
    }
    state.totalCartCount = total;
    window.localStorage.setItem('total-cart-count',total);
  },
  [types.STORAGE_ORDER](state, order) {
    state.order = order;
  },
  [types.CLEAR](state, opt) {
    state[opt] = '';
  },
};
