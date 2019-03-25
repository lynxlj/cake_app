<template>
  <div class="content">
    <div class="choose-store">
      当前选择店铺
      <span class="choose-store-name">{{chooseStore}}</span>
      <span class="choose-store-confirm" @click="handleConfirmStore">点击选择店铺</span>
    </div>
    <div v-show="isShowPicker">
      <mt-picker 
      ref="picker"
      :slots="slots" 
      :visibleItemCount=pickerNum
      class="g-picker"
      ></mt-picker>
      <div class="picker-confirm" @click.stop='handlegetPickerValue'>确定选择</div>
    </div>
    <HomeSwipe />
    <!-- <SecondNav /> -->
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
          values: [],
          className: 'slot1',
          textAlign: 'center',
          defaultIndex: 0,
        }],
      isShowPicker:false,
      isChoose:false,
    };
  },
  created(){
    this.isChoose = false;
    this.$ajax.getAllStore().then(data => {
      if(data.status === 200){
        let arr = data.data.res_body.data;
        let arrNew = [];
        arr.map(item => {
          arrNew.push(item.name)
        })
        this.slots[0].values = arrNew;
        let _index = JSON.parse(window.localStorage.getItem('storeIndex'))||0;
        this.chooseStore = this.slots[0].values[_index]
        window.localStorage.setItem('store',arrNew[_index])
        this.$set(this.slots[0],'defaultIndex',_index);
      }else{
        console.log('获取店铺列表失败')
      }
    })
  },
  methods:{
    handlegetPickerValue() {
      this.chooseStore = this.$refs.picker.getValues()[0]
      this.isShowPicker=false;
      let _index = 0;
      this.slots[0].values.map((item,index) => {
        if(item == this.$refs.picker.getValues()[0]){
          _index = index;
        }
      })
      window.localStorage.setItem('storeIndex',_index)
      window.localStorage.setItem('store',this.$refs.picker.getValues()[0])
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
  bottom: 40px;
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
.picker-confirm{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  background: #C69C6D;
  text-align: center;
  line-height: 40px;
  z-index: 200;
  color: #fff;
  font-size: 16px;
}
</style>
