<template>
  <div class="ih-cart-categorylist">
    <div class="ih-cart-categorylist-left">
      <router-link
      v-for='cate in categorylist'
      :to='`/mall/category/${cate._id}`'
      :key='cate._id'
      :id='cate._id'
      tag='div'>{{cate.name}}</router-link>
    </div>
      <div class="ih-cart-categorylist-right">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categorylist: [],
    };
  },
  mounted() {
    this.$ajax.getAllType().then(data => {
      if(data.status === 200 && data.data.res_code ===1){
        this.categorylist = data.data.res_body.data;
      }else{
        Toast('获取列表失败')
      }
      let obj = {};
      obj.info= this.categorylist[0]._id;
      obj.type='type';
      this.$ajax.find(obj).then((data)=>{
        //console.log('>>>',data);
        this.$router.push(`/mall/category/${this.categorylist[0]._id}`);
      });
    })
  },
};
</script>

<style lang='scss' scoped>
@import '@/libs/vars.scss';
.router-link-exact-active.router-link-active{
  border-left: 3px solid $font-color-active;
  border-bottom: none;
  color: $font-color-active;
  height: 46px;
  border-right:none;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  font-size: 18px;
}
.ih-cart{
  height: 100%;
  background: #fff;
  &-navbar{
    padding: 0 10px;
  }
  &-categorylist,&-brandlist{
    padding-top: 10px;
    display: flex;
    overflow-x: hidden;
    background: #fff;
    overflow: hidden;
    height: 90%;
    &-left{
      display: flex;
      flex-direction: column;
      border-top: none;
      min-width: 60px;
      min-height: 336px;
      div{
        font-size: 14px;
        width: 60px;
        height: 40px;
        border-right: 1px solid $border-color;
        line-height: 40px;
        text-align: center;
      }
    }
    &-right{
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
