<template>
  <div class="login">
    <div class="box">
      <h2 class="h2">Register</h2>
      <form @submit.prevent="submitHandler">
        <div class="field">
          <label for="email">Email</label>
          <input
            type="text"
            class="browser-default"
            id="email"
            v-model="email"
            :class="{
              invalid:
                ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email)
            }"
            placeholder="Example@gmail.com"
          />
        </div>
        <div class="field">
          <label for="fullname">Full name</label>
          <input
            type="text"
            class="browser-default"
            id="fullname"
            v-model="name"
            :class="{
              invalid:
                ($v.name.$dirty && !$v.name.required) ||
                ($v.name.$dirty && !$v.name.minLength)
            }"
            placeholder="Tony Stark"
          />
        </div>
        <div class="field">
          <label for="password">password</label>
          <div class="field-box">
            <input
              type="password"
              ref="password"
              class="browser-default"
              v-model="password"
              :class="{
                invalid:
                  ($v.password.$dirty && !$v.password.required) ||
                  ($v.password.$dirty && !$v.password.minLength)
              }"
              id="password"
            />
            <div
              class="change-type"
              @click="$emit('type-change', $refs.password)"
            >
              <img src="../assets/eye.svg" />
            </div>
          </div>
        </div>
        <div class="field">
          <label for="password-again">Password again</label>
          <div class="field-box">
            <input
              type="password"
              ref="passwordAgain"
              class="browser-default"
              v-model="againPassword"
              :class="{
                invalid:
                  ($v.againPassword.$dirty && !$v.againPassword.required) ||
                  ($v.againPassword.$dirty && !$v.againPassword.minLength)
              }"
              id="password-again"
            />
            <div
              class="change-type"
              @click="$emit('type-change', $refs.passwordAgain)"
            >
              <img src="../assets/eye.svg" />
            </div>
          </div>
        </div>
        <div class="field">
          <input type="submit" value="Continue" class="btn submit">
        </div>
      </form>
    </div>
    <div class="box box-addictional">
      <p>
        I already have an account, <router-link to="login">LOG IN</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { email, required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    againPassword: { sameAsPassword: sameAs("password") },
    name: { required, minLength: minLength(4) }
  },
  mounted() {
    window.register = this;
  },
  data() {
    return {
      email: "",
      password: "",
      againPassword: "",
      name: ""
    }
  },
  methods: {
    async submitHandler(){
      if (this.$v.$invalid) {
        this.$v.$touch();
        this.$toast.error("Error", "validation error");
        return;
      }

      try {
        let formData = { email: this.email, password: this.password, name: this.name };
        await this.$store.dispatch("register", formData);
        this.push("/");
      } catch (e) {
        this.$toast.error("Error", e.message);
      }
    }
  },
}
</script>
