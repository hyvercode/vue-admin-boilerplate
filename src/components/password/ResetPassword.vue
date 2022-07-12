<template>
  <div class="body">
    <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div class="container">
        <div class="card login-card d-flex">
          <div class="card-body text-center">
            <div class="text-center">
              <router-link
                  to="/"
              ><img src="~@/assets/images/icons/brand.png" width="200" class="mb-3"/>
              </router-link>
              <p class="login-card-description h5">Reset Password</p>
              <h6 class="m-4">
                Input new password
              </h6>
            </div>
            <form role="form" @submit.prevent="onSubmit">
              <div class="form-group mb-2">
                <div class="col-4">
                  <em>
                    <img
                        src="~@/assets/images/icons/password.png"
                        style="
                            position: absolute;
                            margin: -10px 0px 0px -120px;
                          "
                    />
                  </em>
                </div>
                <div class="col-12 input-email">
                  <input
                      type="password"
                      class="form-control form-control-sm"
                      v-model="user.new_password"
                      placeholder="******"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="col-4">
                  <em>
                    <img
                        src="~@/assets/images/icons/password.png"
                        style="
                            position: absolute;
                            margin: -10px 0px 28px -120px;
                          "
                    />
                  </em>
                </div>
                <div class="col-12 input-email">
                  <input
                      type="password"
                      class="form-control form-control-sm"
                      v-model="user.password_confirmation"
                      placeholder="******"
                  />
                </div>
              </div>
              <div class="container mt-4">
                <input
                    class="btn login-btn"
                    type="submit"
                    value="Submit"
                />
              </div>
            </form>
          </div>
          <autor />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import AuthService from "@/services/auth.service";
import Pages from "../../helpers/Pages";
import Autor from "../navigation/Autor";
import VueCookies from "vue-cookies";

export default {
  name: "ResetPassword",
  components: {Autor},
  data() {
    return {
      user: {
        account: "",
        new_password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.user.new_password === this.user.password_confirmation) {
        let loading = this.$loading.show();
        let params = {
          account: sessionStorage.getItem("session_id"),
          new_password: this.user.new_password,
          password_confirmation: this.user.password_confirmation,
        };
        AuthService.resetPassword(params).then((response) => {
          if (response.code === 200) {
            this.$swal
                .fire({
                  icon: "success",
                  text: "Your password has been change",
                  confirmButtonText: "Login Now",
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    sessionStorage.removeItem("session_id")
                    sessionStorage.removeItem("session_username")
                    this.$router.push(Pages.LOGIN);
                  }
                });
          } else {
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
            });
          }
        });
        loading.hide();
      } else {
        this.$swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "New password that is entered is not the same as the confirmation password",
        });
      }
    },
  }
};
</script>
<style scoped></style>

<style scoped>
.body {
  /*background: linear-gradient(180deg, #4790d9 0%, #0f75bc 100%) !important;*/
  min-height: 10vh;
}

.card {
  max-width: 550px;
  margin: auto;
}

.brand-wrapper .logo {
  height: 37px;
}

.login-card {
  border: 0;
  border-radius: 27.5px;
  box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
  overflow: hidden;
}

.login-card .card-body {
  padding: 85px 60px 60px;
}

@media (max-width: 422px) {
  .login-card .card-body {
    padding: 35px 24px;
  }
}

.login-card-description {
  font-size: 30px;
  color: #444444;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 23px;
}

.login-card form {
  max-width: 400px;
  margin: auto;
}

.login-card .form-control {
  border: 1px solid #4b4c4d;
  padding: 15px 25px;
  font-size: 18px;
  height: 50px;
  font-weight: 600;
  line-height: 15;
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
  border-radius: 12px;
  border: none;
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

</style>
