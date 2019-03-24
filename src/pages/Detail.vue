<template>
  <div class="ih-detail" v-cloak>
    <div class="ih-detail-wrap">
      <div class="ih-detail-top">
        <div class="ih-detail-top-sildes">
          <mt-swipe :auto="4000" :speed="600">
            <mt-swipe-item
            class="slide"
            v-for='item in 4'
            :key='item'
            ><img :src='handleImg(detail.cover)'/></mt-swipe-item>
          </mt-swipe>
        </div>
        <p class="ih-detail-top-title">{{detail._id}}--{{detail.name}}</p>
        <span>￥{{detail.price}}</span>
        <!-- <i>￥{{detail.oldPrice}}</i> -->
      </div>
      <div class="ih-detail-content">
        <div class="ih-detail-content-text">
          <h3>商品评论</h3>
          <table class="comment" v-show="detail.comment && detail.comment.length !== 0 ">
            <tr
            v-for='item in detail.comment'
            :key='item.id'
            >
              <td class="title">@{{item.user_name}}:</td>
              <td>{{item.content}}</td>
            </tr>
          </table>
          <div v-show="detail.comment && detail.comment.length === 0 " class="no-comment">该商品暂无评论...</div>
        </div>
      </div>
    </div>
    <div class="ih-detail-bottom">
      <div class="ih-detail-bottom-left">
        <i class="iconfont icon-msg"></i>
        <i class="iconfont icon-aixin"></i>
      </div>
      <div class="ih-detail-bottom-middle" @click='handleAddToCart(detail)'>
        加入购物车
      </div>
      <div class="ih-detail-bottom-right">
        立即购买
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapMutations,
} from 'vuex';

export default {
  name: 'detail',
  data() {
    return {
      currentId: '',
      detail: {},
      detailSrc:'',
    };
  },
  methods: {
    handleImg(url){
      return 'http://localhost:3000'+url;
    },
    getDetailId(id) {
      this.currentId = id;
    },
    ...mapMutations(['addToCart', 'changeHeader','totalCartCountFn']),
    handleAddToCart(detail) {
      //this.addToCart(detail);
      if(!window.localStorage.getItem('user-token')){
        this.$toast('请先登录哦');
        return;
      }
      let username = JSON.parse(window.localStorage.getItem('user-token')).name;
      this.$ajax.findData({name:username,level:0}).then((data)=>{
        if (data.data.res_code === 1) {
          var cart = data.data.res_body.data[0].cart;
          var isHave = false;
          for(var index in cart){
            if(cart[index].id === detail._id){
              isHave = true;
              cart[index].cakenum = cart[index].cakenum+1;
            }
            
          }
          if(!isHave){
            cart.unshift({
              id:detail._id,
              cakename:detail.name,
              cakeprice:detail.price,
              caketype:detail.type,
              cakenum:1,
              cover:detail.cover,
            });
          }
          let userInfo = JSON.parse(window.localStorage.getItem('user-token')) || {};
          userInfo.cart = cart;
          cart = JSON.stringify(cart);
          this.$ajax.updateData({name:username,cart:cart,level:0}).then((data)=>{
            //console.log('>>>',data);
            if(data.data.res_code===1){
              this.$toast('加入购物车成功');
              window.localStorage.setItem('user-token', JSON.stringify(userInfo));
              this.totalCartCountFn();
            }else{
              this.$toast("加入购物车失败");
            }
          });
        }
      });
    },
  },
  mounted() {
    // this.getDetailId(this.$route.params.id);
    // this.$ajax.getDetailById(this.currentId).then((resp) => {
    //   this.detail = resp;
    //   this.detail.id = this.currentId;
    // });
    //获取商品详情
    this.detail = JSON.parse(window.localStorage.getItem('detail'));
    //console.log('detail',this.detail)
    this.detailSrc = this.handleImg(this.detail.cover);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.changeHeader('detail');
    });
  },
  beforeRouteLeave(to, from, next) {
    this.changeHeader('detail');
    next();
  },
};
</script>

<style lang='scss' scoped>
@import '@/libs/vars.scss';

[v-cloak]{
  display: none;
}
.ih-detail{
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-top{
    width: 100%;
    padding-bottom: 50px;
    border-bottom: 1px solid $border-color;
    &-sildes{
      width: 100%;
      height: 300px;
      img{
        width: 100%;
      }
    }
    &-title{
      padding: 10px 10px;
    }
    span{
      float: left;
      margin-left: 14px;
    }
    i{
      font-size: 12px;
      text-decoration: line-through;
      float: left;
      line-height: 24px;
      margin-left: 10px;
    }
  }
  &-wrap{
    flex: 1;
    overflow-x: hidden;
  }
  &-content{
    padding: 0 10px;
    h3{
      font-weight: bolder;
      margin-top: 10px;
    }
    table{
      margin: 10px 0;
      tr{
        font-size: 16px;
        .title{
          font-size: 12px;
          margin-right: 20px;
        }
      }
    }
    img{
      width: 355px;
      height: 355px;
      display: block;
      margin: 10px auto;
    }
  }
  &-bottom{
    height: 50px;
    border-top: 1px solid $border-color;
    display: flex;
    text-align: center;
    i{
      display: inline-block;
      width: 50px;
      height: 50px;
    }
    &-middle,&-right{
      line-height: 50px;
      width: 130px;
    }
    &-middle{
      color: $font-color-active;
      border-left: 1px solid $border-color
    }
    &-right{
      background: $font-color-active;
      color: #fff;
    }
    &-left{
      .iconfont{
        font-size: 22px;
        line-height: 50px;
      }
      .iconfont.icon-aixin{
        font-size: 26px;
      }
    }
  }
}
.comment{
  display: block;
  tr{
    display: block;
    border-bottom: 1px #322418 solid;
    margin-bottom: 10px;
    background: #e6e6e6;
  }
  td{
    display: block;
    padding: 0 20px 5px;
  }
  .title{
    padding: 5px 5px;
  }
}
.no-comment{
  padding-top:30px; 
  text-align: center;
  color: #322418;
}
</style>
