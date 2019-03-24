<template>
  <div class="content">
    <div class="choose-store">
      当前选择店铺
      <span class="choose-store-name">{{chooseStore}}</span>
      <span class="choose-store-confirm" @click="handleConfirmStore">点击选择店铺</span>
    </div>
    <mt-picker 
    v-show="isShowPicker"
    :slots="slots" 
    :visibleItemCount=pickerNum
    @change="getValues"
    class="g-picker"
    ></mt-picker>
    <HomeSwipe />
    <SecondNav />
    <HomeList />
  </div>
</template>

<script>
import HomeSwipe from '@/components/Home/HomeSwipe';
import SecondNav from '@/components/Home/SecondNav';
import HomeList from '@/components/Home/HomeList';
import {
  mapState,
  mapGetters,
  mapMutations,
} from 'vuex';
export default {
  name: 'recommend',
  components: {
    HomeSwipe,
    SecondNav,
    HomeList,
  },
   data() {
    return {
      pickerNum: 5,
      chooseStore:'',
      slots: [{
          flex: 1,
          values: [1,2,3,4],
          className: 'slot1',
          textAlign: 'center'
        }],
      isShowPicker:false,
    };
  },
  created(){
    this.$ajax.getAllStore().then(data => {
      console.log(data)
      if(data.status === 200){
        let arr = data.data.res_body.data;
        let arrNew = [];
        arr.map(item => {
          arrNew.push(item.name)
        })
        this.slots[0].values = arrNew;
        window.localStorage.setItem('store',arrNew[0])
      }else{
        console.log('获取店铺列表失败')
      }
    })
  },
  methods:{
    getValues(picker, values) {
      this.chooseStore = values[0]
      this.isShowPicker=false
      console.log(values[0])
      window.localStorage.setItem('store',values[0])
    },
    //选择店铺
    handleConfirmStore(){
      this.isShowPicker = true;
    }
  }
};

</script>

<style lang='scss' scoped>
.g-picker{
  width: 100%;
  position: fixed;
  background: #fff;
  z-index: 100;
  bottom: 0;
}
.choose-store{
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 10px;
  color: #C69C6D;
  &-name{
    color: #322418;
    padding-left: 10px;
  }
  &-confirm{
    display: inline-block;
    float:right;
    margin-right: 10px;
  }
}
</style>
