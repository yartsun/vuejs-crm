<template>
  <div class="item">
    <div class="image">
      <img src="../assets/Mask.png" alt="image">
    </div>
    <button class="favorite" @click="addToFavorites(id)" :class="{ active: this.getFavorites.includes(id)}">
      <svg class="not-active-svg" xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15"><g><g><path fill="#b7b7b7" d="M8.5 1.18c2.033-1.67 5.075-1.567 6.984.305A4.996 4.996 0 0 1 17 5.078a4.995 4.995 0 0 1-1.516 3.593l-6.077 5.96c-.25.246-.579.369-.907.369-.328 0-.657-.123-.907-.368L1.516 8.67A4.996 4.996 0 0 1 0 5.078C0 3.72.538 2.445 1.516 1.485 3.426-.387 6.468-.489 8.5 1.18zm6.304 6.823a4.066 4.066 0 0 0 1.234-2.925 4.067 4.067 0 0 0-1.234-2.925c-1.645-1.612-4.32-1.612-5.964 0a.489.489 0 0 1-.68 0A4.243 4.243 0 0 0 5.177.943c-1.08 0-2.16.404-2.982 1.21A4.069 4.069 0 0 0 .962 5.078c0 1.105.438 2.144 1.234 2.925l6.077 5.961a.325.325 0 0 0 .453 0z"/></g></g></svg>
      <img class="active-svg" src="../assets/favorites-active.svg" alt="">
    </button>
    <h2 class="title">{{ title }}</h2>
    <strong class="cost">${{ price }}</strong>
  </div>
</template>

<script functional>
export default {
  methods: {
    async addToFavorites(id){
      let res = await this.$store.dispatch("addToFavorites", { id });
      if(res === "add"){
        this.$toast.success("Add to favorites")
      }else{
        this.$toast.error("Remove from favorites")
      }
    }
  },
  computed: {
    getFavorites(){
      let favorites = this.$store.getters.getFavorites;
      return favorites;
    }
  },
  props: {
    id: {
      default: "",
      type: String,
    },
    title: {
      default: "",
      type: String
    },
    price: {
      default: "",
      type: String
    }
  }
}
</script>

<style lang="scss">
.item {
  background-color: #fff;
  padding: 3px;
  box-shadow: 0 0.267rem 0.933rem rgba(121, 121, 121, 0.05);
  border-radius: 0.267rem;
  border: 0.067rem solid #e4e4e4;
  background-color: #ffffff;
  max-width: 13.933rem;
  position: relative;
  .image {
    overflow: hidden;
    height: 148px;
  }
  .favorite {
    width: 2rem;
    height: 2rem;
    top: 133px;
    right: 7px;
    box-shadow: 0 0.133rem 0.267rem rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    border: 0;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 99;
    svg {
      transition: .25s;
      position: absolute;
    }
    .active-svg{
      opacity: 0;
    }
    &.active {
      .active-svg {
        opacity: 1;
      }
      .not-active-svg {
        opacity: 0;
      }
    }
  }
  .title {
    color: #373738;
    font-family: Helvetica;
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
    padding: 6px 12px;
  }
  .cost {
    color: #101010;
    font-family: Helvetica;
    font-size: 1.2rem;
    font-weight: 700;
    padding-left: 12px;
    padding-bottom: 5px;
  }
}
</style>
