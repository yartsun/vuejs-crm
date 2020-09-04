<template>
  <div class="filter">
    <div class="wrapper">
      <div class="choose-category input-field">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17"><g><g><path fill="#505050" d="M12.143 0a2.429 2.429 0 0 0-2.429 2.429v2.428a2.429 2.429 0 0 0 2.429 2.429h2.428A2.429 2.429 0 0 0 17 4.857V2.43A2.429 2.429 0 0 0 14.571 0zm0 9.714a2.429 2.429 0 0 0-2.429 2.429v2.428A2.429 2.429 0 0 0 12.143 17h2.428A2.429 2.429 0 0 0 17 14.571v-2.428a2.429 2.429 0 0 0-2.429-2.429zm-9.714 0A2.429 2.429 0 0 0 0 12.143v2.428A2.429 2.429 0 0 0 2.429 17h2.428a2.429 2.429 0 0 0 2.429-2.429v-2.428a2.429 2.429 0 0 0-2.429-2.429zm0-9.714A2.429 2.429 0 0 0 0 2.429v2.428a2.429 2.429 0 0 0 2.429 2.429h2.428a2.429 2.429 0 0 0 2.429-2.429V2.43A2.429 2.429 0 0 0 4.857 0z"/></g></g></svg>
        <v-select
          :options="['Canada', 'United States']"
          :searchable="false"
          placeholder="Choose Category"
        >
        <template #open-indicator="{ attributes }">
          <span v-bind="attributes">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9"><g><g><path fill="#666" d="M8.143 7.623L14.73.207a.794.794 0 0 1 1.034-.03.607.607 0 0 1 .025.926l-6.724 7.57a.795.795 0 0 1-.743.18.809.809 0 0 1-.998-.044C7.035 8.549.218 1.354.218 1.354a.617.617 0 0 1 0-.941.807.807 0 0 1 1.051 0z"/></g></g></svg>
          </span>
        </template>
        </v-select>
      </div>
      <div class="cost">
        <div class="input-field">
          <input type="text" v-model="off" @input="filterByCost" placeholder="Price from (USD)" />
        </div>
        <hr />
        <div class="input-field">
          <input type="text" v-model="to" @input="filterByCost" placeholder="Price from (USD)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      off: "",
      to: "",
    }
  },
  methods: {
    async filterByCost(){
      await this.$store.dispatch("filterByCost", {
        off: this.off,
        to: this.to
      });
    }
  },
}
</script>
<style lang="scss">
.filter {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .wrapper {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.22);
    border-radius: 4px;
    display: flex;
    box-shadow: 0 0.067rem 0.267rem rgba(0, 0, 0, 0.22);
    background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    .input-field {
      display: flex;
      border-radius: 0.333rem;
      border: 0.067rem solid #dedee0;
      background-color: #f9fafb;
      align-items: center;
      height: 2.333rem;
      padding-left: 10px;
      padding-right: 5px;
      margin: 12px;
      input {
        font-size: 0.933rem;
        font-weight: 300;
      }
      input::placeholder {
        color: #505050;
      }
    }
    .choose-category {
      width: 19rem;
      svg {
        margin-right: 10px;
      }
      .vs__search {
        position: absolute;
        height: 100%;
        top: 50%;
        border-bottom: 0;
        color: #505050;
        transform: translateY(-40%);
      }
      .v-select {
        max-width: 240px;
        width: 100%;
      }
      .vs__dropdown-toggle {
        border: 0;
      }
      .vs--single.vs--open .vs__selected {
        // margin-top: 0;
      }
      .vs__selected {
        font-family: Helvetica, sans-serif;
        color: #505050;
      }
      input[type=search]:focus:not(.browser-default) {
        background: transparent;
      }
    }
    .cost {
      display: flex;
      align-items: center;
      hr {
        width: 0.8rem;
        height: 0.067rem;
        border: 0;
        background-color: #dedee0;
      }
    }
  }
}
</style>
