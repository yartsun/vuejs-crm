<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <component :is="layout"></component>
    </transition>
  </div>
</template>

<script>
import Cabinet from "./layouts/CabinetLayout.vue";
import Auth from "./layouts/AuthLayout.vue";

export default {
  computed: {
    layout() {
      return this.$route.meta.layout;
    }
  },
  components: {
    Cabinet,
    Auth
  }
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.css";
#app {
  font-family: Helvetica, sans-serif;
  font-style: normal;
  min-height: 100vh;
  font-weight: normal;
  .input-field input {
    border: 0;
    box-shadow: none;
    height: auto;
    margin-bottom: 0;
  }
}
button, input, optgroup, select, textarea {
  font-family: Helvetica, sans-serif;
}
.no-padding {
  padding: 0;
}
.container {
  max-width: 1170px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.btn {
  border-radius: 4px;
  background-color: #349a89;
  padding-left: 50px;
  padding-right: 50px;
}
.field {
  margin-bottom: 15px;
  position: relative;
  label {
    color: #303030;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }
  input:not(.submit), textarea {
    display: flex;
    border-radius: 0.333rem;
    border: 0.067rem solid #dedee0;
    background-color: #f9fafb;
    align-items: center;
    height: 3.867rem;
    padding-left: 10px;
    padding-right: 5px;
    margin: 2px 0;
    color: #303030;
    width: 100%;
    font-size: 1.067rem;
    font-weight: 300;
    &::placeholder {
      color: rgba(102, 102, 102, 0.47);
    }
    &:focus {
      border: 0.067rem solid #dedee0;
      outline: none;
    }
    &.invalid {
      border-color: red;
    }
  }
  textarea {
    resize: none;
    padding-top: 20px;
    max-height: 183px;
    height: 100%;
  }
  &-box {
    display: flex;
    position: relative;
    .change-type {
      position: absolute;
      padding: 5px;
      right: 10px;
      cursor: pointer;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .submit {
    color: #ffffff;
    font-size: 1.067rem;
    font-weight: 400;
    letter-spacing: 0.027rem;
    border-radius: 0.333rem;
    background-color: #349a89;
    height: 3.867rem;
    width: 100%;
  }
}
</style>
