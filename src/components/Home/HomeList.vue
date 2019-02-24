<template>
  <div class="homelist">
    <div class="title">
    <img src="../../homelink.jpg">
    </div>
    <div class="fashion-guide">
      <h3>潮流导购<span>Fashion Guide</span></h3>
      <div class="listwrapper">
        <div
          class="list"
        >
          <div class='item'>
            <img src="http://static.91xinshang.com/pc/images/index/boutique_02.png">
            <p>轻奢品牌</p>
          </div>
          <div class='item'>
            <img src="http://static.91xinshang.com/pc/images/index/boutique_01.png?v=01">
            <p>重奢品牌</p>
          </div>
          <div class='item'>
            <img src="http://static.91xinshang.com/pc/images/index/boutique_02.png">
            <p>轻奢品牌</p>
          </div>
          <div class='item'>
            <img src="http://static.91xinshang.com/pc/images/index/boutique_01.png?v=01">
            <p>重奢品牌</p>
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
  },
};

</script>

<style lang='scss' scoped>
.homelist{
  width: 100%;
  .title{
    text-align: center;
    margin-bottom: 15px;
    img{
    width: 90%;
    height: auto;
    }
  }
  .fashion-guide{
    padding-left: 15px;
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
        width: 200%;
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
          width:17%;
        }
      }
    }
  }
}
</style>
