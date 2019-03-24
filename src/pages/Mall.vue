<template>
  <div class="ih-cart">
    <div class="ih-cart-navbar">
      <i class="iconfont icon-sousuo" @click.stop='toSearch'></i>
      <router-link
      to='/mall/category'
      tag='div'><span>分类</span></router-link>
      <!-- <router-link
      to='/mall/brand'
      tag='div'><span>品牌</span></router-link> -->
      <i class="iconfont icon-msg"></i>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'mall',
  methods: {
    toSearch() {
      this.$router.push('/search');
    },
  },
};
</script>

<style lang='scss' scoped>
@import '@/libs/vars.scss';
.mint-tab-item.is-selected{
  border-bottom: 3px solid $font-color-active;
  color: $font-color-active;
  height: 46px;
}
.iconfont{
  font-size: 20px;
  margin-top: 12px;
}
.mint-tabbar.is-fixed {
  position: relative;
}
.mint-tabbar{
  background: #fff;
}
.mint-tab-item-label{
  line-height: 1;
}
.router-link-active{
  border-bottom: 3px solid $font-color-active;
  color: $font-color-active;
  border-right:none;
  font-weight: bolder;
}
.ih-cart{
  height: 100%;
  background: #fff;
  &-navbar{
    display:flex;
    border-bottom: 1px solid $border-color;
    padding: 10px;
    justify-content: space-between;
    line-height: 30px;
    span{
      font-size: 20px;
    }
    div{
      text-align: center;
    }
    i{
      margin-top: 4px;
    }
  }
}
</style>
