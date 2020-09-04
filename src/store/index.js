import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth.js";
import products from "./modules/products.js";
import favorites from "./modules/favorites.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [
      {
        id: 1,
        category: "Canada",
        price: 200,
        photos: ["url"],
        title: "Item name",
        location: "Los angeles",
        description: ""
      }
    ],
  },
  mutations: {
    updateItems(state, { items }) {
      state.items = items;
    },
  },
  modules: {
    auth,
    products,
    favorites
  },
  plugins: [createPersistedState()]
});
