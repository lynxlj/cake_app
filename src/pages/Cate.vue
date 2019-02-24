<template>
  <div class="ih-cart-categorylist">
    <div class="ih-cart-categorylist-left">
      <router-link
      v-for='cate in categorylist'
      :to='`/mall/category/${cate.id}`'
      :key='cate.id'
      :id='cate.id'
      tag='div'>{{cate.text}}</router-link>
    </div>
      <div class="ih-cart-categorylist-right">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categorylist: [],
    };
  },
  mounted() {
    this.$ajax.getCategorylist().then((resp) => {
      this.categorylist = resp;
      this.$router.push(`/mall/category/${resp[0].id}`);
    });
  },
};
</script>

<style lang='scss' scoped>
@import '@/libs/vars.scss';
.router-link-exact-active.router-link-active{
  border-left: 3px solid $font-color-active;
  border-bottom: none;
  color: $font-color-active;
  height: 46px;
  border-right:none;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  font-size: 20px;
}
.ih-cart{
  height: 100%;
  background: #fff;
  &-navbar{
    padding: 0 10px;
  }
  &-categorylist,&-brandlist{
    padding-top: 10px;
    display: flex;
    overflow-x: hidden;
    &-left{
      display: flex;
      flex-direction: column;
      border-top: none;
      min-width: 60px;
      min-height: 336px;
      div{
        font-size: 14px;
        width: 60px;
        height: 40px;
        border-right: 1px solid $border-color;
        line-height: 40px;
        text-align: center;
      }
    }
    &-right{
      flex: 1;
    }
  }
}
</style>
