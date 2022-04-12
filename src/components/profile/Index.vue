<template>
  <div class="container-fluid">
    <form-header
        title="Profile"
    />
    <div class="row">
      <div class="col-12 col-xl-4">
        <div class="row">
          <div class="col-12 mb-4">
            <div class="card shadow border-0 text-center p-0">
              <div class="profile-cover rounded-top" data-background="~@/assets/img/photo-bg.png"></div>
              <div class="card-body pb-5">
                <img alt="No Image" v-if="user.avatar" :src="user.avatar"
                     class="avatar-xl rounded-circle mx-auto mt-n7 mb-4">
                <avatar v-else :username="user.name" :size="size"></avatar>
                <div class="container">
                  <label class="label">
                    <input
                        type="file"
                        accept="image/*"
                        @change="onFileChange"
                    />
                    <span>Change Photo</span>
                  </label>
                </div>
                <h4 class="h3">{{ user.name }}</h4>
                <h5 class="fw-normal">{{ user.company_name }}</h5>
                <p class="text-gray mb-4">{{ user.branch_name }}</p>
                <a class="btn btn-sm btn-gray-800 d-inline-flex align-items-center me-2"
                   :href="'mailto:'+user.email">
                  <i class="material-icons" size="20">attach_email</i>
                  Mail
                </a>
                <button class="btn btn-primary" @click.prevent="submit">Upload Avatar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-8">
        <div class="card card-body border-0 shadow mb-4">
          <h2 class="h5 mb-4">General information</h2>
          <form>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div>
                  <label for="first_name">Name</label>
                  <input class="form-control" id="first_name" type="text" v-model="user.name"
                         placeholder="Enter your first name" disabled>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <label for="last_name">Phone Number</label>
                  <input class="form-control" id="last_name" type="text" v-model="user.phone_number"
                         placeholder="Also your last name" disabled>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input class="form-control" id="email" v-model="user.email" type="email"
                         placeholder="name@company.com" disabled>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="card card-body border-0 shadow mb-4 mb-xl-0" v-if="false">
          <h2 class="h5 mb-4">Alerts & Notifications</h2>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex align-items-center justify-content-between px-0 border-bottom">
              <div>
                <h3 class="h6 mb-1">Company News</h3>
                <p class="small pe-4">Get Rocket news, announcements, and product updates</p>
              </div>
              <div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="user-notification-1">
                  <label class="form-check-label" for="user-notification-1"></label>
                </div>
              </div>
            </li>
            <li class="list-group-item d-flex align-items-center justify-content-between px-0 border-bottom">
              <div>
                <h3 class="h6 mb-1">Account Activity</h3>
                <p class="small pe-4">Get important notifications about you or activity you've missed</p>
              </div>
              <div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="user-notification-2" checked>
                  <label class="form-check-label" for="user-notification-2"></label>
                </div>
              </div>
            </li>
            <li class="list-group-item d-flex align-items-center justify-content-between px-0">
              <div>
                <h3 class="h6 mb-1">Meetups Near You</h3>
                <p class="small pe-4">Get an email when a Dribbble Meetup is posted close to my location</p>
              </div>
              <div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="user-notification-3" checked>
                  <label class="form-check-label" for="user-notification-3"></label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <change-password title="Change Password" v-show="show" v-on:onClose="onClose"/>
  </div>
</template>
<script>
import RequestEmployee from "../../payloads/request/RequestEmployee";
import EmployeeService from "../../services/employee.service";
import FormHeader from "../navigation/FormHeader";
import ChangePassword from "./ChangePassword";
import UserService from "@/services/user.service";
import Utils from "@/helpers/Utils";
import VueCookies from "vue-cookies";
import avatar from 'vue-avatar';

export default {
  components: {FormHeader, ChangePassword, avatar},
  data() {
    return {
      employee: new RequestEmployee(),
      show: false,
      user: null,
      size: 30
    };
  },
  created() {
    this.user = Utils.jwtDecode(
        JSON.parse(JSON.stringify(VueCookies.get("__MIH__BASE__SESSIONID__"))).access_token
    );
    this.getProfile();
  },
  methods: {
    getProfile() {
      let loading = this.$loading.show();
      this.$store.dispatch("user/getProfile").then((response) => {
        this.employee = response;
        setInterval(function () {
          loading.hide();
        }, 100);
      });
    },
    submit() {
      let loading = this.$loading.show();
      EmployeeService.postUpdate(this.employee.id, this.employee).then(
          (response) => {
            if (response.code === 200) {
              loading.hide();
              this.$swal.fire(
                  "Success",
                  "Your profile has been updated",
                  "success"
              );
            } else {
              loading.hide();
              this.$swal.fire("Alert!", response.message, "error");
            }
          }
      );
    },
    updateAvatar() {
      let loading = this.$loading.show();
      let payload = {
        avatar: this.employee.images
      }
      UserService.postChangeAvatar(this.user.id, payload).then(
          (response) => {
            if (response.code === 200) {
              loading.hide();
              this.$swal.fire(
                  "Success",
                  "Your profile has been updated",
                  "success"
              );
            } else {
              loading.hide();
              this.$swal.fire("Alert!", response.message, "error");
            }
          }
      );
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.employee.images = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onChangePassword() {
      this.show = true;
    },
    onClose() {
      this.show = false;
    }
  },
};
</script>
