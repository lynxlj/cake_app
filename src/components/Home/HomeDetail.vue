<template>
  <div class="home-detail">
    <div class="title">
      <img :src="title.img">
      <div class="text">
        <ul>
          <li
            v-for="(text,index) in descSplit"
            :key="index"
          >
          {{text}}
          </li>
        </ul>
        <p>
          {{title.title}}
        </p>
      </div>
    </div>
    <div class="menu">
    </div>
    <div class="list">
      <div class="list-item">
      <ProList :id='getcurrentId'></ProList>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import ProList from '@/pages/ProList';

export default {
  name: 'homeDetail',
  components: { ProList },
  data() {
    return {
      title: {
        img: '',
        title: '',
        desc: '',
      },
      list: [],
    };
  },
  computed: {
    descSplit() {
      return this.title.desc.split('');
    },
    getcurrentId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.$ajax.homedetail('1').then((data) => {
      this.title = { ...data };
    }).catch((err) => {
      Toast(err);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.title = {
      img: '',
      title: '',
      desc: '',
    };
    this.$ajax.homedetail(from.params.id).then((data) => {
      this.title = { ...data };
      next();
    }).catch((err) => {
      Toast(err);
    });
  },
};
</script>

<style lang='scss' scoped>
.home-detail{
  .menu{
    width: 100%;
    height: 30px;
    border-bottom: 1px  solid #e6e6e6;
  }
  .title{
    position: relative;
    width: 100%;
    padding: 25% 0;
    .text{
      width: 66%;
      height: 30%;
      position: absolute;
      left:17%;
      bottom: 10%;
      background-color: rgba(white,0.8);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      ul{
        li{
          padding:0 4px;
          line-height: 14px;
          float: left;
          border-right: 1px solid #f2ac9c;
          font-size: 14px;
        }
        li:last-child{
          border-right: none;
        }
      }
      p{
        font-size: 18px;
      }
    }
    img{
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
