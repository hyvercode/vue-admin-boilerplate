<template>
  <div class="pickers">
    <div class="container-fluid px-3 mt-5">
      <div class="row mb-3">
        <div class="col-6 d-flex justify-content-between ps-0">
          <div class="me-lg-3">
            <h5 class="form-title">Update Users</h5>
          </div>
        </div>
        <div class="col-6 px-0 text-end">
          <div class="btn-group">
            <button class="btn btn-submit text-black" @click.prevent="$router.go(-1)">
              <i class="material-icons">arrow_back</i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-12 col-12">
        <div class="card px-3 py-3 mb-3">
          <form role="form" @submit.prevent="handleSubmit($event)">
            <div class="row">
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="name">Name <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input text" id="name" name="name" class="form-control" disabled
                         v-model="users.name" maxlength="30" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="username">Username <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input text" id="username" name="username" class="form-control"
                         disabled
                         v-model="users.username" maxlength="30" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phone">Phone Number <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input number" id="phone" name="phone"
                         @keypress="isNumber($event)" class="form-control"
                         v-model="users.phone_number" maxlength="20" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="email">Email <span class="mandatory">*</span></label>
                  <input type="email" placeholder="Please input email" id="email" name="email" class="form-control"
                         v-model="users.email" maxlength="20" required/>
                </div>
              </div>

              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="district">Roles <span class="mandatory">*</span></label>
                  <select class="form-control" id="district" name="district" v-model="users.api_roles" required>
                    <option value="null" disabled>Choose...</option>
                    <option v-for="role in roles" :key="role.id" :value="role.name">
                      {{ role.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="village">Access Menu <span class="mandatory">*</span></label>
                  <select class="form-control" id="village" name="village" v-model="users.menu_roles" required>
                    <option value="null" disabled>Choose...</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="branch">Branch <span class="mandatory">*</span></label>
                  <select class="form-control" id="branch" name="branch" v-model="users.branch_id" required>
                    <option value="null" disabled>Choose...</option>
                    <option v-for="record in branch" :key="record.id" :value="record.id">
                      {{ record.branch_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="status">Status <span class="mandatory">*</span></label>
                  <select class="form-control" id="status" name="status" v-model="users.status">
                    <option value="null" disabled>Choose...</option>
                    <option v-for="status in status" :key="status.id" :value="status.id">
                      {{ status.desc }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 mb-3">
                <div class="form-group">
                  <label for="avatar">Avatar <span class="mandatory">*</span></label>
                  <input type="file" id="avatar" name="avatar" @change="onFileChangeAvatar" accept="image/*"
                         class="form-control">
                </div>
              </div>
            </div>
            <div class="row text-right mt-3">
              <div class="col-lg-12 d-flex justify-content-end">
                <input type="submit" class="btn btn-primary" value="Submit">
                <button
                    class="btn btn-primary"
                    @click.prevent="$router.back()"
                    style="margin-left: 10px !important"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import BranchService from "../../services/branch.service";
import Utils from "../../helpers/Utils";
import router from "../../router";
import EmployeeService from "../../services/employee.service";
import RequestUsers from "../../payloads/request/RequestUsers";
import UserService from "../../services/user.service";
import utils from "../../helpers/Utils";

export default {
  name: "Create",
  components: {},
  data() {
    return {
      users: new RequestUsers(),
      roles: [{id: '4', name: 'boss'}, {id: '6', name: 'opr'}, {id: '7', name: 'guest'}],
      branch: [],
      companies: [],
      employees: [],
      status: Utils.status()
    };
  },
  mounted() {
    this.users.company_id = this.$store.state.user.data.profile.company_id;
    this.getUser();
  },
  methods: {
    getEmployees() {
      let loading = this.$loading.show();
      EmployeeService.getAll(this.users.company_id).then(response => {
        if (response.code === 200) {
          this.employees = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire(
              'Error!',
              'Employee' + response.message,
              'error'
          )
        }
      })
    },
    getUser() {
      let loading = this.$loading.show();
      UserService.getShow(utils.decrypt(this.$route.params.id)).then(response => {
        if (response.code === 200) {
          this.users = response.data;
          this.getEmployees();
          this.getBranch();
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire(
              'Error!',
              'Employee ' + response.message,
              'error'
          )
        }
      })
    },
    isNumber(evt) {
      return Utils.isNumber(evt);
    },
    getBranch() {
      let loading = this.$loading.show();
      BranchService.getByCompany(this.users.company_id).then(response => {
        if (response.code === 200) {
          this.branch = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire(
              'Error!',
              'Business ' + response.message,
              'error'
          )
        }
      })
    },
    onFileChangeAvatar(e) {
      let files = e.target.files || e.dataTransfer.files;
      let reader = new FileReader();
      reader.onload = (ev) => {
        this.users.avatar = ev.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
    handleSubmit() {
      let loading = this.$loading.show();
      UserService.postUpdate(this.users.id, this.users).then(response => {
        if (response.code === 200) {
          this.users = new RequestUsers();
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "User account has been created",
          });
          router.back();
        } else {
          loading.hide();
          this.$swal.fire(
              'Error!',
              response.message,
              'error'
          )
        }
      })
    }
  },
};
</script>
