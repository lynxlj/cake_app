<template>
  <div class="search-wrapper">
    <div class="input">
      <i class="iconfont icon-sousuo"></i>
      <input
      type="text"
      placeholder="请输入你需要查找的商品"
      ref='searchInput'
      v-model="searchResult"
      />
    </div>
    <div class="ih-search-content">
      <div
      v-if="hasResult"
      class="ih-search-content-result"
      :id='searchResult'
      @click="toProductsList(searchResult)"
      >
        {{searchResult}}
      </div>
      <div v-else>
        <div>
          <h3>历史搜索:</h3><i @touchstart='cleanSearchHistory' class="iconfont icon-empty"></i>
          <div
          v-if='searchHistory.length !== 0'
          class="ih-search-content-history">
            <div
            class="ih-search-content-history-item"
            v-for="(item, index) in searchHistory"
            :key='index'
            @touchstart="toProductsList(item.title)"
            >
            {{item.title}}
            </div>
          </div>
          <div
          v-else
          class="ih-search-content-history">
            没有搜索历史
          </div>
        </div>
        <!-- <div>
          <h3>热门搜索:</h3>
          <i
          class="iconfont icon-update-copy"
          @touchstart='updateHotSearch'></i>
          <div class="ih-search-content-hot">
            <div
            class="ih-search-content-hot-item"
            v-for="item in hotSearch"
            :key='item.id'
            @touchstart="toProductsList(item.title)"
            >
            {{item.title}}
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
} from 'vuex';

export default {
  name: 'search',
  data() {
    return {
      hotSearch: [],
      searchResult: '',
    };
  },
  computed: {
    ...mapState(['searchHistory']),
    hasResult() {
      return this.searchResult;
    },
  },
  created() {
   // this.getHotHistory();
  },
  methods: {
    ...mapMutations(['addToSearch', 'cleanSearchHistory', 'changeHeader']),
    // getHotHistory() {
    //   this.$ajax.getHotSearch().then((resp) => {
    //     this.hotSearch = resp;
    //   });
    // },
    toProductsList(name) {
      this.addToSearch({ title: name });
      this.$router.push(`/prolist/${name}`);
      // let obj= {};
      // obj.info=this.name;
      // obj.type='name';
      // this.$ajax.find(obj).then((resp) => {
      //   if(resp.status === 200 && resp.data.res_code ===1){
      //     if(resp.data.res_body.data.length === 0){
      //       this.$toast('暂无搜索内容，请重新搜索');
      //     }else{
      //       this.$router.push(`/prolist/${name}`);
      //     }          
      //   }else{
      //     this.$toast('搜索失败')
      //   }
      // });
    },
    updateHotSearch() {
      this.getHotHistory();
    },
  },
  mounted() {
    this.$refs.searchInput.focus();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.changeHeader('search');
    });
  },
  beforeRouteLeave(to, from, next) {
    this.changeHeader('search');
    next();
  },
};
</script>

<style lang="scss" scoped>
@import '@/libs/vars.scss';

.search-wrapper{
  height: 100%;
  background-color: #fff;
  .input{
    width: 60%;
    margin-left: 5%;
    position: fixed;
    top: 10px;
    left: 30px;
    input{
      padding-left: 15%;
      height: 26px;
      width: 100%;
      border: none;
      border-radius: 13px;
      background-color: #f4f4f4;
      outline: none;
    }
    i.iconfont.icon-sousuo{
      color: #000;
      position: absolute;
      top:7px;
      left:3%;
    }
  }
}
.ih-search-content{
  h3{
    font-weight: bolder;
    font-size: 18px;
    display: inline;
  }
  .iconfont{
    font-size: 20px;
    float: right;
  }
  padding: 20px;
  &-history,&-hot{
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    color: $font-color;
    &-item{
      display: inline-block;
      padding: 10px;
      margin: 5px 10px;
      background: #efefef;
      border-radius: 15px;
    }
  }
  &-result{
    background: #efefef;
    padding: 10px;
    border-radius: 15px;
  }
}
</style>
