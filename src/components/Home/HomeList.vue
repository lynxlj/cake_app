<template>
  <div class="homelist">
    <div class="title">
    <img src="../../images/nav.jpg">
    </div>
    <div class="fashion-guide">
      <h3>廿一客<span>分区</span></h3>
      <div class="listwrapper">
        <div
          class="list"
        >
          <div class='item' @click="toMallList('蛋糕')">
            <img src="../../images/cake.jpg">
            <p>蛋糕</p>
          </div>
          <div class='item' @click="toMallList('冰淇淋')">
            <img src="../../images/ice.jpg">
            <p>冰淇淋</p>
          </div>
          <div class='item' @click="toMallList('面包')">
            <img src="../../images/bread.jpg">
            <p>面包</p>
          </div>
          <div class='item' @click="toMallList('咖啡')">
            <img src="../../images/coffee.jpg">
            <p>咖啡</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homelist',
  methods: {
    toMallList(type){
      this.$router.push(`/mall/category/${type}`);
    }
  },
};

</script>

<style lang='scss' scoped>
.homelist{
  width: 100%;
  .title{
    width: 100%;
    height: 110px;
    text-align: center;
    margin-bottom: 15px;
    border: 2px solid #C69C6D;
    border-radius: 20px;
    img{
    width: 50%;
    height: auto;
    }
  }
  .fashion-guide{
    padding-left: 15px;
    padding-bottom: 30px;
    h3{
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 15px;
      span{
        font-size: 14px;
        font-weight:normal;
        color: #4a4a4a;
        margin-left: 15px;
      }
    }
    .listwrapper{
      overflow-y: hidden;
      .list{
        display: flex;
        width: 150%;
        .item{
          img{
            width: 100%;
            //height: 150px;
          }
          p{
            margin-top: 5px;
            color: #4a4a4a;
            text-align: center;
          }
          margin-right: 15px;
          width:25%;
        }
      }
    }
  }
}
</style>
