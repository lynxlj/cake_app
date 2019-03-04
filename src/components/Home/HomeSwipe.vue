<template>
  <div class="page-swipe">
    <mt-swipe :auto="4000">
      <mt-swipe-item class="slide1"><img src="../../assets/banners/banner1.jpg"/></mt-swipe-item>
      <mt-swipe-item class="slide2"><img src="../../assets/banners/banner2.jpg"/></mt-swipe-item>
      <mt-swipe-item class="slide3"><img src="../../assets/banners/banner3.jpg"/></mt-swipe-item>
      <mt-swipe-item class="slide4"><img src="../../assets/banners/banner4.jpg"/></mt-swipe-item>
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
      height:200px;
      color: #fff;
      font-size: 30px;
      text-align: center;
      margin-bottom: 15px;
    }
    .mint-swipe-item {
      line-height:200px;
      img{
        width: 100%;
        height: 100%;
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
