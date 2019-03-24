<template>
  <div class="homewrapper">
    <!-- <HomeNav></HomeNav> -->
    <router-view></router-view>
  </div>
</template>

<script>
import HomeNav from '@/components/Home/HomeNav';
import { mapMutations } from 'vuex';

export default {
  name: 'home',
  components: { HomeNav },
  methods: {
    ...mapMutations(['changeHeader']),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.changeHeader('home');
    });
  },
  beforeRouteLeave(to, from, next) {
    this.changeHeader('home');
    next();
  },
};

</script>

<style>
.homewrapper{
  background-color: #fff;
}
</style>
