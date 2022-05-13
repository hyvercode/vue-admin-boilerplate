<template>
  <div class="body">
    <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div class="container">
        <div class="card login-card d-flex">
          <div class="card-body text-center">
            <div class="text-center">
              <router-link
                  to="/"
              >
                <img src="~@/assets/images/icons/brand.png" width="200" class="mb-3"/>
              </router-link>
              <p class="login-card-description h6">OTP Verification</p>
              <h6 class="m-4">
                Input your OTP Code
              </h6>
            </div>
            <form
                class="digit-group"
                @submit.prevent="handleVerify($event)"
            >
              <input
                  type="text"
                  oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                  @keypress="isNumber($event)"
                  v-model="otp.code1"
                  v-on:keyup="$event.target.nextElementSibling.focus()"
                  placeholder="0"
                  maxlength="1"
                  required
              />
              <input
                  type="text"
                  oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                  @keypress="isNumber($event)"
                  v-model="otp.code2"
                  v-on:keyup="$event.target.nextElementSibling.focus()"
                  placeholder="0"
                  maxlength="1"
                  required
              />
              <input
                  type="text"
                  oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                  @keypress="isNumber($event)"
                  v-model="otp.code3"
                  v-on:keyup="$event.target.nextElementSibling.focus()"
                  placeholder="0"
                  maxlength="1"
                  required
              />
              <input
                  type="text"
                  oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                  @keypress="isNumber($event)"
                  v-model="otp.code4"
                  v-on:keyup="$event.target.nextElementSibling.focus()"
                  placeholder="0"
                  maxlength="1"
                  required
              />
              <input
                  type="text"
                  oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                  @keypress="isNumber($event)"
                  v-model="otp.code5"
                  v-on:keyup="$event.target.nextElementSibling.focus()"
                  placeholder="0"
                  maxlength="1"
                  required
              />
              <input
                  type="text"
                  oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                  @keypress="isNumber($event)"
                  v-model="otp.code6"
                  v-on:keyup="$event.target.nextElementSibling.focus()"
                  placeholder="0"
                  maxlength="1"
                  required
              />
              <div class="resend-otp">
                <a v-on:click.prevent="handleResendOTP($event)"
                >Resend OTP Code</a
                >
              </div>
              <div class="container">
                <button class="btn login-btn" type="submit">
                  Verification
                </button>
              </div>
            </form>
          </div>
          <autor/>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import OTP from "../../services/auth.service";
import router from "@/router";
import publicPages from "../../helpers/Pages";
import Autor from "../navigation/Autor";

export default {
  name: "otp",
  components: {Autor},
  props: {
    nextPage: String,
  },
  data() {
    return {
      countDown: "",
      session: null,
      otp: {
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        code5: "",
        code6: "",
      },
      resend: false,
      intervalToken: "",
    };
  },
  methods: {
    handleVerify(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      let otp =
          this.otp.code1 +
          this.otp.code2 +
          this.otp.code3 +
          this.otp.code4 +
          this.otp.code5 +
          this.otp.code6;
      let payload = {
        otp_code: otp,
        account: sessionStorage.getItem("session_id"),
      };
      OTP.postverified(payload).then(
          (response) => {
            loading.hide();
            sessionStorage.setItem("session_id", response.data.id);
            router.push(pages.PASSWORD_RESET);
          },
          () => {
            loading.hide();
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Invalid OTP code !",
            });
          }
      );
    },
    handleResendOTP(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      this.$store.dispatch("auth/otp", sessionStorage.getItem("session_username")).then((response) => {
            loading.hide();
            if (response.code === 200) {
              sessionStorage.setItem("session_id", response.data.id);
              this.otp = {
                code1: "",
                code2: "",
                code3: "",
                code4: "",
                code5: "",
                code6: "",
              };
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: 'OTP code has been sending',
              });
            }
          },
          () => {
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: 'OTP code has been sending',
            });
          }
      );
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
          charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.body {
  /*background: linear-gradient(180deg, #4790d9 50%, #074887 100%) !important;*/
  min-height: 10vh;
}

.card {
  max-width: 550px;
  margin: auto;
}

.login-card {
  border: 0;
  border-radius: 27.5px;
  box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
  overflow: hidden;
}

.login-card .card-body {
  padding: 50px 60px 60px;
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

.login-card .forgot-password-link {
  font-size: 14px;
  color: #074887;
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

/* WKWKW */
.gm-otp-code h5 {
  color: #444444;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 40px;
  letter-spacing: -0.03em;
}

.gm-otp-code p {
  color: #444444;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
}

.gm-otp-code h4 {
  color: #444444;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 25px;
  letter-spacing: -0.03em;
  padding: 30px;
}

.gm-form-ganti-password .input-container input {
  width: 85%;
}

.digit-group input {
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border: 1px solid #757575;
  border-radius: 5px;
  box-sizing: border-box;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  font-style: normal;
  color: #074887;
  margin: 0 2px;
}

.digit-group input:hover {
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border: 1px solid #757575;
  border-radius: 5px;
  box-sizing: border-box;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  font-style: normal;
  color: #074887;
  margin: 0 2px;
}

.resend-otp {
  margin: 40px;
}

.resend-otp a {
  color: #074887;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.03em;
}

.expired {
  color: #fe0000;
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  /* Styles */
  .digit-group input {
    width: 36px;
    height: 60px;
    background-color: #ffffff;
    border: 1px solid #757575;
    border-radius: 5px;
    box-sizing: border-box;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    font-style: normal;
    color: #074887;
    margin: 0 2px;
  }

  .digit-group input:hover {
    width: 36px;
    height: 60px;
    background-color: #ffffff;
    border: 1px solid #757575;
    border-radius: 5px;
    box-sizing: border-box;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    font-style: normal;
    color: #074887;
    margin: 0 2px;
  }
}
</style>
