<template>
  <div class="content">
    <div class="choose-store">
      当前选择店铺
      <span class="choose-store-name">{{chooseStore}}</span>
      <span class="choose-store-confirm" @click="handleConfirmStore">点击选择店铺</span>
    </div>
    <div v-show="isShowPicker" class="g-picker-wrapper">
      <div class="shade" @click.stop="handleConfirmStore"></div>
      <mt-picker 
      ref="picker"
      :slots="slots" 
      :visibleItemCount=pickerNum
      @change='change'
      class="g-picker"
      ></mt-picker>
      <div class="picker-confirm" @click.stop.prevent='handlegetPickerValue()'>确定选择</div>
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
      storeArr:[],
    };
  },
  update() {
    console.log(this.$refs.picker.getValues()[0])
  },
  created(){
    this.isChoose = false;
    this.$ajax.getAllStore().then(data => {
      if(data.status === 200){
        this.storeArr = data.data.res_body.data;
        let arrNew = [];
        this.storeArr.map(item => {
          arrNew.push(item.name)
        })
        this.slots[0].values = arrNew;
        let _index = JSON.parse(window.localStorage.getItem('storeIndex'))||0;
        this.chooseStore = this.slots[0].values[_index]
        window.localStorage.setItem('store',this.storeArr[_index]._id)
        this.$set(this.slots[0],'defaultIndex',_index);
      }else{
        console.log('获取店铺列表失败')
      }
    })
  },
  methods:{
    change(picker, values) {
			//console.log(values)
    },
    handlegetPickerValue() {
      this.chooseStore = this.$refs.picker.getValues()[0]
      this.isShowPicker=false;
      let _index = 0;
      this.slots[0].values.map((item,index) => {
        if(item == this.$refs.picker.getValues()[0]){
          _index = index;
        }
      })
      let _id = '';
      this.storeArr.map( item => {
        if(this.chooseStore === item.name){
          _id = item._id
        }
      })
      window.localStorage.setItem('storeIndex',_index)
      window.localStorage.setItem('store',_id)
    },
    //选择店铺
    handleConfirmStore(){
      this.isShowPicker = !this.isShowPicker;
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
.g-picker-wrapper{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 100;
  .shade{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0,.5)
  }
}
</style>
