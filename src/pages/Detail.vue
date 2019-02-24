<template>
  <div class="ih-detail" v-cloak>
    <div class="ih-detail-wrap">
      <div class="ih-detail-top">
        <div class="ih-detail-top-sildes">
          <mt-swipe :auto="4000" :speed="600">
            <mt-swipe-item
            class="slide"
            v-for='slide in detail.sildes'
            :key='slide.id'
            ><img :src="slide.src"/></mt-swipe-item>
          </mt-swipe>
        </div>
        <p class="ih-detail-top-title">{{detail.title}}--{{currentId}}<br/>{{detail.brand}}</p>
        <span>￥{{detail.newPrice}}</span><i>￥{{detail.oldPrice}}</i>
      </div>
      <div class="ih-detail-content">
        <div class="ih-detail-content-text">
          <h3>商品详情</h3>
          <table>
            <tr
            v-for='item in detail.details'
            :key='item.detailText'
            >
              <td class="title">{{item.detailTitle}}</td>
              <td>{{item.detailText}}</td>
            </tr>
          </table>
          <h3>图文详情</h3>
          <img
          v-for='img in detail.imgs'
          :src='img.src'
          :key='img.id'/>
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
    };
  },
  methods: {
    getDetailId(id) {
      this.currentId = id;
    },
    ...mapMutations(['addToCart', 'changeHeader']),
    handleAddToCart(detail) {
      this.addToCart(detail);
      this.$toast('加入购物车成功！');
    },
  },
  mounted() {
    this.getDetailId(this.$route.params.id);
    this.$ajax.getDetailById(this.currentId).then((resp) => {
      this.detail = resp;
      this.detail.id = this.currentId;
    });
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
          display: inline-block;
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
      margin-left: 5px;
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
</style>
