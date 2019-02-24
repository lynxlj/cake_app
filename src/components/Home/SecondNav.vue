<template>
  <div class="second-nav">
    <div class='title'>
      <div class='item'>
        <i class="iconfont icon-right"></i>
        <p>100%正品</p>
      </div>
      <div class='item'>
        <i class="iconfont icon-right"></i>
        <p>专家鉴定</p>
      </div>
      <div class='item'>
        <i class="iconfont icon-right"></i>
        <p>假一赔三</p>
      </div>
      <div class='item'>
        <i class="iconfont icon-right"></i>
        <p>急速售卖</p>
      </div>
    </div>
    <div class='nav-body'>
      <div class='item'>
        <i class="iconfont icon-zulin"></i>
        <p>租赁</p>
      </div>
      <div class='item'>
        <i class="iconfont icon-shequ"></i>
        <p>社区</p>
      </div>
      <div class='item'>
        <i class="iconfont icon-naqu"></i>
        <p>拿趣</p>
      </div>
      <div class='item'>
        <i class="iconfont icon-yongjin"></i>
        <p>佣金</p>
      </div>
      <div class='item'>
        <i class="iconfont icon-lingquan"></i>
        <p>领券</p>
      </div>
      <div class='item'>
        <i class="iconfont icon-gujia"></i>
        <p>估价</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'secondnav',
};

</script>

<style lang='scss' scoped>
.second-nav{
  padding-bottom:15px;
  .title{
    display: flex;
    justify-content: space-around;
    .item{
      color: #fd9291;
      font-size: 12px;
      line-height: 14px;
      display: flex;
      p{
        margin-left: 3px;
        line-height: 14px;
      }
    }
  }
  .nav-body{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .item{
      margin-top: 5%;
      display: flex;
      background-color: #f8f8f7;
      width: 27.5%;
      margin-left: 4.2%;
      justify-content: center;
      letter-spacing: 1px;
      border-radius: 5px;
      i{
        font-size: 26px;
      }
      p{
        margin-left: 3px;
        line-height: 170%;
        }
    }
  }
}
</style>
