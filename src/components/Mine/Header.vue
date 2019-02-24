<template>
<div class="mine-header">
  <div class="bar">
    <router-link
      tag="i"
      to="/logout"
      class="iconfont icon-shezhi"
    >
    </router-link>
    <i class="iconfont icon-xiaoxitongzhi"></i>
  </div>
  <div v-if="isLogin" class="content">
    <div class="head-portrait">
      <img src="" alt="">
    </div>
    <div class="user-info">
      <p class="user-name">{{userinfo.username}}</p>
      <span class="user-level">{{userinfo.level|userlevel}}</span>
    </div>
  </div>
  <div v-if="!isLogin" class="notlogin">
    <p class="prompt">您还没有登录哦</p>
    <button @click="openLoginBox">立即登录</button>
  </div>
  <div v-if="showLoginBox" class="loginbox">
    <div>
      <span class="close" @click="closeLoginBox">X</span>
      <h1 class="logo"><img src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=1d476cc134dbb6fd3156ed74684dc07d/0b46f21fbe096b63bab9866a01338744ebf8ac6c.jpg"></h1>
      <input type="text" v-model="inputname" placeholder="输入用户名">
      <input type="password" v-model="inputpassword" placeholder="输入密码">
      <mt-button type="danger" size="large" @click="login">登录</mt-button>
    </div>
  </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
import {
  mapState,
  mapMutations,
} from 'vuex';
import { login } from '@/services';

export default {
  name: 'mineheader',
  computed: {
    ...mapState(['isLogin', 'userinfo']),
  },
  filters: {
    userlevel(n) {
      const level = {
        1: '铜牌会员',
        2: '黄金会员',
        3: '钻石会员',
      };
      return level[n];
    },
  },
  data() {
    return {
      showLoginBox: false,
      inputname: '',
      inputpassword: '',
    };
  },
  methods: {
    ...mapMutations(['changeLogStatus', 'storageUserinfo']),
    openLoginBox() {
      this.showLoginBox = true;
    },
    closeLoginBox() {
      this.showLoginBox = false;
    },
    login() {
      if (this.inputname.length !== 0 && this.inputpassword.length !== 0) {
        login({ username: this.inputname, password: this.inputpassword })
          .then((data) => {
            if (data.islogin === true) {
              window.localStorage.setItem('token', data.token);
              const userinfo = data.info;
              this.changeLogStatus();
              this.storageUserinfo(userinfo);
              this.showLoginBox = false;
              Toast('登录成功');
            } else {
              Toast('登录失败');
            }
          })
          .catch(() => {
            Toast('登录失败');
          });
      } else {
        Toast('用户名/密码不能为空');
      }
    },
  },
};

</script>

<style lang='scss' scoped>
.mine-header{
  height: 25%;
  background-size: 100% auto;
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540823319914&di=373f158625f3ae900695e43a964c343f&imgtype=0&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140407%2F0008020997552247_b.jpg');
  display: flex;
  flex-direction: column;
  .loginbox{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #3b3b3b, $alpha: .3);
    z-index: 99;
    transition: all .5;
    div{
      padding: 5%;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 40%;
      width: 100%;
      background-color: white;
      h1{
        height: 20%;
        margin-bottom: 8%;
        text-align: center;
        img{
          height: 100%;
        }
      }
      span.close{
        position: absolute;
        top: 5%;
        right: 3%;
      }
      input{
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        margin-bottom: 3%;
        width: 100%-5%;
        height: 12%;
        padding-left: 5%;
      }
    }
  }
  .bar{
    padding: 0 15px;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    i.iconfont{
      font-size: 24px;
      color: white;
    }
  }
  .notlogin{
      flex: 3;
      width: 100%;
      text-align: center;
      height: 100%;
      p.prompt{
        height:30%;
        font-size: 180%;
        color: white;
      }
      button{
        margin: 6%;
        height: 25%;
        width: 40%;
        background: none;
        border-radius: 3px;
        border: 1px solid white;
        color: white;
      }
  }
  .content{
    flex: 3;
    display: flex;
    align-items: center;
    .head-portrait{
      margin: 0 5.5%;
      width: 17.5%;
      height: 50%;
      border-radius: 50%;
      background-color: #f2ac9c;
    }
      .user-info{
      .user-name{
        color: white;
        font-size: 25px;
        font-weight: bold;
      }
      .user-level{
        margin-top: 10px;
        background-color: #3b3b3b;
        font-size: 12px;
        color: white;
        display: inline-block;
        padding: 0 10px;
        border-radius:10px;
        border: 1px solid #a8a8a8;
      }
    }
  }
}
</style>
