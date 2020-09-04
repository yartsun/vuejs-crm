<template>
  <div class="addProduct">
    <div class="container">
      <div class="box">
        <h1 class="h1">Add product</h1>
        <form @submit.prevent="formHandler">
          <div class="field">
            <label for="title">Title <span class="required">*</span></label>
            <input
              type="text"
              class="browser-default"
              id="title"
              v-model="title"
              :class="{
                invalid:
                  ($v.title.$dirty && !$v.title.required) ||
                  ($v.title.$dirty && !$v.title.minLength)
              }"
              placeholder="For example: Iron man suit"
            />
          </div>
          <div class="field">
            <label for="location"
              >Location <span class="required">*</span></label
            >
            <input
              type="text"
              class="browser-default"
              id="location"
              v-model="location"
              :class="{
                invalid:
                  ($v.location.$dirty && !$v.location.required) ||
                  ($v.location.$dirty && !$v.location.minLength)
              }"
              placeholder="For example: Los Angeles, CA"
            />
          </div>
          <div class="field">
            <label for="description">Description</label>
            <textarea
              type="text"
              class="browser-default"
              id="description"
              v-model="description"
              placeholder="For example: Iron man suit"
            />
          </div>
          <div class="field photo">
            <label for="photo"
              ><img src="../assets/photo-add.svg" alt=""
            /></label>
            <input id="photo" type="file" @change="onFileSelected" />
          </div>
          <div class="field">
            <label for="price">Price</label>
            <input
              type="text"
              class="browser-default"
              id="location"
              v-model="price"
              placeholder="Price"
            />
          </div>
          <div class="field">
            <input type="submit" value="SUBMIT" class="btn submit">
          </div>
        </form>
      </div>  
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  validations: {
    title: { required, minLength: minLength(6) },
    location: { required, minLength: minLength(6) }
  },
  data() {
    return {
      title: "",
      location: "",
      description: "",
      photos: [],
      price: ""
    }
  },
  methods: {
    onFileSelected(event){
      this.photos = event.target.files[0];
    },
    async formHandler(){
      if (this.$v.$invalid) {
        this.$v.$touch();
        this.$toast.error("Error", "validation error");
        return;
      }

      try {
        let formData = {
          title: this.title,
          location: this.location,
          description: this.description,
          price: this.price
        };

        await this.$store.dispatch("addProduct", formData);
        this.$toast.success("Added successfully");
        this.$router.push("/");
      } catch (error) {
        this.$toast.error(error, "error");
      }

    }
  },  
  created() {
    this.$emit("showSearch", false);
  },
}
</script>
<style lang="scss">
.addProduct {
  .h1 {
    color: #282828;
    font-family: Helvetica;
    font-size: 22px;
    font-weight: 400;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 25px;
  }
  form {
    max-width: 664px;
    width: 100%;
    .submit {
      max-width: 377px;
      margin: 0 auto;
      display: block;
      margin-top: 40px;
    }
    .photo {
      border: 0.067rem solid #dedee0;
      background-color: #f9fafb;
      label {
        width: 92px;
        height: 92px;
        border-radius: 4px;
        background-color: #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin: 16px;
      }
      input {
        display: none;
      }
    }
  }
  .box {
    margin-top: 35px;
    box-shadow: 0 2px 42px rgba(0, 0, 0, 0.11);
    border-radius: 7px;
    background-color: #ffffff;
    padding: 25px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .required {
    color: red;
  }
}
</style>
