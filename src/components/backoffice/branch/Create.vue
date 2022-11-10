<template>
  <div class="container-fluid">
    <form-header title="Create Branch"/>
    <form @submit.prevent="submit($event)">
      <div class="row">
        <div class="col-8">
          <div class="card px-3 py-3 mb-3">
            <div class="row">
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name">Branch Code</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="branch.branch_code"
                      placeholder="Please input text"
                      maxlength="6"
                      required
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name">Branch Name</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="branch.branch_name"
                      placeholder="Please input text"
                      required
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="province">Province</label>
                  <select
                      class="form-control form-select"
                      id="province"
                      name="province"
                      v-model="branch.province_id"
                      @change="getCities"
                      required
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="provinci in provinces"
                        :key="provinci.id"
                        :value="provinci.id"
                    >
                      {{ provinci.province_name_id }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="city">City</label>
                  <select
                      class="form-control form-select"
                      id="city"
                      name="city"
                      v-model="branch.city_id"
                      @change="getDistrict"
                      required
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="city in cities"
                        :key="city.id"
                        :value="city.id"
                    >
                      {{ city.city_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="district">District</label>
                  <select
                      class="form-control form-select"
                      id="district"
                      name="district"
                      v-model="branch.district_id"
                      @change="getVillage"
                      required
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="district in districts"
                        :key="district.id"
                        :value="district.id"
                    >
                      {{ district.district_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="village">Village</label>
                  <select
                      class="form-control form-select"
                      id="village"
                      name="village"
                      v-model="branch.village_id"
                      @change="getPostalCode"
                      required
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="village in villages"
                        :key="village.id"
                        :value="village.id"
                    >
                      {{ village.village_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="postal">Postal Code</label>
                  <input
                      type="text"
                      id="postal"
                      name="postal"
                      v-model="branch.postal_code"
                      @keypress="isNumber($event)"
                      class="form-control"
                      maxlength="6"
                      required
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name">Address</label>
                  <textarea
                      type="text"
                      rows="3"
                      class="form-control"
                      v-model="branch.address"
                      placeholder="Please input text"
                      required
                  ></textarea>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name">Phone Number</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="branch.phone_number"
                      @keypress="isNumber($event)"
                      minlength="10"
                      maxlength="13"
                      placeholder="Please input number"
                      required
                  />
                </div>
              </div>

              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name">Email</label>
                  <input
                      type="email"
                      class="form-control"
                      required
                      v-model="branch.email"
                      placeholder="Please input text"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name">Contact Person</label>
                  <input
                      type="text"
                      class="form-control"
                      required
                      minlength="5"
                      maxlength="40"
                      v-model="branch.contact_person"
                      placeholder="Please input text"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name">Contact Number</label>
                  <input
                      type="text"
                      class="form-control"
                      required
                      minlength="5"
                      maxlength="13"
                      v-model="branch.contact_number"
                      placeholder="Please input number"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name">Coordinante</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="branch.coordinate"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name"
                  >Status <span class="mandatory">*</span></label
                  >
                  <select
                      class="form-control form-select"
                      id="status"
                      name="status"
                      v-model="branch.active"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="status in status"
                        :key="status.id"
                        :value="status.id"
                    >
                      {{ status.desc }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row text-right mt-3">
              <div class="col-lg-12 d-flex justify-content-end">
                <button class="btn btn-primary">Submit</button>
                <button
                    class="btn btn-primary"
                    @click.prevent="$router.go(-1)"
                    style="margin-left: 10px !important"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import RequestBranch from "../../../payloads/request/RequestBranch";
import BranchService from "../../../services/branch.service";
import CompanyService from "../../../services/companies.service";
import ProvinceService from "../../../services/province.service";
import CitiesService from "../../../services/cities.service";
import DistrictService from "../../../services/district.service";
import VillageService from "../../../services/village.service";
import BusinessService from "../../../services/business.service";
import Utils from "../../../helpers/Utils";
import FormHeader from "../../navigation/FormHeader";
import router from "../../../router";

export default {
  components: {FormHeader},
  data() {
    return {
      branch: new RequestBranch(),
      companies: [],
      provinces: [],
      cities: [],
      districts: [],
      villages: [],
      business: [],
      status: Utils.status(),
    };
  },
  created() {
    this.getCompany();
    this.getProvincies();
    this.getBusiness();
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      BranchService.postCreate(this.branch).then((response) => {
        if (response.code === 200) {
          this.branch = new RequestBranch();
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Branch account has been created",
          });
          router.back();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    getCompany() {
      let loading = this.$loading.show();
      CompanyService.getAll().then((response) => {
        if (response.code === 200) {
          this.companies = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Districts" + response.message, "error");
        }
      });
    },
    getProvincies() {
      let loading = this.$loading.show();
      ProvinceService.getAll().then((response) => {
        if (response.code === 200) {
          this.provinces = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Provincies " + response.message, "error");
        }
      });
    },

    getCities() {
      let loading = this.$loading.show();
      CitiesService.getCityByProvince(this.branch.province_id).then(
          (response) => {
            if (response.code === 200) {
              this.cities = response.data;
              loading.hide();
            } else {
              loading.hide();
              this.$swal.fire("Error!", "Cities" + response.message, "error");
            }
          }
      );
    },
    getDistrict() {
      let loading = this.$loading.show();
      DistrictService.getDistrictByCity(this.branch.city_id).then(
          (response) => {
            if (response.code === 200) {
              this.districts = response.data;
              loading.hide();
            } else {
              loading.hide();
              this.$swal.fire("Error!", "Districts" + response.message, "error");
            }
          }
      );
    },
    getVillage() {
      let loading = this.$loading.show();
      VillageService.getVillageByDistrict(this.branch.district_id).then(
          (response) => {
            if (response.code === 200) {
              this.villages = response.data;
              loading.hide();
            } else {
              loading.hide();
              this.$swal.fire("Error!", "Villages " + response.message, "error");
            }
          }
      );
    },
    getPostalCode() {
      let loading = this.$loading.show();
      VillageService.getShow(this.branch.village_id).then((response) => {
        this.branch.postal_code = response.data.postal_code;
      });
      loading.hide();
    },
    getBusiness() {
      let loading = this.$loading.show();
      BusinessService.getAll().then((response) => {
        if (response.code === 200) {
          this.business = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Business " + response.message, "error");
        }
      });
    },
    isNumber(evt) {
      return Utils.isNumber(evt);
    },
  },
};
</script>
