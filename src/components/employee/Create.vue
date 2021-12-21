<template>
  <div class="pickers">
    <div class="container-fluid px-3 mt-5">
      <div class="row mb-3">
        <div class="col-6 d-flex justify-content-between ps-0">
          <div class="me-lg-3">
            <h5 class="form-title">Create Employee</h5>
          </div>
        </div>
        <div class="col-6 px-0 text-end">
          <div class="btn-group">
            <button class="btn btn-submit text-black" @click="$router.go(-1)">
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
                  <label for="branch">Branch <span class="mandatory">*</span></label>
                  <select class="form-control" id="branch" name="branch" v-model="employee.branch_id" required>
                    <option value="null" disabled>Choose...</option>
                    <option v-for="record in branch" :key="record.id" :value="record.id">
                      {{ record.branch_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="nik">NIK <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input text" id="nik" maxlength="12" name="nik" class="form-control"
                         v-model="employee.nik" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="name">Name <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input text" id="name" name="name" maxlength="40" class="form-control"
                         v-model="employee.employee_name" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phone">Phone Number <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input number" id="phone" name="phone"
                         @keypress="isNumber($event)" class="form-control"
                         v-model="employee.phone_number" maxlength="20" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="email">Email <span class="mandatory">*</span></label>
                  <input type="email" placeholder="Please input email" id="email" name="email" class="form-control"
                         v-model="employee.email" maxlength="40" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="address">Address <span class="mandatory">*</span></label>
                  <textarea type="text" placeholder="Please input text" rows="5" id="address" name="address" class="form-control"
                         v-model="employee.address" maxlength="200" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Postcode">Postcode <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input number" @keypress="isNumber($event)" id="Postcode" name="Postcode" class="form-control"
                         v-model="employee.postal_code" maxlength="50" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="birth_place">Birth Place <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input text" id="birth_place" name="birth_place" class="form-control"
                         v-model="employee.birth_place" maxlength="50" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="birth_date">Birth Date <span class="mandatory">*</span></label>
                  <input type="date" placeholder="Please input date" id="birth_date" name="birth_place" class="form-control"
                         v-model="employee.birth_date" maxlength="20" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name">Status <span class="mandatory">*</span></label>
                  <select class="form-control" id="status" name="status" v-model="employee.status">
                    <option value="null" disabled>Choose...</option>
                    <option v-for="status in status" :key="status.id" :value="status.id">
                      {{ status.desc }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 mb-3">
                <div class="form-group">
                  <label for="avatar">Photo <span class="mandatory">*</span></label>
                  <input type="file" id="avatar" name="avatar" @change="onFileChangeAvatar" accept="image/*"
                         class="form-control" required>
                </div>
              </div>
            </div>
            <div class="row text-right mt-3">
              <div class="col-lg-12 d-flex justify-content-end">
                <input type="submit" class="btn btn-primary" value="Submit">
                <button
                    class="btn btn-primary"
                    @click="$router.go(-1)"
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
import RequestEmployee from "../../payloads/request/RequestEmployee";
import EmployeeService from "../../services/employee.service";

export default {
  name: "Create",
  components: {},
  data() {
    return {
      employee: new RequestEmployee(),
      branch: [],
      companies: [],
      status: Utils.status()
    };
  },
  mounted() {
    this.employee.birth_date = new Date().toISOString().substr(0, 10);
    this.employee.company_id =this.$store.state.user.data.profile.company_id;
    this.getBranch();
  },
  methods: {
    isNumber(evt) {
      return Utils.isNumber(evt);
    },
    getBranch() {
      let loading = this.$loading.show();
      BranchService.getByCompany(this.employee.company_id).then(response => {
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
        this.employee.images = ev.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
    handleSubmit() {
      let loading = this.$loading.show();
      EmployeeService.postCreate(this.employee).then(response => {
        if (response.code === 200) {
          this.employee = new RequestEmployee();
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Employee account has been created",
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
