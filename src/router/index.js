import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      layout: "Cabinet"
    },
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "Auth"
    },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "Auth"
    },
    component: () => import("../views/Register.vue")
  },
  {
    path: "/add-product",
    name: "addProduct",
    meta: {
      layout: "Cabinet"
    },
    component: () => import("../views/AddProduct.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
