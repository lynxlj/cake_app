<template>
  <div>
    <h3 class="cateh3">{{currentText}}</h3>
    <div class="ih-cart-categorylist-left-types">
      <div
      class="ih-cart-categorylist-left-types-type"
      v-for='type in CategoryTypeList'
      :key='type.id'
      :id='type.id'
      @click='toDetail(type)'
      >
        <img :src='handleImg(type.cover)' alt="">
        <p class="price">价格：¥{{type.price}}</p>
        <p>名称：{{type.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  name: 'CategoryList',
  data() {
    return {
      currentText: '',
      CategoryTypeList: [],
    };
  },
  beforeRouteUpdate(to, from, next) {
     this.getCategoryTypeListText(to.params.id);
    // this.$ajax.getCategoryTypeList(this.currentId).then((resp) => {
    //   this.CategoryTypeList = resp;
    // });
    let obj = {};
    obj.info=this.currentText;
		obj.type='type';
		this.$ajax.find(obj).then((data)=>{
			if(data.status === 200 && data.data.res_code ===1){
        let store = window.localStorage.getItem("store");
        let arr = data.data.res_body.data;
        let newArr = [];
        newArr = arr.filter((item)=>{
          return item.store == store;
        })
        this.CategoryTypeList = newArr;
      }else{
        Toast('获取列表失败')
      }
		});
    next();
  },
  methods: {
    handleImg(url){
      return 'http://localhost:3000'+url;
    },
    getCategoryTypeListText(text) {
      this.currentText= text;
    },
    //进入详情页
    toDetail(item) {
      //console.log('item',item)
      //将商品详情存入本地
      window.localStorage.setItem('detail',JSON.stringify(item))
      this.$router.push(`/detail/${item._id}`);
    },
  },
  mounted() {
     this.getCategoryTypeListText(this.$route.params.id);
    // this.$ajax.getCategoryTypeList(this.currentId).then((resp) => {
    //   this.CategoryTypeList = resp;
    // });
    let obj = {};
    obj.info=this.currentText;
		obj.type='type';
		this.$ajax.find(obj).then((data)=>{
      //console.log('>>>2',data);
      if(data.status === 200 && data.data.res_code ===1){
        let store = window.localStorage.getItem("store");
        let arr = data.data.res_body.data;
        let newArr = [];
        newArr = arr.filter((item)=>{
          return item.store == store;
        })
        this.CategoryTypeList = newArr;
      }else{
        Toast('获取列表失败')
      }
		});
  },
};
</script>

<style lang='scss' scopde>
.cateh3{
    text-align: center;
    margin: 20px auto;
  }
.ih-cart-categorylist-left{
  &-types{
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-around;
    &-type{
      display: inline-block;
      width: 50%;
      height: 90px;
      margin-bottom: 30px;
      text-align: center;
      font-size: 12px;
      color: #322418;
      img{
        width: 60px;
        height: 60px;
      }
      .price{
        color: #C69C6D;
      }
    }
  }
}
</style>
