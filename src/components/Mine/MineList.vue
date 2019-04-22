<template>
  <div class="minelist">
    <ul>
      <li @click="handleToAboutStore">店铺相关><i class="iconfont icon-next" ></i></li>
      <li @click="handleToAboutUs">关于我们><i class="iconfont icon-next" ></i></li>
      <li @click="handleToAbout">公告><i class="iconfont icon-next" ></i></li>
    </ul>
    <div class="store" v-show="dt_isShowStore">
      <div @click.stop='toBackMineFn' class="store-header"><i class="iconfont icon-back"></i><span>店铺相关</span></div>
      <div class="store-body">
        <div class="store-body-item" v-for="item in storeList" :key='item._id'>
          <div class="info">店铺ID：<span>{{item._id || '暂无信息'}}</span></div>
          <div class="info">店铺地址：<span>{{item.address || '暂无信息'}}</span></div>
          <div class="info">店铺名字：<span>{{item.name || '暂无信息'}}</span></div>
          <div class="info">店铺电话：<span>{{item.tel || '暂无信息'}}</span></div>
        </div>
      </div>
    </div>
    <div class="us" v-show="dt_isShowUs">
      <div @click.stop='toBackMineFn' class="us-header"><i class="iconfont icon-back"></i><span>关于我们</span></div>
      <div class="us-body">
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;廿一客坚持选用来自新西兰的天然乳脂奶油，并且在艺术上同样坚持美感与质感俱善，所有原材料均选用地道极品，近50种源自国外，并由廿一客亲自挑选、加工。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来自新西兰的奶油和来自比利时的巧克力，是蛋糕最纯正的选择，也是蓝天白云和浪漫温馨的异国情怀；来自美国或土耳其的榛子、新西兰的猕猴桃和金果、美国的黑樱桃，是水果坚果中的极品；来自牙买加的摩根船长朗姆酒、爱尔兰百利甜酒，还有上品的白兰地、樱桃酒和咖啡酒调出风味，更加令人倾倒……我们其实明白，如果这一切都从国内选购，一定能轻松很多，当然，那样也就不会有与众不同的廿一客。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;与很多你曾经吃过的蛋糕坯子的单调口味相比，廿一客的每一款蛋糕必须用原料烘烤蛋糕坯，如果我不说，你一定不会知道，但味蕾不会欺骗你。比如栗茸暗香真的用上好栗子来烘烤蛋糕坯……坯子各具精髓和风味，宛如真爱，多样但永远唯一。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在欧洲传统工艺的基础上，充分发挥创意，原创全新而时尚的口味。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;廿一客尊重并了解，蛋糕时尚性的根本驱动力是创意和产品。在配方、口味、形制等任何细节，廿一客从未停止对新产品和新口味的信仰和研判，至今已诞生数十种独创品类。同时，廿一客从全球范围内的材质精选、制作工艺、后期服务等方面为实现创意做出保证。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;杜绝任何色素、添加剂与防腐剂。</p>
      </div>
    </div>
    <div class="about" v-show="dt_isShowAbout">
      <div @click.stop='toBackMineFn' class="about-header"><i class="iconfont icon-back"></i><span>公告</span></div>
      <div class="about-body">
        <img src="../../assets/about.png" alt="">
        <img src="../../assets/about2.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'minelist',
  data(){
    return{
      dt_isShowStore:false,
      dt_isShowUs:false,
      dt_isShowAbout:false,
      storeList: [],
    }
  },
  methods:{
    handleToAboutStore(){
      this.dt_isShowStore = true;
      this.$ajax.getAllStore().then(data => {
        if(data.status === 200){
          this.storeList = data.data.res_body.data;
          console.log(this.storeList)
        }else{
          console.log('获取店铺列表失败')
        }
      })
    },
    handleToAboutUs(){
      this.dt_isShowUs = true;
    },
    handleToAbout(){
      this.dt_isShowAbout = true;
    },
    //返回我的页面
    toBackMineFn(){
      this.dt_isShowStore = false;
      this.dt_isShowUs = false;
      this.dt_isShowAbout = false;
    },
  }
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
.store{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #efefef;
  &-header{
    border-bottom: 1px solid #e6e6e6;
    height: 50px;
    line-height: 50px;
    position: relative;
    span{
      width: 100px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .icon-back{
      float: left;
      margin-left: 10px;
    }
  }
  &-body{
    padding-top: 10px;
    padding-bottom: 20px;
    height: 100%;
    overflow-y: auto;
    &-item{
      padding-bottom:50px; 
      padding-top:20px; 
      padding-left: 20px;
      color: #322418;
      border-bottom: 1px solid #322418;
      span{
        color: #C69C6D;
      }
    }
  }
}
.us{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #efefef;
  &-header{
    border-bottom: 1px solid #e6e6e6;
    height: 50px;
    line-height: 50px;
    position: relative;
    span{
      width: 100px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .icon-back{
      float: left;
      margin-left: 10px;
    }
  }
  &-body{
    padding-top: 10px;
    padding-bottom: 20px;
    height: 100%;
    overflow-y: auto;
   p{
     margin: 5px;
     margin-bottom: 10px;
     color: #322418;
   }
  }
}
.about{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #efefef;
  &-header{
    border-bottom: 1px solid #e6e6e6;
    height: 50px;
    line-height: 50px;
    position: relative;
    span{
      width: 100px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .icon-back{
      float: left;
      margin-left: 10px;
    }
  }
  &-body{
    padding-top: 10px;
    padding-bottom: 20px;
    height: 100%;
    overflow-y: auto;
    img{
     width: 100%;
   }
  }
}
</style>
