<template>
  <div class="ih-cart" v-if='cart.length !== 0'>
    <div class="ih-cart-pros">
      <div
      class="ih-cart-pro"
      v-for='pro in cart'
      :key='pro.id'
      >
        <div class="ih-cart-pro-header">
          <label>
          <input type="checkbox"
          :checked='pro.isChecked'
          :value='pro.id'
          class="mint-checkbox-input"
          @click='changeProChecked(pro.id)'>
          <span class="mint-checkbox-core"></span>
          </label>
          <div class="ih-cart-pro-header-right">
            <div class="ih-cart-pro-header-right-store">
              {{pro.brand}}
            </div>
            <i class="iconfont icon-msg"></i>
          </div>
        </div>
        <div
        class="ih-cart-pro-bottom"
        @touchstart="onTouchStart(pro.id)"
        @touchend="onTouchEnd"
        >
          <label>
          <input type="checkbox"
          :checked='pro.isChecked'
          :value='pro.id'
          class="mint-checkbox-input"
          @click='changeProChecked(pro.id)'>
          <span class="mint-checkbox-core"></span>
          </label>
          <div class="ih-cart-pro-bottom-detail" @click="toDetail(pro.id)">
            <div class="ih-cart-pro-bottom-detail-img">
              <img :src="pro.imgs[0].src"/>
            </div>
            <div class="ih-cart-pro-bottom-detail-right">
              <div class="ih-cart-pro-bottom-detail-right-title">
                {{pro.title}}--{{pro.id}}</div>
              <div class="ih-cart-pro-bottom-detail-right-price">
                <span @click.stop="reduceNum(pro.id)">-</span>
                {{pro.num}}
                <span @click.stop="increaseNum(pro.id)">+</span><br/>
                ￥{{pro.newPrice.toFixed(2)}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ih-cart-pro-total">
      <div class="ih-cart-pro-total-left">
        <div class="ih-cart-pro-total-left-checkednum">
          已选<span>{{checkednum}}</span>商品
        </div>
        <div class="ih-cart-pro-total-left-totalprice">
          ￥<span>{{totalprice.toFixed(2)}}</span>
        </div>
      </div>
      <div class="ih-cart-pro-total-right">
        <mt-button size="large" type="danger">结算</mt-button>
      </div>
    </div>
  </div>
  <div class="ih-cart-empty" v-else>
    <div class="ih-cart-empty-icon">
      <i class="iconfont icon-cart"></i>
    </div>
    <p>购物车中还没有宝贝哦~</p>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
} from 'vuex';

export default {
  name: 'cart',
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['totalprice', 'checkednum']),
  },
  methods: {
    ...mapMutations(['changeProChecked', 'increaseNum', 'reduceNum', 'deleteCartById', 'changeHeader']),
    onTouchStart(id) {
      this.timer = setTimeout(() => {
        this.$messagebox({
          title: '删除商品',
          message: `您确定要删除${id}吗?`,
          showCancelButton: true,
        }).then((action) => {
          if (action === 'confirm') {
            this.deleteCartById(id);
            this.$toast('删除成功！');
          }
        });
      }, 2000);
    },
    onTouchEnd() {
      clearTimeout(this.timer);
    },
    toDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.changeHeader('cart');
    });
  },
  beforeRouteLeave(to, from, next) {
    this.changeHeader('cart');
    next();
  },
};
</script>

<style lang='scss' scoped>
@import '@/libs/vars.scss';
.ih-cart{
  position: relative;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  &-empty{
    height: 40%;
    background: #fff;
    padding: 30px 0;
    &-icon{
      width: 120px;
      height: 120px;
      margin: 0 auto;
      text-align: center;
      vertical-align: middle;
      padding: 30px 0;
      border: 1px solid $border-color;
      border-radius: 50%;
      i{
        font-size: 60px;
        color: $border-color;
      }
    }
    p{
      text-align: center;
      margin-top: 10px;
      color: $font-color;
    }
  }
}
.ih-cart-pros{
  flex: 1;
  overflow-x: hidden;
}
.ih-cart-pro{
  height: 150px;
  width: 100%;
  margin-top: 15px;
  padding: 0 10px;
  background: #fff;
  .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: $font-color-active;
    border-color: $font-color-active;
}
  &-header{
    height: 40px;
    border-bottom:1px solid $border-color;
    line-height: 40px;
    display: flex;
    &-right{
      width: 100%;
      margin-left: 10px;
      &-store{
        display: inline-block;
      }
      i{
        float: right;
      }
    }
  }
  &-bottom{
    height: 110px;
    display: flex;
    align-items: center;
    &-detail {
      display: flex;
      margin-left: 10px;
      &-img{
        img{
          width: 80px;
          height: 80px;
        }
      }
      &-right{
        margin-left: 10px;
        line-height: 27px;
        &-title{
          color: $font-color;
        }
        &-price{
          span{
            display: inline-block;
            width: 25px;
            height: 25px;
            border: 1px solid $border-color;
            line-height: 22px;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
  &-total{
    width: 100%;
    height: 50px;
    background: #fff;
    display: flex;
    justify-content: space-around;
    &-left{
      padding: 5px 0;
      &-checkednum{
        font-size: 14px;
        color: $font-color;
      }
    }
    &-right{
      .mint-button{
        width: 180px;
        margin: 5px;
      }
    }
  }
}
</style>
