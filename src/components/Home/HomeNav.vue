<template>
  <div class="nav">
    <nav>
      <router-link
        :to="{
          name: item.name,
          params: {
            id: item.id,
          },
        }"
        class='nav-item'
        v-for="item in navList"
        :key="item.id"
        tag="div"
      >
        {{item.text}}
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'homenav',
  data() {
    return {
      navList: [{
        id: 1,
        name: 'recommend',
        text: '推荐',
      }, {
        id: 2,
        name: 'detail',
        text: '箱包',
      }, {
        id: 3,
        name: 'detail',
        text: '首饰',
      }, {
        id: 4,
        name: 'detail',
        text: '手表',
      }, {
        id: 5,
        name: 'detail',
        text: '服装',
      }, {
        id: 6,
        name: 'detail',
        text: '配饰',
      }, {
        id: 7,
        name: 'detail',
        text: '鞋靴',
      }, {
        id: 8,
        name: 'detail',
        text: '美妆',
      }],
    };
  },
};
</script>

<style lang='scss'>
.nav{
  width: 100%;
  overflow-y: hidden;
  nav{
    height: 64px;
    display: flex;
    width: 125%;
    padding-bottom: 14px;
    .nav-item{
      letter-spacing: 1px;
      font-size: 17px;
      text-align: center;
      width: calc(100%/7);
      line-height: 50px;
      position: relative;
      &.router-link-active{
        font-size: 20px;
        font-weight: bold;
      }
      &.router-link-active::after{
        content: '';
        width: 32px;
        height: 48px;
        position: absolute;
        top: 0;
        left: 25%;
        border-bottom: 2px solid #322418;
      }
    }
  }
}
</style>
