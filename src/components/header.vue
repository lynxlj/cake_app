<template>
  <div :class="{
    header_home:Header.home,
    header_cart:Header.cart,
    header_prolist:Header.prolist,
    header_detail:Header.detail,
    header_tool:Header.tool,
    search:Header.search,
    }"
  >
    <div class="back" @click="goback" v-if="!hasTabbar">
      <i class="iconfont icon-back"></i>
    </div>
    <div v-if="Header.home" class="logo">
      <!-- <i class="iconfont icon-liwu"></i> -->
      <img src="../assets/logo.png" alt="">
    </div>
    <router-link  to="/search" tag="div" class="input"
    v-if="Header.home || Header.prolist">
      <i class="iconfont icon-sousuo"></i>
      <input type="text" placeholder="来搜索吧" />
    </router-link>
    <span v-if="Header.cart">购物车({{totalCartCount}})</span>
    <router-link
      to="/cart"
      class="iconfont icon-cart"
      tag="i"
      v-if="Header.detail"
    >
    </router-link>
    <span
      class="ih-badge"
      v-if="Header.detail"
    >
    {{totalCartCount | maxNumber}}
    </span>
    <span v-if="Header.detail">商品详情</span>
    <span v-if="Header.tool">设置</span>
    <div class="msg" v-if="Header.home||Header.cart">
      <i class="iconfont icon-msg"></i>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
} from 'vuex';

export default {
  name: 'bodyheader',
  computed: {
    ...mapState(['Header', 'hasHeader', 'hasTabbar','totalCartCount']),
    ...mapGetters(['totalCount']),
  },
  filters: {
    maxNumber(n) {
      return n > 99 ? '99+' : n;
    },
  },
  methods: {
    goback() {
      if(this.Header.search) this.$router.push(`/home`);
      else this.$router.back();
    },
  },
};

</script>

<style lang="scss" scoped>
@import '@/libs/vars.scss';

[class^='header']{
  position: relative;
  div.msg{
    .iconfont.icon-msg{
      font-size: 22px;
    }
    position: absolute;
    top:0;
    right: 5%;
  }
}
div.back{
  position: fixed;
  left: 3%;
}
.header_{
  &cart,&tool,&detail{
    border-bottom: 1px solid #e6e6e6;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    line-height: 50px;
  }
}
.header_detail{
  i.icon-cart{
    position: fixed;
    right: 5%;
  }
  .ih-badge {
    position: absolute;
    right: 2%;
    top: 10%;
    text-align: center;
    background-color: $font-color-active;
    line-height: 15px;
    font-size: 12px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    color: #fff;
  }
}
.search{
  width: 100%;
  height: 100%;
  div{
    top:2%;
  }
}
.header_home{
  width: 100%;
  height: 100%;
  display: flex;
  div{
    display: flex;
    align-items: center;
    height: 100%;
    &.liwu{
      width: 15%;
      padding-left: 5%;
    }
  }
}
.header_prolist{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div.input i.iconfont.icon-sousuo{
    top: 4px;
  }
}
div.input{
  width: 60%;
  margin-left: 5%;
  position: relative;
  input{
    padding-left: 15%;
    height: 26px;
    width: 100%;
    border: none;
    border-radius: 13px;
    background-color: #f4f4f4;
  }
  i.iconfont.icon-sousuo{
    color: #000;
    position: absolute;
    top:15px;
    left:3%;
  }
}
i.iconfont{
  &.icon-liwu{
    color: #f2ac9c;
  }
  &.icon-sousuo{
    position: fixed
  }
  font-size: 22px;
}
.logo{
  margin-left: 18px;
  img{
      width: 24px;
      height: 24px;
    }
}
</style>
