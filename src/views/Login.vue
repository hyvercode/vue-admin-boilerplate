<template>
  <div class="home">
    <div class="container gm-box-shadow py-5">
      <div class="container gm-brand">
        <router-link to="/">
          <img
              src="~@/assets/images/icons/GrosirMotor.png"
              alt=""
              width="auto"
              height="30"
          />
        </router-link>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <h5>LOGIN</h5>
          <form role="form" @submit.prevent="submit" class="py-3">
            <div class="input-container m-2">
              <input
                  type="text"
                  class="gm-form-control"
                  v-model="user.username"
                  placeholder="Username"
              />
            </div>
            <div class="input-container m-2">
              <input
                  type="password"
                  class="gm-form-control"
                  v-model="user.password"
                  placeholder="Password"
              />
            </div>
            <div class="input-container m-2">
              <div style="margin-left:90px;text-align: center!important;">
                <vue-recaptcha
                    ref="invisibleRecaptcha"
                    @verify="onCaptchaVerified"
                    @expired="onCaptchaExpired"
                    sitekey="6Ld2oGwaAAAAAL8VTnsiup9d7ThwyyHBya009Q3q"
                ></vue-recaptcha>
              </div>
            </div>
            <div class="input-container p-4">
              <input
                  type="submit"
                  class="btn btn-primary gm-btn-rounded w-75"
                  value="Masuk"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import User from "../model/user";
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "Login",
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
      robot: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleLogin() {
      let loading = this.$loading.show();
      this.$store.dispatch("auth/login", this.user).then(
          () => {
            loading.hide();
            this.$router.push("/dashboard");
          },
          (error) => {
            loading.hide();
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Invalid username or password !",
            });
            this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          }
      );
    },
    submit: function () {
      if (this.robot) {
        this.handleLogin();
      }
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset() // Direct call reset method
    },
    onCaptchaVerified(response) {
      if (response) this.robot = true;
    },
  },
};
</script>
<style scoped>
</style>