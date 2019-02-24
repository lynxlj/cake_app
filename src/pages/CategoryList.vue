<template>
  <div>
    <h3 class="cateh3">Type {{currentId || 1}}</h3>
    <div class="ih-cart-categorylist-left-types">
      <div
      class="ih-cart-categorylist-left-types-type"
      v-for='type in CategoryTypeList'
      :key='type.id'
      :id='type.id'
      @click='toProductsList(type.id)'
      >
        <img :src='type.img' alt="">
        <p>{{type.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      currentId: '',
      CategoryTypeList: [],
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.getCategoryTypeListId(to.params.id);
    this.$ajax.getCategoryTypeList(this.currentId).then((resp) => {
      this.CategoryTypeList = resp;
    });
    next();
  },
  methods: {
    getCategoryTypeListId(id) {
      this.currentId = id;
    },
    toProductsList(id) {
      this.$router.push(`/prolist/${id}`);
    },
  },
  mounted() {
    this.getCategoryTypeListId(this.$route.params.id);
    this.$ajax.getCategoryTypeList(this.currentId).then((resp) => {
      this.CategoryTypeList = resp;
    });
  },
};
</script>

<style lang='scss' scopde>
.cateh3{
    text-align: center;
    margin: 20px auto;
  }
.ih-cart-categorylist-left{
  &-types{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    &-type{
      width: 30%;
      height: 90px;
      margin-bottom: 10px;
      text-align: center;
      img{
        width: 60px;
        height: 60px;
      }
      p{
        font-size: 14px;
      }
    }
  }
}
</style>
