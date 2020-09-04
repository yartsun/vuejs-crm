<template>
  <div class="Home">
    <div class="container">
      <div class="wrapper">
        <div class="row">
          <FilterComponent></FilterComponent>
        </div>
        <div class="row">
          <ItemsList></ItemsList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterComponent from "../components/Filter.vue";
import ItemsList from "../components/ItemsList.vue";

export default {
  components: {
    FilterComponent,
    ItemsList
  },
  created() {
    this.$emit("showSearch", true);
  },
};
</script>

<style lang="scss">
.Home .container {
  display: flex;
  justify-content: center;
  .wrapper {
    max-width: 860px;
    width: 100%;
  }
}
</style>
