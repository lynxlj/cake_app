<template>
  <div class="body-wrapper">
    <Header />
    <MineTab />
    <MineList />
  </div>
</template>

<script>
import Header from '../components/Mine/Header';
import MineTab from '../components/Mine/MineTab';
import MineList from '../components/Mine/MineList';

export default {
  name: 'mine',
  components: {
    Header,
    MineTab,
    MineList,
  },
};
</script>

<style lang="scss" scoped>
.body-wrapper{
  height: 100%;
  background-color:#f2f2f2;
}
</style>
