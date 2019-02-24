<template>
  <div id="app" class="app" v-cloak>
    <div
      v-if="hasHeader"
      class="ih-heaedr"
    >
      <Header />
    </div>
    <div class="ih-body">
      <router-view/>
    </div>
    <div class="ih-footer" v-if="hasTabbar">
      <tabbar />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/header';
import Tabbar from '@/components/Tabbar';

export default {
  name: 'App',
  components: {
    Tabbar,
    Header,
  },
  computed: {
    ...mapState(['hasHeader', 'hasTabbar']),
  },
};
</script>

<style lang='scss'>
[v-cloak]{
  display: none;
}
.app{
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #F2F2F2;
  .ih-heaedr{
    height: 50px;
    background-color:white;
  }
  .ih-body{
    flex: 1;
    overflow-x: hidden;
  }
  .ih-footer{
    background-color:white;
    height: 64px;
    display: fixed;
    bottom: 0;
  }
}
</style>
