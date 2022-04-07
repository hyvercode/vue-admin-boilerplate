<template>
  <div class="body">
    <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div class="container">
        <div class="card login-card">
          <div class="card-body">
            <div class="text-center">
              <router-link :to="pages.INDEX">
                <img src="~@/assets/images/icons/brand.png" width="200"/>
              </router-link>
              <br/>
            </div>
            <form @submit.prevent="submit" class="mt-5">
              <div class="form-group">
                <label for="username" class="sr-only">Email</label>
                <input
                    id="username"
                    v-model="login.email"
                    type="text"
                    name="username"
                    class="form-control form-control-sm"
                    placeholder="Email"
                    required
                />
              </div>
              <div class="form-group mb-3">
                <label for="password" class="sr-only">Password</label>
                <VuePassword
                    v-model="login.password"
                    id="password"
                    type="password"
                    aria-placeholder="Password"
                    :disableStrength="true"
                >
                </VuePassword>
              </div>
              <div class="form-group mb-1 text-center">
                <div class="re-captcha text-center">
                  <vue-recaptcha
                      ref="invisibleRecaptcha"
                      @verify="onCaptchaVerified"
                      @expired="onCaptchaExpired"
                      sitekey="6Lemm2keAAAAALJLVgk5LmmzQetQZ91G19Knn9ES"
                  >
                  </vue-recaptcha>
                </div>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                      class="form-check-input"
                      v-model="login.remember_me"
                      type="checkbox"
                      value="true"
                      id="remember"
                  />
                  <label class="form-check-label" for="remember">
                    Remember Me
                  </label>
                </div>
              </div>
              <div class="form-group">
                <input
                    id="login"
                    name="login"
                    class="btn btn-primary login-btn"
                    type="submit"
                    value="Sign In"
                />
              </div>
            </form>
            <div class="text-center">
              <a
                  :href="pages.PASSWORD_FORGOT"
                  class="forgot-password-link"
                  style="color: #4790d9 !important"
              >Forgot password ?
              </a>
            </div>
          </div>
        </div>
        <Autor></Autor>
      </div>
    </main>
  </div>
</template>
<script>
import VueRecaptcha from "vue-recaptcha";
import Pages from "../helpers/Pages";
import VuePassword from "vue-password";
import PAGES from "../helpers/Pages";
import User from "../model/user";
import Autor from "../components/navigation/Autor";

export default {
  name: "Login",
  components: {
    Autor,
    VueRecaptcha,
    VuePassword,
  },
  data() {
    return {
      strength: 0,
      login: new User(),
      pages: PAGES,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.isLogin) {
      this.$router.push(Pages.DASHBOARD);
    }
  },
  methods: {
    onCaptchaVerified(response) {
      if (response) this.robot = true;
    },
    onLogin() {
      let loading = this.$loading.show();
      this.$store.dispatch("auth/login", this.login).then(
          (response) => {
            loading.hide();
            if (response.code === 200) {
              this.$router.push(Pages.DASHBOARD);
            } else {
              this.$swal.fire("Error", "Invalid email or password!", "error");
            }
          },
          (error) => {
            loading.hide();
            this.$swal.fire(
                "Error",
                "Error network connection! <br>" + error,
                "error"
            );
          }
      );
    },
    submit: function () {
      if (this.robot) {
        this.onLogin();
      }
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset(); // Direct call password method
    },
  },
};
</script>
<style scoped>

.body {
  font-family: "Open Sans", sans-serif;
  background: linear-gradient(180deg, #4790d9 50%, #074887 100%) !important;
  min-height: 10vh;
}


@media (min-width: 991.98px) {
  .login-card {
    margin: auto;
    width: 450px !important;
  }
}

.login-card {
  border: 0;
  border-radius: 27.5px;
  box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
  overflow: hidden;
}

.login-card .card-body {
  padding: 40px 60px 60px;
}

@media (max-width: 422px) {
  .login-card .card-body {
    padding: 35px 24px;
    margin-left: 0px !important;
  }
}

.login-card form {
  max-width: 326px;
}

.login-card .form-control {
  width: 100% !important;
  height: 0px !important;
  border: 1px solid #d5dae2;
  padding: 15px 25px;
  margin-bottom: 20px;
  min-height: 45px;
  font-size: 13px;
  line-height: 15;
  font-weight: normal;
}

.login-card .form-control::-webkit-input-placeholder {
  color: #919aa3;
}

.login-card .form-control::-moz-placeholder {
  color: #919aa3;
}

.login-card .form-control:-ms-input-placeholder {
  color: #919aa3;
}

.login-card .form-control::-ms-input-placeholder {
  color: #919aa3;
}

.login-card .form-control::placeholder {
  color: #919aa3;
}

.login-card .login-btn {
  background: linear-gradient(180deg, #4790d9 10%, #054686 100%);
  width: 100%;
  border-radius: 12px;
  border: none;
  font-family: "Open Sans", sans-serif;
  font-size: 17px;
  line-height: 30px;
  color: #fff;
  margin-bottom: 24px;
}

.login-card .login-btn:hover {
  border: none;
  background-color: transparent;
  color: linear-gradient(180deg, #074887 0%, #074887 10%);
}

.login-card .forgot-password-link {
  font-size: 14px;
  color: #0400f8;
}

.login-card-footer-nav a {
  font-size: 14px;
  color: #0881fa;
}

/*# sourceMappingURL=login.css.map */
</style>
