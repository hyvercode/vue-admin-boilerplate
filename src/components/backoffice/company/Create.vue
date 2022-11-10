<template>
  <div class="container-fluid">
    <form-header
        title="Create Company"
    />
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-12 col-12">
        <div class="card px-3 py-3 mb-3">
          <form role="form" @submit.prevent="handleSubmit($event)">
            <div class="row">
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="code">Company Code <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input text" id="code" name="code" class="form-control"
                         v-model="company.company_code" maxlength="6" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="name">Company Name <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input text" id="name" code="name" class="form-control"
                         v-model="company.company_name" maxlength="60" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="alias">Company Alias <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input text" id="alias" name="alias" class="form-control"
                         v-model="company.company_alias" maxlength="30" required/>
                </div>
              </div>

              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="address">Address <span class="mandatory">*</span></label>
                  <textarea type="text" placeholder="Please input text" rows="3" id="address" name="address"
                            class="form-control" v-model="company.address" required></textarea>
                </div>
              </div>

              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="province">Province <span class="mandatory">*</span></label>
                  <select class="form-control" id="province" name="province" v-model="company.province_id"
                          @change="getCities" required>
                    <option value="null" disabled>Choose...</option>
                    <option v-for="provinci in provinces" :key="provinci.id" :value="provinci.id">
                      {{ provinci.province_name_id }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="city">City <span class="mandatory">*</span></label>
                  <select class="form-control" id="city" name="city" v-model="company.city_id" @change="getDistrict"
                          required>
                    <option value="null" disabled>Choose...</option>
                    <option v-for="city in cities" :key="city.id" :value="city.id">
                      {{ city.city_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="district">District <span class="mandatory">*</span></label>
                  <select class="form-control" id="district" name="district" v-model="company.district_id"
                          @change="getVillage" required>
                    <option value="null" disabled>Choose...</option>
                    <option v-for="district in districts" :key="district.id" :value="district.id">
                      {{ district.district_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="village">Village <span class="mandatory">*</span></label>
                  <select class="form-control" id="village" name="village" v-model="company.village_id"
                          @change="getPostalCode" required>
                    <option value="null" disabled>Choose...</option>
                    <option v-for="village in villages" :key="village.id" :value="village.id">
                      {{ village.village_name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="business">Business <span class="mandatory">*</span></label>
                  <select class="form-control" id="business" name="business" v-model="company.business_id" required>
                    <option value="null" disabled>Choose...</option>
                    <option v-for="busines in business" :key="busines.id" :value="busines.id">
                      {{ busines.business_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="postal">Postal Code <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input number" id="postal" name="postal"
                         v-model="company.postal_code" @keypress="isNumber($event)" class="form-control" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="billingaddress">Billing Address <span class="mandatory">*</span></label>
                  <textarea type="text" placeholder="Please input text" id="billingaddress"
                            v-model="company.billing_address" name="address"
                            class="form-control" rows="3" required></textarea>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phoneNumber">Phone Number <span class="mandatory">*</span></label>
                  <input type="phoneNumber" placeholder="Please input number" id="phoneNumber" name="phoneNumber"
                         v-model="company.phone_number" @keypress="isNumber($event)" class="form-control" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="email">Email <span class="mandatory">*</span></label>
                  <input type="email" placeholder="Please input text" id="email" name="email" v-model="company.email"
                         class="form-control" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="contactPerson">Contact Person <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input text" id="contactPerson" name="contactPerson"
                         v-model="company.contact_person" class="form-control" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="contactNumber">Contact Number <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input number" id="contactNumber" name="contactNumber"
                         v-model="company.contact_number" @keypress="isNumber($event)" class="form-control" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="npwp">NPWP Number <span class="mandatory">*</span></label>
                  <input type="text" placeholder="Please input number" id="npwp" name="npwp" v-model="company.npwp_no"
                         class="form-control" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="npwpPhoto">NPWP Photo <span class="mandatory">*</span></label>
                  <input type="file" id="npwpPhoto" name="npwpPhoto" @change="onFileChangeNPWP" accept="image/*"
                         class="form-control" required>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="siup">SIUP Number <span class="mandatory">*</span></label>
                  <input type="siup" placeholder="Please input number" id="siup" name="siup" v-model="company.siup_no"
                         class="form-control" required/>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="siupPhoto">SIUP Photo <span class="mandatory">*</span></label>
                  <input type="file" id="siupPhoto" name="npwpPhoto" @change="onFileChangeSIUP" accept="image/*"
                         class="form-control" required>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="invoice">Invoice PIC</label>
                  <select class="form-control" id="invoice" name="invoice" v-model="company.invoice_pic">
                    <option value="null" disabled>Choose...</option>
                    <option v-for="pic in employees" :key="pic.id" :value="pic.id">
                      {{ pic.employee_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name">Status <span class="mandatory">*</span></label>
                  <select class="form-control" id="status" name="status" v-model="company.status">
                    <option value="null" disabled>Choose...</option>
                    <option v-for="status in status" :key="status.id" :value="status.id">
                      {{ status.desc }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 mb-3">
                <div class="form-group">
                  <label for="image">Image <span class="mandatory">*</span></label>
                  <input type="file" id="image" name="image" @change="onFileChangeImage" accept="image/*"
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
import RequestCompanies from "../../../payloads/request/RequestCompanies";
import ProvinceService from "../../../services/province.service";
import CitiesService from "../../../services/cities.service";
import DistrictService from "../../../services/district.service";
import VillageService from "../../../services/village.service";
import BusinessService from "../../../services/business.service";
import Utils from "../../../helpers/Utils";
import CompaniesService from "../../../services/companies.service";
import router from "../../../router";
import EmployeeService from "../../../services/employee.service";
import FormHeader from "../../navigation/FormHeader";

export default {
  name: "Create",
  components: {FormHeader},
  data() {
    return {
      company: new RequestCompanies(),
      provinces: [],
      cities: [],
      districts: [],
      villages: [],
      business: [],
      employees: [],
      status: Utils.status()
    };
  },
  created() {
    this.getProvincies();
    this.getBusiness();
    this.getEmployees();
  },
  methods: {
    getProvincies() {
      let loading = this.$loading.show();
      ProvinceService.getAll().then(response => {
        if (response.code === 200) {
          this.provinces = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire(
              'Error!',
              'Provincies ' + response.message,
              'error'
          )
        }
      })
    },
    getCities() {
      let loading = this.$loading.show();
      CitiesService.getCityByProvince(this.company.province_id).then(response => {
        if (response.code === 200) {
          this.cities = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire(
              'Error!',
              'Cities' + response.message,
              'error'
          )
        }
      })
    },
    getDistrict() {
      let loading = this.$loading.show();
      DistrictService.getDistrictByCity(this.company.city_id).then(response => {
        if (response.code === 200) {
          this.districts = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire(
              'Error!',
              'Districts' + response.message,
              'error'
          )
        }
      })
    },
    getVillage() {
      let loading = this.$loading.show();
      VillageService.getVillageByDistrict(this.company.district_id).then(response => {
        if (response.code === 200) {
          this.villages = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire(
              'Error!',
              'Villages ' + response.message,
              'error'
          )
        }
      })
    },
    getPostalCode() {
      let loading = this.$loading.show();
      VillageService.getShow(this.company.village_id).then((response) => {
        this.company.postal_code = response.data.postal_code;
      });
      loading.hide();
    },
    getBusiness() {
      let loading = this.$loading.show();
      BusinessService.getAll().then(response => {
        if (response.code === 200) {
          this.business = response.data;
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
    isNumber(evt) {
      return Utils.isNumber(evt);
    },
    getEmployees() {
      let loading = this.$loading.show();
      EmployeeService.getByCompany(this.company.id).then(response => {
        if (response.code === 200) {
          this.employees = response.data;
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

    onFileChangeNPWP(e) {
      let files = e.target.files || e.dataTransfer.files;
      let reader = new FileReader();
      reader.onload = (ev) => {
        this.company.npwp_path = ev.target.result;
      };
      reader.readAsDataURL(files[0]);
    },

    onFileChangeSIUP(e) {
      let files = e.target.files || e.dataTransfer.files;
      let reader = new FileReader();
      reader.onload = (ev) => {
        this.company.siup_path = ev.target.result;
      };
      reader.readAsDataURL(files[0]);
    },

    onFileChangeImage(e) {
      let files = e.target.files || e.dataTransfer.files;
      let reader = new FileReader();
      reader.onload = (ev) => {
        this.company.image = ev.target.result;
      };
      reader.readAsDataURL(files[0]);
    },

    handleSubmit() {
      let loading = this.$loading.show();
      CompaniesService.postCreate(this.company).then(response => {
        if (response.code === 200) {
          this.company = new RequestCompanies();
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Company account has been created",
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
