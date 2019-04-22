<template>
  <div
  class='ih-prolist-body'>
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <div
      class="page-infinite-list"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="50">
        <div
        class="ih-prolist-body-pro"
        v-for="(pro,index) in proList"
        :id='pro._id'
        :key='index'
        @click='toDetail(pro)'
        >
          <img :src='handleImg(pro.cover)'/>
          <p>{{pro.name}}</p>
          <span>￥{{pro.price.toFixed(2)}}</span>
        </div>
      </div>
      <p v-show="loading" class="page-infinite-loading">
        <span v-if='!noMore'>Loading...</span>
        <span v-else>我也是有底线的哦...</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'prolist',
  data() {
    return {
      currentName: '',
      proList: [],
      loading: false,
      wrapperHeight: 0,
      page: 1,
      noMore: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.changeHeader('prolist');
    });
  },
  beforeRouteLeave(to, from, next) {
    this.changeHeader('prolist');
    next();
  },
  props: ['id'],
  beforeRouteUpdate(to, from, next) {
    this.getproListName(to.params.id);
    // this.$ajax.getProList(this.currentName).then((resp) => {
    //   this.proList = resp;
    // });
    next();
  },
  watch: {
    id() {
      // this.$ajax.getProList(this.id).then((resp) => {
      //   this.proList = resp;
      // });
    },
  },
  methods: {
    ...mapMutations(['changeHeader']),
    getproListName(id) {
      this.currentName = id;
    },
    toDetail(pro) {
      window.localStorage.setItem('detail',JSON.stringify(pro))
      this.$router.push(`/detail/${pro._id}`);
    },
    handleImg(url){
      return 'http://localhost:3000'+url;
    },
    // loadMore() {
    //   this.loading = true;
    //   if (!this.noMore) {
    //     setTimeout(() => {
    //       let obj = {};
    //       obj.info=this.currentName;
    //       obj.type='name';
    //       this.$ajax.find(obj).then((resp) => {
    //         if(resp.status === 200 && resp.data.res_code ===1){
    //           console.log(resp.data.res_body.data)
    //           if (resp.data.res_body.data.length === 0 ) {
    //             this.noMore = true;
    //           }
    //           resp.data.res_body.data.map(item => this.proList.push(item));
    //         }else{
    //           this.$toast('搜索失败')
    //         }
    //       });
    //       this.loading = false;
    //     }, 2500);
    //   }
    //},
  },
  mounted() {
    this.getproListName(this.$route.params.id);
    console.log('>>>',this.currentName)
    let obj = {};
    obj.info=this.currentName;
		obj.type='name';
    this.$ajax.find(obj).then((resp) => {
      if(resp.status === 200 && resp.data.res_code ===1){
        let store = window.localStorage.getItem("store");
        let arr = resp.data.res_body.data;
        let newArr = [];
        newArr = arr.filter((item)=>{
          return item.store == store;
        })
        this.proList = newArr;
        if(this.proList.length === 0){
          this.$toast('暂无搜索内容，请重新搜索');
          this.$router.push(`/search`);
        }
      }else{
        this.$toast('搜索失败')
      }
    });
    this.wrapperHeight
    = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
  },
};
</script>

<style lang='scss' scoped>
@import '@/libs/vars.scss';

.ih-prolist-body{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: white;
  &-pro{
    width: 180px;
    height: 220px;
    text-align: center;
    margin-bottom: 10px;
    margin-left: 5px;
    display: inline-block;
    img{
      width: 160px;
      height: 160px;
    }
    p{
      text-align: left;
      padding-left: 16px;
      margin-bottom: 5px;
    }
    span{
      float: left;
      margin-left: 16px;
    }
    i{
      font-size: 12px;
      text-decoration: line-through;
      float: left;
      line-height: 24px;
      margin-left: 10px;
    }
  }
}
.page {
    &-infinite {
      &-listitem {
        height: 50px;
        line-height: 50px;
        border-bottom: solid 1px #eee;
        text-align: center;
        &:first-child {
          border-top: solid 1px #eee;
        }
      }
      &-wrapper {
        width: 100%;
        margin-top: -1px;
        overflow: scroll;
      }
      &-loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: $font-color;
        font-size: 16px;
      }
    }
  }
</style>
