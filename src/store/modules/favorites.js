import firebase from "firebase/app"

export default {
  state: {
    favorites: [],
  },
  getters: {
    getFavorites: state => {
      return state.favorites;
    }
  },
  mutations: {
    setFavorites: (state, favorites) => {
      state.favorites = favorites;
    },
  },
  actions: {
    async updateFavites({dispatch, commit}){
      let uid = await dispatch("getUid");
      let favorites = (await firebase.database().ref(`/users/${uid}/favorites`).once('value')).val();
      let array = Object.values(favorites).map(item=> item.id);
      commit("setFavorites",array);
    },
    async addToFavorites({dispatch} , {id}){
      let uid = await dispatch("getUid");
      let favorites = (await firebase.database().ref(`/users/${uid}/favorites`).once('value')).val();
      if(!favorites) {
        await firebase.database().ref(`/users/${uid}/favorites`).push({id})
        await dispatch("updateFavites");
        return "add";
      }
      let find = Object.entries(favorites).map(([key, value]) => {
          value.idFav = key;
          return value;
        })
        .find(e => e.id === id);
      if (find) {
        await firebase.database().ref(`/users/${uid}/favorites/${find.idFav}`).remove();
        await dispatch("updateFavites");
        
        return "delete";
      } else {
        await firebase.database().ref(`/users/${uid}/favorites`).push({id});
        await dispatch("updateFavites");
        return "add";
      }
    }
  }
}
