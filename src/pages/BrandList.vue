<template>
  <div>
    <div class="page-indexlist-wrapper">
      <mt-index-list>
        <mt-index-section
        v-for="item in handleAlphabet"
        :index="item.initial"
        :key="item.initial">
          <mt-cell
          v-for="cell in item.cells"
          :title="cell"
          :key='cell'
          >
          <span @click="toProList(cell)">go</span>
          </mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brandTypeList: [],
    };
  },
  computed: {
    handleAlphabet() {
      const alphabet = [];
      if (this.brandTypeList.length !== 0) {
        const NAMES = this.brandTypeList.reduce((result, item) => {
          if (item.title) {
            result.push(item.title);
          }
          return result;
        }, []);
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((initial) => {
          const cells = NAMES.filter(name => name[0] === initial);
          alphabet.push({
            initial,
            cells,
          });
        });
      }
      return alphabet;
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.getBrandTypeListId(to.params.id);
    this.$ajax.getBrandTypeList(this.currentId).then((resp) => {
      this.brandTypeList = resp;
    });
    next();
  },
  methods: {
    getBrandTypeListId(id) {
      this.currentId = id;
    },
    toProList(brand) {
      this.$router.push(`/prolist/${brand}`);
    },
  },
  mounted() {
    this.getBrandTypeListId(this.$route.params.id);
    this.$ajax.getBrandTypeList(this.currentId).then((resp) => {
      this.brandTypeList = resp;
    });
  },
};
</script>

<style lang='scss' scop>
.page {
  &-indexlist {
      &-wrapper {
        width: 100%;
        border-top: solid 1px #ddd;
      }
    }
  }
</style>
