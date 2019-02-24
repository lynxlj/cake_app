<template>
  <div class="tools">
    <ul>
      <li
        v-for="(text,index) of toollist"
        :key="index"
      >
      {{text}}
      <i class="iconfont icon-next"></i>
      </li>
    </ul>
    <mt-button @click="logout" v-if="isLogin">
      退出登录
    </mt-button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { MessageBox } from 'mint-ui';

export default {
  name: 'logout',
  data() {
    return {
      toollist: [
        '编辑资料',
        '关于我们',
        '消息通知',
        '清除缓存',
        '版本信息 V1.0.0',
      ],
    };
  },
  computed: {
    ...mapState(['isLogin']),
  },
  methods: {
    ...mapMutations(['changeLogStatus', 'changeHeader']),
    logout() {
      MessageBox.confirm('退出登录')
        .then(() => {
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('user-token');
          this.changeLogStatus();
          this.$router.push('/mine');
        })
        .catch(() => {
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
</style>
