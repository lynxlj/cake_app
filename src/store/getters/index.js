export default {
  totalprice(state) {
    return state.cart.reduce((result, item) => {
      let newResult = result;
      if (item.isChecked === true) {
        newResult = result + (item.newPrice * item.num);
      }
      return newResult;
    }, 0);
  },
  checkednum(state) {
    return state.cart.reduce((result, item) => {
      let newResult = result;
      if (item.isChecked === true) {
        newResult = result + item.num;
      }
      return newResult;
    }, 0);
  },
  totalCount(state) {
    if(state.isLogin){
      return state.userinfo.cart.reduce((result, item) => {
        const newResult = result + item.cakenum;
        return newResult;
      }, 0);
    }
  },
};
