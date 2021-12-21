<template>
  <div class="body">
    <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div class="container">
        <div class="card login-card">
          <div class="row no-gutters">
            <div class="col-md-12">
              <div class="card-body">
                <div class="text-center">
                  <svg
                      width="82"
                      height="60"
                      style="margin-top: -80px"
                      viewBox="0 0 82 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                        x="0.854004"
                        width="80.292"
                        height="100"
                        fill="url(#pattern0)"
                    />
                    <defs>
                      <pattern
                          id="pattern0"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                      >
                        <use
                            xlink:href="#image0_163_4580"
                            transform="translate(-0.551724 -0.173294) scale(0.00350079 0.00282008)"
                        />
                      </pattern>
                      <image
                          id="image0_163_4580"
                          width="591"
                          height="576"
                          xlink:href="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>
                  <p>
                    Selamat datang di <br/>
                    Pickers Business Partner
                  </p>
                </div>
                <form @submit.prevent="submit">
                  <div class="form-group">
                    <label for="username" class="sr-only">NIK / Login ID</label>
                    <input
                        id="username"
                        v-model="login.username"
                        type="text"
                        name="username"
                        class="form-control form-control-sm"
                        placeholder="Input NIK / RequestLogin ID"
                        required
                    />
                  </div>
                  <div class="form-group">
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password"
                        v-model="login.password"
                        type="password"
                        name="password"
                        class="form-control form-control-sm"
                        min="6"
                        placeholder="***********"
                        required
                    />
                  </div>
                  <div class="form-group mb-1 text-center">
                    <div class="re-captcha text-center">
                      <vue-recaptcha
                          ref="invisibleRecaptcha"
                          @verify="onCaptchaVerified"
                          @expired="onCaptchaExpired"
                          sitekey="6LcTLnkdAAAAAHilmneUf75PPtd2IjgPkIGM-98z"
                      >
                      </vue-recaptcha>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" v-model="login.remember_me" type="checkbox" value=""
                             id="remember">
                      <label class="form-check-label" for="remember">
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                        id="login"
                        name="login"
                        class="btn btn-success login-btn"
                        type="submit"
                        value="Masuk"
                    />
                  </div>
                </form>
                <div class="text-center">
                  <a
                      href="/"
                      class="forgot-password-link"
                      style="color: #4790d9 !important"
                  >Forgot password?</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>

import VueRecaptcha from "vue-recaptcha";
import RequestLogin from "../payloads/request/RequestLogin";
import Pages from "../helpers/Pages";

export default {
  name: "Login",
  components: {VueRecaptcha},
  data() {
    return {
      login: new RequestLogin(),
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.isLogin) {
      this.$router.push(Pages.HOME);
    }
  },
  methods: {
    handleLupaPassword(event) {
      event.preventDefault();
    },
    onCaptchaVerified(response) {
      if (response) this.robot = true;
    },
    onLogin() {
      let loading = this.$loading.show();
      this.$store.dispatch("auth/login", this.login).then((response) => {
            loading.hide();
            if (response.code === 200) {
              this.$router.push(Pages.HOME);
            } else {
              this.$swal.fire(
                  'Error',
                  'NIK atau password anda salah',
                  'error'
              );
            }

          }, (error) => {
            loading.hide();
            this.$swal.fire(
                'Error',
                'Error network connection! \n' + error,
                'error'
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
      this.$refs.recaptcha.reset(); // Direct call reset method
    },
  },
};
</script>

<style scoped>
.bg-gradient-primary {
  width: 100% !important;
  height: 100vh !important;
}

.body {
  font-family: "Open Sans", sans-serif;
  background-image: url('~@/assets/img/login-bg.png');
  min-height: 10vh;
}

.brand-wrapper {
  margin-bottom: 19px;
}

.brand-wrapper .logo {
  height: 37px;
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

.login-card-img {
  border-radius: 0;
  position: absolute;
  -o-object-fit: cover;
  object-fit: cover;
}

.login-card .card-body {
  padding: 85px 60px 60px;
}

@media (max-width: 422px) {
  .login-card .card-body {
    padding: 35px 24px;
    margin-left: 0px !important;
  }
}

.login-card-description {
  font-size: 25px;
  color: #000;
  font-weight: normal;
  margin-bottom: 23px;
}

.login-card form {
  max-width: 326px;
}

.login-card .form-control {
  width: 100% !important;
  height: 100% !important;
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
  padding: 13px 20px 12px;
  background: linear-gradient(180deg, #34C759 0%, #009F35 100%);
  width: 226px !important;
  border-radius: 20px;
  border: none;
  font-family: "Open Sans", sans-serif;
  margin-left: 50px !important;
  border-radius: 4px;
  font-size: 17px;

  line-height: 20px;
  color: #fff;
  margin-bottom: 24px;
}

.login-card .login-btn:hover {
  border: none;
  background-color: transparent;
  color:linear-gradient(180deg, #34C759 0%, #009F35 100%);
}

.login-card .forgot-password-link {
  font-size: 14px;
  color: #0400f8;
}

.login-card-footer-text {
  font-size: 16px;
  color: #0d2366;
  margin-bottom: 60px;
}

@media (max-width: 767px) {
  .login-card-footer-text {
    margin-bottom: 24px;
  }
}

.login-card-footer-nav a {
  font-size: 14px;
  color: #0881fa;
}

/*# sourceMappingURL=login.css.map */
</style>
