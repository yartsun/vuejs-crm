<template>
  <div class="AuthLayout">
    <Header :logo="logo" :auth="true"></Header>
    <div class="wrapper">
      <transition name="fade" mode="out-in">
        <router-view @type-change="typeChange"></router-view>
      </transition>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  data() {
    return {
      logo: "logo.svg",
      showSearch: false
    }
  },
  methods: {
    typeChange(ref){
      ref.type = ref.type === "password" ? "text" : "password";
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
.AuthLayout {
  padding-bottom: 5.867rem;
  background: #f2f2f2;
  position: relative;
  height: 100%;
  .wrapper {
    max-width: 425px;
    width: 100%;
    margin: 0 auto;
    .box {
      box-shadow: 0 2px 42px rgba(0, 0, 0, 0.11);
      border-radius: 7px;
      background-color: #ffffff;
      padding: 25px;
      margin-bottom: 20px;
      &:first-child {
        margin-top: 70px;
      }
      &-addictional {
        p {
          margin: 5px 0;
          text-align: center;
          color: #2a2a2a;
          font-family: Helvetica;
          font-size: 0.933rem;
          font-weight: 400;
          letter-spacing: 0.027rem;
          a {
            color: #349a89;
          }
        }
      }
    }
  }
  .h2 {
    color: #282828;
    font-size: 22px;
    font-weight: 400;
    margin: 0 auto;
    text-align: center;
  }
}

</style>
