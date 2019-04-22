<template>
  <div class="ih-cart" v-if='cartList.length !== 0'>
    <div class="ih-cart-pros">
      <div
      class="ih-cart-pro"
      v-for='pro in cartList'
      :key='pro.id'
      >
        <div class="ih-cart-pro-header">
          <label>
          <input type="checkbox"
          :checked='pro.isChecked'
          :value='pro.id'
          class="mint-checkbox-input"
          @click='changeProCheckedHandle(pro.id)'>
          <span class="mint-checkbox-core"></span>
          </label>
          <div class="ih-cart-pro-header-right">
            <div class="ih-cart-pro-header-right-store">
              {{pro.caketype}}
            </div>
            <i class="iconfont icon-msg"></i>
          </div>
        </div>
        <div
        class="ih-cart-pro-bottom"
        @touchstart="onTouchStart(pro)"
        @touchend="onTouchEnd"
        >
          <label>
          <input type="checkbox"
          :checked='pro.isChecked'
          :value='pro.id'
          class="mint-checkbox-input"
          @click='changeProCheckedHandle(pro.id)'>
          <span class="mint-checkbox-core"></span>
          </label>
          <div class="ih-cart-pro-bottom-detail">
            <div class="ih-cart-pro-bottom-detail-img">
              <img :src="handleImg(pro.cover)"/>
            </div>
            <div class="ih-cart-pro-bottom-detail-right">
              <div class="ih-cart-pro-bottom-detail-right-title">
                {{pro.cakename}}</div>
              <div class="ih-cart-pro-bottom-detail-right-price">
                <span @click.stop="reduceNumFn(pro)">-</span>
                {{pro.cakenum}}
                <span @click.stop="increaseNumFn(pro)">+</span><br/>
                ￥{{pro.cakeprice}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ih-cart-pro-total">
      <div class="ih-cart-pro-total-left">
        <div class="ih-cart-pro-total-left-checkednum">
          已选<span>{{checkedNum}}</span>商品
        </div>
        <div class="ih-cart-pro-total-left-totalprice">
          ￥<span>{{totalCountPrice.toFixed(2)}}</span>
        </div>
      </div>
      <div class="ih-cart-pro-total-right" @click="handleAccount">
        <mt-button size="large" type="danger">结算</mt-button>
      </div>
    </div>
    <!-- 结算页面 -->
    <div class="account" v-show="dt_isShowAccount && accountList.length !==0">
      <div @click.stop='toBackCartFn' class="account-header"><i class="iconfont icon-back"></i><span>我的订单</span></div>
      <div class="account-body">
        <div class="address">
          <div class="address-header">填写收货地址</div>
          <div class="address-body">
            <div class="address-body-content">
              收件人姓名:
              <input type="text" v-model="address_name">
            </div>
            <div class="address-body-content">
              收件人联系方式:
              <input type="text" v-model="address_tel">
            </div>
            <area-select v-model="selected" :data="pca" type='text'></area-select> 
            <div class="address-body-content">
              详细地址:
              <input type="text" v-model="address_content">
            </div>
          </div>
        </div>
        <div class="account-body-item">
          <ul class="account-body-item-header-first">
            <li>订单编号</li>
            <li>下单时间</li>
          </ul>
          <ul class="account-body-item-list-first" >
            <li>{{accountList.length !=0 &&accountList[0].order_id}}</li>
            <li>{{accountList.length !=0 &&accountList[0].order_time}}</li> 
          </ul>
          <ul class="account-body-item-header">
            <li>商品名称</li>
            <li>商品价格</li>
            <li>商品数量</li>
          </ul>
          <div class="account-body-item-last" v-for="(item,index) in accountList" :key="index">
            <ul class="account-body-item-list" >
              <li>{{item.cakename}}</li>
              <li>{{item.cakeprice}}</li>
              <li>{{item.cakenum}}</li>
            </ul>
          </div>
          <div class="account-total-price">总金额：{{handleTotalPriceFn(accountList)}}</div>
          <div class="account-confirm" @click="handleConfirmOrder">确定购买</div>
        </div>
      </div>
    </div>
    <!-- 付款页面 -->
    <div class="payment-page" v-show='dt_isShowPayment'>
      <div @click.stop='toBackCartFn' class="account-header"><i class="iconfont icon-back"></i><span>付款</span></div>
      <img src="../images/erweima.png" alt="" class="erweima">
      <p>请扫描上方二维码</p>
      <div @click="handleConfirmAccount" class="confirm">付款成功点击此处</div>
    </div>
  </div>
  <!--  -->
  <div class="ih-cart-empty" v-else>
    <div class="ih-cart-empty-icon">
      <i class="iconfont icon-cart"></i>
    </div>
    <p>购物车中还没有宝贝哦~</p>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import {
  mapState,
  mapGetters,
  mapMutations,
} from 'vuex';
import {
  findData,
  updateData,
 } from '@/services';
import { AreaCascader } from "vue-area-linkage"
import { pca, pcaa } from 'area-data';

export default {
  name: 'cart',
  data() {
    return {
      //购物车列表
      cartList: [],
      //选择商品数量
      checkedNum: 0,
      //选择商品金额
      totalCountPrice: 0,
      //订单列表
      accountList:[],
      //是否显示结算页面
      dt_isShowAccount:false,
      //是否显示付款界面
      dt_isShowPayment:false,
      pca:pca,
      pcaa:pcaa,
      selected:[],
      address_content:'',
      address_name:'',
      address_tel:'',
    };
  },
  computed: {
    ...mapState(['cart','totalCartCount']),
    ...mapGetters(['totalprice', 'checkednum']),
  },
  methods: {
    ...mapMutations(['changeProChecked', 'increaseNum', 'reduceNum', 'deleteCartById', 'changeHeader','totalCartCountFn',]),
    onTouchStart(pro) {
      this.timer = setTimeout(() => {
        this.$messagebox({
          title: '删除商品',
          message: `您确定要删除${pro.id}吗?`,
          showCancelButton: true,
        }).then((action) => {
          if (action === 'confirm') {
            //this.deleteCartById(id);
            //删除商品
            this.deleteProFn(pro);
          }
        });
      }, 2000);
    },
    onTouchEnd(e) {
      clearTimeout(this.timer);
    },
    // toDetail(pro) {
    //   window.localStorage.setItem('detail',JSON.stringify(pro))
    //   this.$router.push(`/detail/${pro._id}`);
    // },
    //改变商品选中状态
    changeProCheckedHandle(_id){
      this.cartList.map((item ,index) => {
        if(item.id === _id){
          item.isChecked = !item.isChecked;
        }
      })
      this.checkednumFn();
      this.totalCountFn();
    },
    //选择商品总数
    checkednumFn(){
      this.checkedNum = 0;
      this.cartList.map((item,index) => {
        if(item.isChecked){
          this.checkedNum = this.checkedNum + item.cakenum;
        }
      })
    },
    //选中商品总金额
    totalCountFn(){
      this.totalCountPrice = 0 ;
      this.totalCount = 0;
      this.cartList.map((item,index) => {
        if(item.isChecked){
          this.totalCountPrice = this.totalCountPrice + item.cakenum * Number(item.cakeprice);
        }
      })
    },
    //删除商品
    deleteProFn(pro){
      let username = JSON.parse(window.localStorage.getItem('user-token')).name;
      findData({ name: username, level: 0})
        .then((data) => {
          if (data.data.res_code === 1) {
          var cart = data.data.res_body.data[0].cart;
          for(var index in cart){
            if(cart[index].id === pro.id){
              cart[index].cakenum = cart[index].cakenum+1;
            }
          }
          cart = cart.filter((item,index) => {
            return item.id !== pro.id;
          })
          console.log('delete',cart)
          //就修改后的购物车数据存入本地
          let userInfo = JSON.parse(window.localStorage.getItem('user-token')) || {};
          userInfo.cart = cart;
          cart = JSON.stringify(cart);
          updateData({name:username,cart:cart,level:0}).then((data) => {
            if(data.data.res_code===1){
              this.cartList = this.cartList.filter((item,index) => {
                return item.id !== pro.id;
              })
              window.localStorage.setItem('user-token', JSON.stringify(userInfo));
              Toast('删除成功');
              this.reduceNum();
              this.totalCartCountFn();
            }else{
              Toast("删除失败");
            }
          });
        }
      })
    },
    //数量增加
    increaseNumFn(pro){
      let username = JSON.parse(window.localStorage.getItem('user-token')).name;
      findData({ name: username, level: 0})
        .then((data) => {
          if (data.data.res_code === 1) {
          var cart = data.data.res_body.data[0].cart;
          for(var index in cart){
            if(cart[index].id === pro.id){
              cart[index].cakenum = cart[index].cakenum+1;
            }
          }
          //就修改后的购物车数据存入本地
          let userInfo = JSON.parse(window.localStorage.getItem('user-token')) || {};
          userInfo.cart = cart;
          cart = JSON.stringify(cart);
          updateData({name:username,cart:cart,level:0}).then((data) => {
            if(data.data.res_code===1){
              this.increaseNum();
              Toast('添加成功');
              pro.cakenum = pro.cakenum + 1;
              window.localStorage.setItem('user-token', JSON.stringify(userInfo));
              this.checkednumFn();
              this.totalCountFn();
              this.totalCartCountFn();
            }else{
              Toast("添加失败");
            }
          });
        }
      })
    },
    //数量减少
    reduceNumFn(pro){
      let username = JSON.parse(window.localStorage.getItem('user-token')).name;
      findData({name:username,level:0}).then((data)=>{
				if (data.data.res_code === 1) {
          var cart = data.data.res_body.data[0].cart;
          for(var index in cart){
            if(cart[index].id === pro.id){
              if(cart[index].cakenum === 1 ){
                Toast('不能再减少了');
                return;
              }
              cart[index].cakenum = cart[index].cakenum-1;
            }
          }
          //就修改后的购物车数据存入本地
          let userInfo = JSON.parse(window.localStorage.getItem('user-token')) || {};
          userInfo.cart = cart;
          cart = JSON.stringify(cart);
          updateData({name:username,cart:cart,level:0}).then((data) => {
            if(data.data.res_code===1){
              Toast('减少成功');
              pro.cakenum = pro.cakenum - 1;
              window.localStorage.setItem('user-token', JSON.stringify(userInfo));
              this.checkednumFn();
              this.totalCountFn();
              this.totalCartCountFn();
            }else{
              Toast("减少失败");
            }
          });
        }
			});
    },
    //随机订单id
    fcreateRandomId() {
       return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
    },
    //结算功能
    handleAccount(){
      this.accountList = this.cartList.filter((item,index) => {
        return item.isChecked;
      })
      if(this.accountList.length === 0) this.$toast('请选择结算商品');;
      this.dt_isShowAccount = true;
      //获取下单时间
      let myDate = new Date();
      let year = myDate.getFullYear();
      let month = myDate.getMonth()+1;
      let day = myDate.getDate();
      let mytime=myDate.toLocaleTimeString();
      let totalPriceNow = this.handleTotalPriceFn(this.accountList)
      this.accountList.map((item,index )=> {
        item.order_id = this.fcreateRandomId();
        item.state = "待发货";
        item.order_time = year+'年'+month+'月'+day+'日'+mytime;
        item.totalPrice = totalPriceNow;
        item.isComment = false;
      });
      console.log('结算订单',this.accountList)
    },
    //结算金额
    handleTotalPriceFn(arr){
      let totalPriceNow = 0;
      arr.map((item,index) => {
        totalPriceNow = totalPriceNow + item.cakeprice*item.cakenum;
      })
      return totalPriceNow;
    },
    //确认订单
    handleConfirmOrder(){
      if(this.selected.length == 0||this.address_content==''||this.address_name==''||this.address_tel==''){
        this.$toast("请完整填写信息");
      }else{
        //显付款界面
        this.dt_isShowPayment = true;
      }
    },
    //付款确定购买
    handleConfirmAccount(){
      let username = JSON.parse(window.localStorage.getItem('user-token')).name;
      this.$ajax.findData({name:username,level:0}).then((data)=>{
        if (data.data.res_code === 1) {
          var cake = data.data.res_body.data[0].cake;
          var cart = data.data.res_body.data[0].cart;
          for(let j=0;j<this.accountList.length;j++){
            cart =cart.filter((item) => {
              return item.id != this.accountList[j].id;
            })
          }
          this.cartList = cart;
          let addressObj = this.selected[0]+this.selected[1]+this.address_content
          this.accountList.map(item => {
            item.address_name = this.address_name;
            item.address_tel = this.address_tel;
            item.address_content = addressObj;
          })
          cake.unshift(this.accountList);
          let userInfo = JSON.parse(window.localStorage.getItem('user-token')) || {};
          userInfo.cake = cake;
          userInfo.cart = cart;
          cake = JSON.stringify(cake);
          cart = JSON.stringify(cart);
          window.localStorage.setItem('order',cake)
          updateData({name:username,cake:cake,level:0}).then((data)=>{
            if(data.data.res_code===1){
              this.$toast('购买成功');
              window.localStorage.setItem('user-token', JSON.stringify(userInfo));
              this.totalCartCountFn();
              this.toBackCartFn();
            }else{
              this.$toast("购买失败");
            }
          });
          updateData({name:username,cart:cart,level:0}).then((data)=>{
            if(data.data.res_code===1){
              window.localStorage.setItem('user-token', JSON.stringify(userInfo));
              this.totalCartCountFn();
              this.dt_isShowAccount = false;
            }else{
            }
          });
        }
      });
    },
    //订单页面返回
    toBackCartFn(){
      this.dt_isShowAccount = false;
      this.dt_isShowPayment = false;
    },
    handleImg(url){
      return 'http://localhost:3000'+url;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.changeHeader('cart');
    });
  },
  beforeRouteLeave(to, from, next) {
    this.changeHeader('cart');
    next();
  },
  mounted(){
    this.cartList = JSON.parse(window.localStorage.getItem('user-token')).cart || [];
    let typeArr = [];
    this.$ajax.getAllType().then(data => {
      if(data.status === 200 && data.data.res_code ===1){
        typeArr = data.data.res_body.data;
        this.cartList.forEach(item => {
          typeArr.map((ele) => {
              if(item.caketype == ele._id){
                item.caketype = ele.name;
              }
          });
        })
        window.localStorage.setItem('ih-cart', JSON.stringify(this.cartList));
        this.cartList.map((item ,index) => {
            item.isChecked = false;
          })
      }else{
        Toast('获取列表失败')
      }
    })

  }
};
</script>

