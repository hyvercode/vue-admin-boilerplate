<template>
  <div class="container-fluid">
    <form-header
        title="Profile"
    />
    <div class="row">
      <div class="col-12 col-xl-8">
        <div class="card card-body border-0 shadow mb-4">
          <h2 class="h5 mb-4">Employee information</h2>
          <div class="row">
            <div class="col-md-6 mb-3">
              <img alt="No Image" v-if="employee.images" :src="employee.images"
                   class="avatar-xl rounded-circle bg-gray-100">
              <avatar v-else :username="employee.first_name" :size="size"
                      class="avatar-xl rounded-circle bg-gray-100"></avatar>
            </div>
            <div class="col-md-6 mb-3">
              <div class="row">
                <div class="col-md-12 mb-3">
                  <div>
                    <label>First Name</label>
                    <input class="form-control" type="text" v-model="employee.first_name"
                           placeholder="Enter your first name" disabled>
                  </div>
                </div>
                <div class="col-md-12 mb-3">
                  <div>
                    <label>Last Name</label>
                    <input class="form-control" type="text" v-model="employee.last_name"
                           placeholder="Enter your first name" disabled>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <div>
                <label>Company</label>
                <input class="form-control" type="text" v-model="employee.company_name"
                       placeholder="Enter your first name" disabled>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div>
                <label>Branch</label>
                <input class="form-control" type="text" v-model="employee.branch"
                       placeholder="Enter your first name" disabled>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div>
                <label>NIK</label>
                <input class="form-control" id="nik" type="text" v-model="employee.NIK"
                       placeholder="Enter your first name" disabled>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div>
                <label>Unit</label>
                <input class="form-control" type="text" v-model="employee.unit_name"
                       placeholder="Enter your first name" disabled>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div>
                <label>Job Title</label>
                <input class="form-control" type="text" v-model="employee.job_title_name"
                       placeholder="Enter your first name" disabled>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div>
                <label>Job Position</label>
                <input class="form-control" type="text" v-model="employee.job_position_name" disabled>
              </div>
            </div>
          </div>
        </div>
        <!--       end employee information-->
        <!--       start personal information-->
        <div class="card card-body border-0 shadow mb-4">
          <h2 class="h5 mb-4">Personal information</h2>
          <form>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div>
                  <label>Email</label>
                  <input class="form-control" type="text" v-model="employee.email"
                         placeholder="Enter your first name" disabled>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <label for="last_name">Phone Number</label>
                  <input class="form-control" id="last_name" type="text" v-model="employee.phone_number"
                         placeholder="Also your last name" disabled>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <label for="last_name">Birt Date</label>
                  <input class="form-control" type="date" v-model="employee.birth_date"
                         placeholder="Also your last name" disabled>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <label for="last_name">Birt Place</label>
                  <input class="form-control" type="text" v-model="employee.birth_place"
                         placeholder="Also your last name" disabled>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <label for="last_name">Address</label>
                  <textarea class="form-control" rows="5" type="text" v-model="employee.address"
                            placeholder="Also your last name" disabled></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
        <!--       end personal information-->
      </div>
      <div class="col-12 col-xl-4">
        <div class="row">
          <div class="col-12 mb-4">
            <div class="card shadow border-0 text-center p-0">
              <div class="profile-cover rounded-top" data-background="~@/assets/images/icons/photo-bg.png"></div>
              <div class="card-body pb-5">
                <img alt="No Image" v-if="user.avatar" :src="user.avatar"
                     class="avatar-xl rounded-circle mx-auto mt-n7 mb-4 bg-gray-100">
                <avatar v-else :username="employee.first_name" :size="size"
                        class="avatar-xl rounded-circle mx-auto mt-n7 mb-4 bg-gray-100"></avatar>
                <div class="container">
                  <label class="label">
                    <input
                        type="file"
                        accept="image/*"
                        @change="onFileChange"
                    />
                    <span>Browse</span>
                  </label>
                </div>
                <h4 class="h3 mt-3">{{ employee.nick_name }}</h4>
                <h5 class="fw-normal">{{ employee.company_name }}</h5>
                <p class="text-gray-60">Branch</p>
                <p class="text-gray mb-4">{{ employee.branch_name }}</p>
                <a class="btn btn-sm btn-gray-800 d-inline-flex align-items-center me-2"
                   :href="'mailto:'+user.email">
                  <i class="material-icons" size="20">attach_email</i>
                  Mail
                </a>
                <button class="btn btn-primary" @click.prevent="updateAvatar">Upload Avatar</button>
              </div>
            </div>
          </div>
        </div>
        <!--        change password-->
        <div class="card card-body border-0 shadow mb-4">
          <h2 class="h5 mb-4">Change Password</h2>
          <div>
            <form role="form">
              <div class="mb-3">
                <label class="form-label">Old Password</label>
                <div class="input-group mb-3">
                  <input :type="type1" v-model="oldPassword" class="form-control"
                         placeholder="Please input old password">
                  <span class="input-group-text" id="basic-addon1" @click="showOldPassword"><i
                      class="material-icons">{{ type1 === 'text' ? 'remove_red_eye' : 'vpn_key' }}</i></span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">New Password</label>
                <div class="input-group mb-3">
                  <input :type="type2" v-model="newPassword" class="form-control"
                         placeholder="Please input new password">
                  <span class="input-group-text" @click="showNewPassword"><i
                      class="material-icons">{{ type2 === 'text' ? 'remove_red_eye' : 'vpn_key' }}</i></span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Re Password</label>
                <div class="input-group mb-3">
                  <input type="password" v-model="rePassword" class="form-control" placeholder="******">
                </div>
              </div>
              <div class="mb-3  d-flex justify-content-end">
                <button type="button" class="btn btn-primary text-white" @click.prevent="onSubmitPassword">Change
                  Password
                </button>
              </div>
            </form>
          </div>
        </div>
        <!--       end change password-->
        <!--       alert & notification-->
        <div class="card card-body border-0 shadow mb-4 mb-xl-0">
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
        <!--       end alert & notification-->
      </div>
    </div>
  </div>
