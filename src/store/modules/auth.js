/* eslint-disable no-useless-catch */
import firebase from "firebase/app"

export default {
  state: {
    info: {test: 'test'}
  },
  getters: {
    getUser: state => {
      return state.info;
    }
  },
  mutations: {
    setInfo(state, info){
      state.info = info;
    },
    clearInfo(state){
      state.info = {};
    }
  },
  actions: {
    async getInfoUser({ dispatch, commit }) {
      const uid = await dispatch("getUid");
      const info = (await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once("value")
      ).val();

      commit("setInfo", info);
    },
    // eslint-disable-next-line no-empty-pattern
    async login({ dispatch }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        dispatch("getInfoUser");
      } catch (e) {
        throw e;
      }
    },
    async register({ dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        let uid = await dispatch("getUid");

        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
          name,
          favorites: []
        });

      } catch (e) {
        throw e;
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    }
  },

}
