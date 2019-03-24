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
      <img src="../../images/header.png" alt="">
    </div>
    <div class="user-info">
      <p class="user-name">{{userinfo.name}}</p>
      <!-- <span class="user-level">{{userinfo.level|userlevel}}</span> -->
    </div>
  </div>
  <div v-if="!isLogin" class="notlogin">
    <p class="prompt">您还没有登录哦</p>
    <button @click="openLoginBox">立即登录</button>
    <a @click="openRegisterBox" class="register_a">现在注册</a>
  </div>
  <div v-if="showLoginBox" class="loginbox">
    <div>
      <span class="close" @click="closeLoginBox">X</span>
      <h1 class="logo"><img src="../../images/header.png"></h1>
      <input type="text" v-model="inputname" placeholder="输入用户名">
      <input type="password" v-model="inputpassword" placeholder="输入密码">
      <a class="forget-password" @click="handleForgetPwdFn()">忘记密码？</a>
      <mt-button type="danger" size="large" @click="login">登录</mt-button>
    </div>
  </div>
  <div v-if="showRegisterBox" class="loginbox">
    <div>
      <span class="close" @click="closeRegisterBox">X</span>
      <h1 class="logo"><img src="../../images/header.png"></h1>
      <input type="text" v-model="registername" placeholder="输入用户名">
      <input type="text" v-model="registertruename" placeholder="输入真实姓名方便找回密码">
      <input type="password" v-model="registerpasswordone" placeholder="输入密码">
      <input type="password" v-model="registerpasswordtwo" placeholder="再次输入密码">
      <mt-button type="danger" size="large" @click="register">注册</mt-button>
    </div>
  </div>
  <div v-if="showFindPwd" class="findbox">
    <div>
      <span class="close" @click="closeFindBox">X</span>
      <h1 class="logo"><img src="../../images/header.png"></h1>
      <input type="text" v-model="findname" placeholder="输入用户名">
      你的真实姓名：<input type="text" v-model="findtruename" placeholder="密保问题答案">
      <input type="password" v-model="findpasswordone" placeholder="输入密码">
      <input type="password" v-model="findpasswordtwo" placeholder="再次输入密码">
      <mt-button type="danger" size="large" @click="find">修改</mt-button>
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
import { login ,register,updateData,findData} from '@/services';

export default {
  name: 'mineheader',
  computed: {
    ...mapState(['isLogin', 'userinfo','order']),
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
      showRegisterBox: false,
      inputname: '',
      inputpassword: '',
      registername: '',
      registertruename:'',
      registerpasswordone: '',
      registerpasswordtwo: '',
      orderNow:Array,
      showFindPwd:false,
      findname: '',
      findtruename: '',
      findpasswordone: '',
      findpasswordtwo: '',
    };
  },
  methods: {
    ...mapMutations(['changeLogStatus', 'storageUserinfo','storageOrder','totalCartCountFn']),
    openLoginBox() {
      this.showLoginBox = true;
    },
    openRegisterBox() {
      this.showRegisterBox = true;
    },
    closeLoginBox() {
      this.showLoginBox = false;
    },
    closeRegisterBox() {
      this.showRegisterBox = false;
    },
    closeFindBox() {
      this.showFindPwd = false;
    },
    //修改密码
    find(){
      if (this.findname.length === 0) {
        Toast('请输入用户名');
        return;
      }
      if (this.findtruename.length === 0) {
        Toast('请输入真实姓名修改密码');
        return;
      }
      if (this.findpasswordone === '' || this.findpasswordtwo === '') {
        Toast('请输入密码');
        return;
      }
      if (this.findpasswordone != this.findpasswordtwo) {
        Toast('两次密码输入不一致');
        return;
      }
      if(this.findname.length !== 0 && this.findpasswordone.length !== 0 && this.findpasswordone == this.findpasswordtwo && this.findtruename.length !==0){
        findData({name:this.findname,level:0}).then(data => {
          console.log(data)
          if(data.status === 200){
            if(data.data.res_body.data[0].true_name == this.findtruename){
              updateData({name:this.findname,password:this.findpasswordone,level:0,true_name:this.findtruename}).then(data => {
                if(data.status === 200){
                  Toast('修改成功')
                  this.closeFindBox();
                }else{
                  Toast('修改失败')
                }
              })
            }else{
              Toast('真实姓名与注册时不相符')
            }
          }else{
            Toast('网络错误')
          }
        })
      }
    },
    //忘记密码
    handleForgetPwdFn(){
      console.log('forget')
      this.showLoginBox = false;
      this.showFindPwd = true;
    } ,
    //用户注册
    register(){
      if (this.registername.length === 0) {
        Toast('请输入用户名');
        return;
      }
      if (this.registerpasswordone === '' || this.registerpasswordtwo === '') {
        Toast('请输入密码');
        return;
      }
      if (this.registerpasswordone != this.registerpasswordtwo) {
        Toast('两次密码输入不一致');
        return;
      }
      if (this.registername.length !== 0 && this.registerpasswordone.length !== 0 && this.registerpasswordone == this.registerpasswordtwo && this.registertruename.length !==0) {
        register({name: this.registername,true_name:this.registertruename ,password: this.registerpasswordone , level: 0}).then(data => {
          if(data.data.res_code ===1 ){
            Toast('注册成功!');
            this.closeRegisterBox();
          }else{
            Toast('注册失败!');
          }
        })
      }
    },
    //用户登录
    login() {
      if (this.inputname.length !== 0 && this.inputpassword.length !== 0) {
        login({ name: this.inputname, password: this.inputpassword , level: 0})
          .then((data) => {
            console.log('>>>',data)
            // if (data.islogin === true) {
            //   window.localStorage.setItem('token', data.token);
            //   const userinfo = data.info;
            //   this.changeLogStatus();
            //   this.storageUserinfo(userinfo);
            //   this.showLoginBox = false;
            //   Toast('登录成功');
            // } else {
            //   Toast('登录失败');
            // }
            if (data.status === 200 && data.data.res_code === 1) {
              let token = data.data.res_body.data.name+'lynxzuicool-WozhenndeshigeTiancai';
              window.localStorage.setItem('token', token);
              window.localStorage.setItem('order', JSON.stringify(data.data.res_body.data.cake));
              this.storageOrder(data.data.res_body.data.cake);
              this.orderNow = data.data.res_body.data.cake;
              this.totalCartNum = data.data.res_body.data.cart.reduce((result, item) => {
                const newResult = result + item.num;
                return newResult;
              }, 0);
              window.localStorage.setItem('ih-cart', JSON.stringify(data.data.res_body.data.cart));
              const userinfo = data.data.res_body.data;
              this.changeLogStatus();
              this.storageUserinfo(userinfo);
              this.showLoginBox = false;
              this.totalCartCountFn();
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
  .loginbox,.findbox{
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
      // height: 40%;
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
        height: 30px;
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
      background-color: #fff;
      img{
        margin-left: 2px;
        margin-top: 3px;
      }
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
  .register_a{
    color: #ffffff;
    font-size: 12px;
  }
}
.forget-password{
  display: block;
  margin: 10px;
  margin-left: 250px;
  font-size: 12px;
}
.findbox{
  div{
    font-size: 12px;
  }
  
}
</style>
