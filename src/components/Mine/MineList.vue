<template>
  <div class="minelist">
    <ul>
      <li>夺包中奖订单<i class="iconfont icon-next"></i></li>
      <li>0元抽PINKO><i class="iconfont icon-next"></i></li>
      <li>我的点心><i class="iconfont icon-next"></i></li>
      <li>心上客服><i class="iconfont icon-next"></i></li>
      <li>帮助中心><i class="iconfont icon-next"></i></li>
      <li>活动报名><i class="iconfont icon-next"></i></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'minelist',
};

</script>

<style lang="scss" scoped>
.minelist{
  background: white;
  padding-left: 15px;
  ul li{
    padding: 17px 0;
    padding-left: 6px;
    border-bottom: 1px solid #e7e7e7;
    i{
      float: right;
      color: #e7e7e7;
      margin-right: 17px;
    }
  }
}
</style>
