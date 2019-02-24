<template>
  <div
  class='ih-prolist-body'>
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <div
      class="page-infinite-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="50">
        <div
        class="ih-prolist-body-pro"
        v-for="(pro,index) in proList"
        :id='pro.id'
        :key='index'
        @click='toDetail(pro.id)'
        >
          <img :src='pro.img'/>
          <p>{{pro.title}}</p>
          <span>￥{{pro.newPrice.toFixed(2)}}</span><i>￥{{pro.oldPrice.toFixed(2)}}</i>
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
      currentId: '',
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
    this.getproListId(to.params.id);
    this.$ajax.getProList(this.currentId).then((resp) => {
      this.proList = resp;
    });
    next();
  },
  watch: {
    id() {
      this.$ajax.getProList(this.id).then((resp) => {
        this.proList = resp;
      });
    },
  },
  methods: {
    ...mapMutations(['changeHeader']),
    getproListId(id) {
      this.currentId = id;
    },
    toDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
    loadMore() {
      this.loading = true;
      if (!this.noMore) {
        setTimeout(() => {
          this.$ajax.getProList(this.currentId).then((resp) => {
            resp.map(item => this.proList.push(item));
            this.page = this.page + 1;
            if (this.page === resp[0].page) {
              this.noMore = true;
            }
            this.loading = false;
          });
        }, 2500);
      }
    },
  },
  mounted() {
    this.getproListId(this.$route.params.id);
    this.$ajax.getProList(this.currentId).then((resp) => {
      this.proList = resp;
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