</template>
<script>
import RequestEmployee from "../../payloads/request/RequestEmployee";
import FormHeader from "../navigation/FormHeader";
import UserService from "@/services/user.service";
import Utils from "@/helpers/Utils";
import VueCookies from "vue-cookies";
import avatar from 'vue-avatar';

export default {
  components: {FormHeader, avatar},
  data() {
    return {
      employee: new RequestEmployee(),
      user: null,
      size: 100,
      type1: 'password',
      type2: 'password',
      oldPassword: null,
      newPassword: null,
      rePassword: null
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
    updateAvatar() {
      let loading = this.$loading.show();
      let payload = {
        avatar: this.user.avatar
      }
      UserService.postChangeAvatar(this.user.id, payload).then(
          (response) => {
            if (response.code === 200) {
              loading.hide();
              this.$swal.fire(
                  "Success",
                  "Your avatar has been updated",
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
        this.user.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    showOldPassword() {
      if (this.type1 === 'password') {
        this.type1 = 'text'
      } else {
        this.type1 = 'password'
      }
    },
    showNewPassword() {
      if (this.type2 === 'password') {
        this.type2 = 'text'
      } else {
        this.type2 = 'password'
      }
    },
    onClose() {
      this.$emit('onClose');
    },
    onSubmitPassword() {
      let payload = {
        old_password: this.oldPassword,
        new_password: this.newPassword,
        password_confirmation: this.rePassword
      }
      let loading = this.$loading.show();
      UserService.postChangePassword(payload).then(
          (response) => {
            if (response.code === 200) {
              loading.hide();
              this.oldPassword = null;
              this.newPassword = null;
              this.$swal.fire(
                  "Success",
                  "Your password has been updated",
                  "success"
              );
              this.onClose();
            } else {
              loading.hide();
              this.$swal.fire("Alert!", response.message, "error");
            }
          }
      );
    }
  },
};
</script>