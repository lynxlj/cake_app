<template>
  <div class="page-swipe">
    <mt-swipe :auto="4000">
      <mt-swipe-item class="slide1"><img src="http://static.91xinshang.com/pc/images/index/banner_06.jpg"/></mt-swipe-item>
      <mt-swipe-item class="slide2"><img src="http://static.91xinshang.com/pc/images/index/banner_07.jpg"/></mt-swipe-item>
      <mt-swipe-item class="slide3"><img src="http://static.91xinshang.com/pc/images/index/banner_08.jpg"/></mt-swipe-item>
      <mt-swipe-item class="slide4"><img src="http://static.91xinshang.com/pc/images/index/banner_09.jpg"/></mt-swipe-item>
      <mt-swipe-item class="slide5"><img src="http://static.91xinshang.com/pc/images/index/banner_01.jpg"/></mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: 'homeswipe',
};

</script>

<style lang='scss'>
.page {
  &-swipe {
    .mint-swipe {
      height: 200px;
      color: #fff;
      font-size: 30px;
      text-align: center;
      margin-bottom: 15px;
    }
    .mint-swipe-item {
      line-height: 200px;
      img{
        width: 100%
      }
    }
    .mint-swipe-indicator {
      &.is-active{
        width: 20px;
        background-color: #222222;
      }
    width: 10px;
    height: 2px;
    border-radius: 3px;
    display: inline-block;
    background: #a2a2a2;
    opacity: 1;
    margin: 0 3px;
    transition: width 0.3s;
}
  }
}
</style>
