<template>
  <div class="ih-tabbar">
    <router-link
    v-for='route in routes'
    :key='route.path'
    :to='route.path'
    tag='div'
    >
    <span class="ih-badge" v-if="route.path === '/cart'">{{totalCartCount || 0 | maxNumber}}</span>
    <i :class='`iconfont icon-${route.icon}`'></i>
    {{route.text}}
    </router-link>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations
} from 'vuex';

export default {
  name: 'Tabbar',
  computed: {
    ...mapState(['totalCartCount']),
    ...mapGetters(['totalCount']),
    routes() {
      return this.$router.options.routes.filter(route => route.isTabbar === true);
    },
  },
  filters: {
    maxNumber(n) {
      return n > 99 ? '99+' : n;
    },
  },
};
</script>

<style lang='scss'>
@import '@/libs/vars.scss';

.ih-tabbar{
  height: 100%;
  display: flex;
  color: $font-color;
  border-top:1px solid $border-color;
  & > div{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 16px;
    text-align: center;
    position: relative;
  }
  i{
    font-size: 20px;
  }
  .router-link-exact-active, .router-link-active{
    color: $font-color-active;
  }
  .ih-badge {
    position: absolute;
    right: 20px;
    top: -7px;
    background-color: $font-color-active;
    line-height: 20px;
    font-size: 14px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: #fff;
  }
}
</style>
