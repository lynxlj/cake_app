<template>
  <div class="wrapper">
    <div class="identity-wrapper">
      <div class="identity">
        <p>我是买家</p>
        <i class="iconfont icon-zhuanhuan"></i>
        <p>我是卖家</p>
      </div>
      <div class="data">
        <ul>
          <li>
            <span class="number">{{isLogin?userinfo.coupon:0}}</span>
            <span class="desc">优惠券</span>
          </li>
          <li>
            <span class="number">￥{{isLogin?userinfo.envelopes:0}}</span>
            <span class="desc hongbao">红包</span>
          </li>
          <li>
            <span class="number">{{isLogin?userinfo.credit:0}}</span>
            <span class="desc">信用额度</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="tab">
      <div class="tab-item">
        <i class="iconfont icon-icon_dindgan"></i>
        <span>我的订单</span>
      </div>
      <div class="tab-item">
        <i class="iconfont icon-gongdan"></i>
        <span>我租到的</span>
      </div>
      <div class="tab-item">
        <i class="iconfont icon-aixin"></i>
        <span>收藏关注</span>
      </div>
      <div class="tab-item">
        <i class="iconfont icon-shequ"></i>
        <span>我的社区</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
} from 'vuex';

export default {
  name: 'minetab',
  computed: {
    ...mapState(['userinfo', 'isLogin']),
  },
};

</script>

<style lang="scss">
.wrapper{
  height: 33%;
  .identity-wrapper{
    height: 57%;
    background-color:white;
    .data{
      height: 50%;
      ul{
        height: 100%;
        display: flex;
        align-items: center;
        li{
          border-left: 1px solid #e6e6e6;
          width: calc(100%/3);
          height: 30%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          span.desc{
            font-size: 14px;
            &.hongbao{
              color: #fc655e;
            }
          }
        }
      }
    }
    .identity{
      border-bottom: 1px solid #e6e6e6;
      height: 50%;
      line-height: 64px;
      display: flex;
      p{
        text-align: center;
        width: calc((100%-16px)/2);
      }
      i.iconfont{
        color: #a6a6a6;
      }
    }
  }
  .tab{
    display: flex;
    height:34%;
    justify-content: space-around;
    margin-top: 2.5%;
    background-color:white;
    &-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i.iconfont{
        font-size: 24px;
      }
      span{
        font-size: 14px;
      }
    }
  }
}
</style>
