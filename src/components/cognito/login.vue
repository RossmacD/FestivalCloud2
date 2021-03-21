<template>
  <div class="login-box">
    <h4>LOGIN</h4>
    <div class="card-panel red darken-2" v-if="error != null">
      <span class="white-text">{{ error.message }}</span>
    </div>
    <p>Login to upload your own images to the site!</p>
    <form @submit.prevent="login">
      <div class="input-field">
        <input
          id="username"
          type="text"
          class="validate"
          v-model="username"
          required
        />
        <label for="username">Username</label>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model="pass"
          required
        />
        <label for="password">Password</label>
      </div>
      <div class="center-align">
        <button class="btn btn-default btn-large">login</button>
        <br />
        <p>
          Don't have an account? -
          <router-link to="Register">Register Now</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import CognitoAuth from "./index.js";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      pass: "",
      error: null,
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      CognitoAuth.authenticate(this.username, this.pass, err => {
        if (err !== null) {
          console.log(err);
          this.error = err;
        } else {
          this.$router.replace("/");
        }
      });
    }
  }
};
</script>

<style>
h4 {
  text-align: center;
  margin: 0;
  padding: 0;
  font-weight: 800;
  font-size: 18px;
}
p {
  text-align: center;
  font-size: 14px;
  padding-bottom: 10px;
}
.login-box {
  width: 400px;
  height: auto;
  background-color: white;
  margin-top: 60px;
  border-radius: 5px;
  padding: 40px;
  margin: auto;
  border: 1px solid #e4e6e7;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
}
button {
  margin: auto;
  background-color: #fa3254;
  margin: 0;
  padding: 0px 40px;
}

button i {
  font-size: 18px;
}
</style>
