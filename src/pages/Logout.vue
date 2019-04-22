<template>
  <div class="tools">
    <ul>
      <li
        v-for="(text,index) of toollist"
        :key="index"
        @click.stop="handleChangeMessage(text)"
      >
      {{text}}
      <i class="iconfont icon-next"></i>
      </li>
    </ul>
    <mt-button @click="logout" v-if="isLogin">
      退出登录
    </mt-button>
    <div class="settings" v-if="isShowSetting">
      <!-- 用户名
      <input type="text" v-model="registername" placeholder="输入用户名">
      性别
      <input type="text" v-model="sex" placeholder="输入性别">
      年龄
      <input type="text" v-model="age" placeholder="输入年龄">
      电话
      <input type="number" v-model="tel" placeholder="输入电话"> -->
      旧密码
      <input type="password" v-model="oldpassword" placeholder="输入原来密码">
      密码
      <input type="password" v-model="registerpasswordone" placeholder="输入新密码">
      确认密码
      <input type="password" v-model="registerpasswordtwo" placeholder="再次输入新密码">
      <div class="submit" @click.stop="submit">确认修改</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { MessageBox ,Toast} from 'mint-ui';
import {
  findData,
  updateData,
 } from '@/services';
export default {
  name: 'logout',
  data() {
    return {
      toollist: [
        '修改密码',
        '关于我们',
        '消息通知',
        '清除缓存',
        '版本信息 V1.0.0',
      ],
      isShowSetting:false,
      registerpasswordone:'',
      registerpasswordtwo:'',
      oldpassword:''
    };
  },
  computed: {
    ...mapState(['isLogin']),
  },
  created() {
  },
  methods: {
    ...mapMutations(['changeLogStatus', 'changeHeader','clear','totalCartCountFn']),
    logout() {
      MessageBox.confirm('退出登录')
        .then(() => {
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('order');
          window.localStorage.removeItem('total-cart-count');
          window.localStorage.removeItem('user-token');
          this.totalCartCountFn();
          this.changeLogStatus();
          this.$router.push('/mine');
        })
        .catch(() => {
        });
    },
    //修改信息
    handleChangeMessage(text){
      if(!window.localStorage.getItem('user-token')){
        this.$toast('请先登录哦');
        return;
      }
      if(text == '修改密码'){
        this.isShowSetting = true;
      }
      
    },
    //确认修改
    submit(){
      if(this.registerpasswordone =='' || this.registerpasswordtwo == ''){
        Toast('请输入密码');
        return;
      }
      if(this.registerpasswordone !== this.registerpasswordtwo){
        Toast('两次密码不正确');
        return;
      }
      let name = localStorage.getItem('user-token') && JSON.parse(localStorage.getItem('user-token')).name;
      const data = `oldPwd=${this.oldpassword}&newPwd=${this.registerpasswordone}&level=0&name=${name}`;
			//console.log(data);
			updateData(data).then((resp)=>{
				if(resp.data.res_code ===1){
          Toast('密码修改成功')
          this.isShowSetting = false;
        }else{
          Toast('原密码错误')
        }
			});
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.changeHeader('tool');
    });
  },
  beforeRouteLeave(to, from, next) {
    this.changeHeader('tool');
    next();
  },
};

</script>

<style lang="scss" scoped>
.tools{
  .mint-button{
    width: 40%;
    height: 4%;
    position: fixed;
    bottom: 15%;
    left: 30%;
  }
  ul{
    background: white;
    padding-left: 15px;
    li{
      padding: 17px 0;
      padding-left: 6px;
      border-bottom: 1px solid #e7e7e7;
      i{
        float: right;
        color: #e7e7e7;
        margin-right: 17px;
      }
    }
    li:last-child{
    border-bottom: none;
    }
  }
}
.settings{
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  padding-top: 20px;
  color: #333;
  padding-left: 10px;
  input{
    display: block;
    width: 80%;
    height: 40px;
    margin: 5px auto;
    border-color: #efefef;
  }
  .submit{
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 0;
    text-align: center;
    line-height: 40px;
    background: #fc655e;
    color: #fff;

  }
}
</style>
