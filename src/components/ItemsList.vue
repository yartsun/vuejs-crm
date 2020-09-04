<template>
  <div class="itemsList">
    <template v-for="item in getProducts">
      <MiniItem
        :key="item.id"
        :title="item.title"
        :price="item.price"
        :id="item.id"
      ></MiniItem>
    </template>
    <div class="item clear"></div>
    <div class="item clear"></div>
    <div class="item clear"></div>
  </div>
</template>

<script>
import MiniItem from "./MiniItem";
export default {
  data() {
    return {
      items: [],
    }
  },
  computed: {
    getProducts(){
      if (this.$store.getters.getIsFilter) {
        return this.$store.getters.getProductsFilter
      }
      return this.$store.getters.getProducts;
    }
  },
  mounted() {
    this.$store.dispatch("setAllProducts");
  },
  components: {
    MiniItem
  }
}
</script>
<style lang="scss">
.itemsList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 25%;
    margin: 0 auto;
    margin-bottom: 10px;
    min-width: 200px;
    &.clear {
      visibility: hidden;
    }
  }
}
</style>
