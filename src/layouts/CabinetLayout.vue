<template>
  <div class="CabinetLayout">
    <Header :logo="logo" :showSearch="showSearch"></Header>
    <transition name="fade" mode="out-in">
      <router-view @showSearch="(state) => showSearch = state"></router-view>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  data() {
    return {
      logo: "logo-white.svg",
      showSearch: false
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
.CabinetLayout {
  padding-bottom: 5.867rem;
  background: #f2f2f2;
  position: relative;
  height: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.header {
  background: linear-gradient(180deg, #090810 0%, #171236 100%);
}
</style>
