import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Vuelidate from "vuelidate"
import VueIziToast from 'vue-izitoast';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import 'izitoast/dist/css/iziToast.css';

Vue.use(VueIziToast);
Vue.component("v-select", vSelect);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyCMNX_wvLMphnX4AMVgqUpDSNYycEPNmpk",
  authDomain: "avada-vue.firebaseapp.com",
  databaseURL: "https://avada-vue.firebaseio.com",
  projectId: "avada-vue",
  storageBucket: "avada-vue.appspot.com",
  messagingSenderId: "613435209914",
  appId: "1:613435209914:web:1a1ac89a857621d59b6a83"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");

    router.afterEach(async (to) => {
      let user = await store.dispatch("getUid");
      if ((to.name === "Login" && user) || (to.name === "Register" && user))
        router.push("/");
      if ((to.path === "/add-product" && !user))
      router.push("/login");
    });
  }
});
