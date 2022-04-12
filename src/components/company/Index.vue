<template>
  <div class="container-fluid">
    <form-header
        title="Company Profile"
    />
    <div class="row">
      <div class="col-12 col-xl-4">
        <div class="row">
          <div class="col-12 mb-4">
            <div class="card shadow border-0 text-center p-0">
              <div class="profile-cover rounded-top" data-background="~@/assets/images/icons/photo-bg.png"></div>
              <div class="card-body pb-5">
                <img alt="No Image" v-if="company.image" :src="company.image"
                     class="avatar-xl rounded-circle mx-auto mt-n7 mb-4">
                <avatar v-else :username="company.company_code" :size="size"
                        class="avatar-xl rounded-circle mx-auto mt-n7 mb-4"></avatar>
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
                <h4 class="h3">{{ company.company_name }}</h4>
                <h5 class="fw-normal">{{ company.company_code }}</h5>
                <!--                <p class="text-gray mb-4">{{ company.company_alias }}</p>-->
                <a class="btn btn-sm btn-gray-800 d-inline-flex align-items-center me-2"
                   :href="'mailto:'+company.email">
                  <i class="material-icons" size="20">attach_email</i>
                  Mail
                </a>
                <button class="btn btn-primary" @click.prevent="submit">Upload Logo</button>
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
                  <label for="first_name">Company Name</label>
                  <input class="form-control" id="first_name" type="text" v-model="company.company_name"
                         placeholder="Enter your first name" disabled>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <label for="last_name">Company Alias</label>
                  <input class="form-control" id="last_name" type="text" v-model="company.company_alias"
                         placeholder="Also your last name" disabled>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input class="form-control" id="email" v-model="company.email" type="email"
                         placeholder="name@company.com" disabled>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label for="phone">Phone</label>
                  <input class="form-control" id="phone" type="text" v-model="company.phone_number"
                         placeholder="+12-345 678 910" disabled>
                </div>
              </div>
            </div>
            <h2 class="h5 my-4">Location</h2>
            <div class="row">
              <div class="col-sm-9 mb-3">
                <div class="form-group">
                  <label for="address">Address</label>
                  <textarea class="form-control" id="address" rows="5" v-model="company.address"
                            placeholder="Enter your home address" disabled></textarea>
                </div>
              </div>
              <div class="col-sm-3 mb-3">
                <div class="form-group">
                  <label for="number">Postal Code</label>
                  <input class="form-control" id="number" type="text" v-model="company.postal_code" placeholder="No."
                         disabled>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 mb-3">
                <div class="form-group">
                  <label for="city">Contact Person</label>
                  <input class="form-control" id="city" type="text" v-model="company.contact_person" placeholder="City"
                         disabled>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="zip">Contact Number</label>
                  <input class="form-control" type="text" v-model="company.contact_number" disabled>
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
  </div>
</template>
<script>
import RequestCompany from "../../payloads/request/RequestCompanies";
import CompanyService from "../../services/companies.service";
import FormHeader from "../navigation/FormHeader";
import Utils from "@/helpers/Utils";
import VueCookies from "vue-cookies";
import avatar from 'vue-avatar';

export default {
  components: {FormHeader, avatar},
  data() {
    return {
      company: new RequestCompany(),
      show: false,
      user: null,
      size: 100
    };
  },
  created() {
    this.user = Utils.jwtDecode(
        JSON.parse(JSON.stringify(VueCookies.get("__MIH__BASE__SESSIONID__"))).access_token
    );
  },
  mounted() {
    this.getCompanies();
  },
  methods: {
    getCompanies() {
      let loading = this.$loading.show();
      CompanyService.getShow(this.user.company_id).then((response) => {
        if (response.code === 200) {
          this.company = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      CompanyService.postUpdate(this.company.id, this.company).then((response) => {
        if (response.code === 200) {
          this.coverage = new RequestCompany();
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Company has been updated",
          });
          this.doRefresh();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.company.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
