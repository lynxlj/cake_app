<template>
  <div class="content">
    <HomeSwipe />
    <SecondNav />
    <HomeList />
  </div>
</template>

<script>
import HomeSwipe from '@/components/Home/HomeSwipe';
import SecondNav from '@/components/Home/SecondNav';
import HomeList from '@/components/Home/HomeList';

export default {
  name: 'recommend',
  components: {
    HomeSwipe,
    SecondNav,
    HomeList,
  },
};

</script>

<style>

</style>