<style lang='scss' scoped>
@import '@/libs/vars.scss';
.ih-cart{
  position: relative;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  &-empty{
    height: 40%;
    background: #fff;
    padding: 30px 0;
    &-icon{
      width: 120px;
      height: 120px;
      margin: 0 auto;
      text-align: center;
      vertical-align: middle;
      padding: 30px 0;
      border: 1px solid $border-color;
      border-radius: 50%;
      i{
        font-size: 60px;
        color: $border-color;
      }
    }
    p{
      text-align: center;
      margin-top: 10px;
      color: $font-color;
    }
  }
}
.ih-cart-pros{
  flex: 1;
  overflow-x: hidden;
}
.ih-cart-pro{
  height: 150px;
  width: 100%;
  margin-top: 15px;
  padding: 0 10px;
  background: #fff;
  .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: $font-color-active;
    border-color: $font-color-active;
}
  &-header{
    height: 40px;
    border-bottom:1px solid $border-color;
    line-height: 40px;
    display: flex;
    &-right{
      width: 100%;
      margin-left: 10px;
      &-store{
        display: inline-block;
      }
      i{
        float: right;
      }
    }
  }
  &-bottom{
    height: 110px;
    display: flex;
    align-items: center;
    &-detail {
      display: flex;
      margin-left: 10px;
      &-img{
        img{
          width: 80px;
          height: 80px;
        }
      }
      &-right{
        margin-left: 10px;
        line-height: 27px;
        &-title{
          color: $font-color;
        }
        &-price{
          span{
            display: inline-block;
            width: 25px;
            height: 25px;
            border: 1px solid $border-color;
            line-height: 22px;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
  &-total{
    width: 100%;
    height: 50px;
    background: #fff;
    display: flex;
    justify-content: space-around;
    &-left{
      padding: 5px 0;
      &-checkednum{
        font-size: 14px;
        color: $font-color;
      }
    }
    &-right{
      .mint-button{
        width: 180px;
        margin: 5px;
      }
    }
  }
}
.account{
  position: fixed;
  height: 100%;
  width: 100%;
  background: pink;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
}
.account{
  z-index: 100;
  position: fixed;
  background: #fff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &-header{
    border-bottom: 1px solid #e6e6e6;
    height: 50px;
    line-height: 50px;
    position: relative;
    span{
      width: 100px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .icon-back{
      float: left;
      margin-left: 10px;
    }
  }
  &-body{
    font-size: 14px;
    height: 75%;
    overflow-y: auto;
    color: #322418;
    &-item{
      margin-bottom: 10px;
      &-header{
        height: 40px;
        line-height: 40px;
        background: #e6e6e6;
        &-first{
          height: 40px;
          line-height: 40px;
          background: #e6e6e6;
          li{
            float: left;
            width: 180px;
            text-align: center;
          }
        }
        li{
          float: left;
          width: 125px;
          text-align: center;
        }
      }
      &-list{
        border-bottom: 1px solid #e6e6e6;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        &-first{
          border-bottom: 1px solid #e6e6e6;
          font-size: 12px;
          height: 30px;
          line-height: 30px;
          li{
            text-align: center;
            float: left;
            width: 180px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
        li{
          text-align: center;
          float: left;
          width: 125px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
.account-total-price{
  font-size: 14px;
  border-bottom: 1px solid #e6e6e6;
  height: 30px;
  line-height: 30px;
  padding-left: 260px;
}
.account-confirm{
  text-align: center;
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: 110px;
  height: 50px;
  line-height: 50px;
  color: #fc655e;
  border: 1px solid #fc655e;
  border-radius: 10px;
}
.payment-page{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  z-index: 200;
  text-align: center;
  .erweima{
    margin-top: 40px;
    width: 200px;
    margin-bottom: 30px;
  }
  .confirm{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    top: 400px;
    width: 200px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    background: #fc655e;
    color: #fff;
  }
}
.address{
  padding: 10px;
  &-header{
    border-bottom:1px solid #efefef;
    height: 30px;
    line-height: 30px; 
  }
  input{
    border-color: #fefefe;
    width: 100%;
    margin-top: 5px;
    height: 20px;
    margin-bottom: 10px;
  }
  &-body{
    padding-top: 10px;
    &-content{
      padding-left: 10px;
      margin-top: 10px;
    }
  }
}
</style>
