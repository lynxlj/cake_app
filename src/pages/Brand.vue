<template>
  <div class="ih-cart-brandlist">
    <div class="ih-cart-brandlist-left">
      <router-link
      v-for='brand in brandlist'
      :to='`/mall/brand/${brand.id}`'
      :key='brand.id'
      :id='brand.id'
      tag='div'>{{brand.text}}</router-link>
    </div>
      <div class="ih-cart-brandlist-right">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Brand',
  data() {
    return {
      brandlist: [],
    };
  },
  mounted() {
    this.$ajax.getBrandlist().then((resp) => {
      this.brandlist = resp;
      this.$router.push(`/mall/brand/${resp[0].id}`);
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
      min-height: 240px;
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
