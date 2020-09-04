<template>
  <div class="login">
    <div class="box">
      <h2 class="h2">Login</h2>
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
          <label for="password">password</label>
          <div class="field-box">
            <input
              type="password"
              ref="password"
              v-model="password"
              :class="{
                invalid:
                  ($v.password.$dirty && !$v.password.required) ||
                  ($v.password.$dirty && !$v.password.minLength)
              }"
              class="browser-default"
              id="password"
            />
            <div
              class="change-type"
              @click="$emit('type-change', $refs.password)"
            >
              <img src="../assets/eye.svg" />
            </div>
          </div>
          <router-link to="/login" class="remember-pass"
            >Don’t remember password?</router-link
          >
        </div>
        <div class="field">
          <input type="submit" value="Continue" class="btn submit">
        </div>
      </form>
    </div>
    <div class="box box-addictional">
      <p>
        I have no account, <router-link to="register">REGISTER NOW</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  data() {
    return {
      email: "",
      password: ""
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
        let formData = { email: this.email, password: this.password };
        await this.$store.dispatch("login", formData);
        this.$router.push('/');
      } catch (e) {
        this.$toast.error("Error", e.message);
      }
    }
  },
}
</script>

<style lang="scss">
.login {
  .remember-pass {
    text-align: right;
    display: block;
    color: #8c8c8c;
    font-size: 0.933rem;
    font-weight: 400;
    letter-spacing: 0.027rem;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
