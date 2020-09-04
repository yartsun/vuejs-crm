import firebase from "firebase/app"

export default {
  state: {
    products: [],
    filter: false,
    productsFilter: [],
  },
  getters: {
    getProducts: state => {
      return state.products;
    },
    getIsFilter: state => {
      return state.filter;
    },
    getProductsFilter: state => {
      return state.productsFilter;
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    resetFilter: state => {
      state.filter = false;
    },
    setProductsFilter(state, products) {
      state.filter = true;
      state.productsFilter = products;
    }
  },
  actions: {
    async search({ getters, commit }, { column, text }) {
      if(!text.length) {
        commit("resetFilter");
        return;
      }
      let products = getters.getProducts;
      let result = products.filter(function(item) {
        if (item[column].toLowerCase().indexOf(text.toLowerCase()) != "-1") {
          return item;
        }
      });
      commit("setProductsFilter", result);
    },
    async filterByCost({ getters, commit }, { off, to }) {
      let column = "price";
      let offNumber = Number(off);
      let toNumber = Number(to);
      if (
        off.length === 0 ||
        to.length === 0 ||
        isNaN(offNumber) || isNaN(toNumber)
      ){
        commit("resetFilter");
        return;
      }
      let products = getters.getProducts;
      let result = products.filter(function(item) {
        if (
          Number(item[column]) > Number(off) &&
          Number(item[column]) < Number(to)
        ) {
          return item;
        }
      });
      commit("setProductsFilter", result);
    },
    async setAllProducts({ commit }) {
      let products = (
        await firebase
          .database()
          .ref(`/products`)
          .once("value")
      ).val();
      let array = Object.entries(products).map(([key, value]) => {
        value.id = key;
        return value;
      })
      commit("setProducts", array);
    },
    async addProduct({ dispatch }, {title,location,description,price}){
     // eslint-disable-next-line no-useless-catch
      try {
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/products`).push({
          title,
          location,
          description,
          price,
          creator: uid,
          });
        await dispatch("setAllProducts")
      } catch (error) {
        throw error;
      }
    }
  }
}
