<template>
  <div class="container-fluid">
    <form-header title="Create Employee" />
    <div class="row">
      <div class="col-lg-12 col-md-8 col-sm-12 col-12">
        <div class="card px-3 py-3 mb-3">
          <form role="form" @submit.prevent="handleSubmit($event)">
            <div class="row">
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="branch"
                    >Branch <span class="mandatory">*</span></label
                  >
                  <select
                    class="form-control form-select"
                    id="branch"
                    name="branch"
                    v-model="employee.branch_id"
                    required
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                      v-for="record in branch"
                      :key="record.id"
                      :value="record.id"
                    >
                      {{ record.branch_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="nik">NIK <span class="mandatory">*</span></label>
                  <input
                    type="text"
                    placeholder="Please input text"
                    id="nik"
                    maxlength="12"
                    name="nik"
                    class="form-control"
                    v-model="employee.NIK"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="name"
                    >First Name <span class="mandatory">*</span></label
                  >
                  <input
                    type="text"
                    placeholder="Please input text"
                    id="firstname"
                    name="firstname"
                    maxlength="40"
                    class="form-control"
                    v-model="employee.first_name"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="name"
                  >Last Name <span class="mandatory">*</span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input text"
                      id="lastname"
                      name="lastname"
                      maxlength="40"
                      class="form-control"
                      v-model="employee.last_name"
                      required
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="name"
                  >Nick Name <span class="mandatory">*</span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input text"
                      id="nickname"
                      name="nickname"
                      maxlength="40"
                      class="form-control"
                      v-model="employee.nick_name"
                      required
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phone"
                  >Phone Number <span class="mandatory">*</span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input number"
                      id="phone"
                      name="phone"
                      @keypress="isNumber($event)"
                      class="form-control"
                      v-model="employee.phone_number"
                      maxlength="20"
                      required
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="birth_date"
                  >Birth Date <span class="mandatory">*</span></label
                  >
                  <input
                      type="date"
                      placeholder="Please input date"
                      id="birth_date"
                      name="birth_place"
                      class="form-control"
                      v-model="employee.birth_date"
                      maxlength="20"
                      required
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="email"
                  >Email <span class="mandatory">*</span></label
                  >
                  <input
                      type="email"
                      placeholder="Please input email"
                      id="email"
                      name="email"
                      class="form-control"
                      v-model="employee.email"
                      maxlength="40"
                      required
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="address"
                  >Address <span class="mandatory">*</span></label
                  >
                  <textarea
                      type="text"
                      placeholder="Please input text"
                      rows="5"
                      id="address"
                      name="address"
                      class="form-control"
                      v-model="employee.address"
                      maxlength="200"
                      required
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="unit"
                  >Unit <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="unit"
                      name="unit"
                      v-model="employee.unit_id"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="units in unit"
                        :key="units.id"
                        :value="units.id"
                    >
                      {{ units.unit_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="unit"
                  >Job Title <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="job_title"
                      name="job_title"
                      v-model="employee.job_title_id"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="job_titles in job_title"
                        :key="job_titles.id"
                        :value="job_titles.id"
                    >
                      {{ job_titles.job_title_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="unit"
                  >Job Position <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="job_position"
                      name="job_position"
                      v-model="employee.job_position_id"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="job_position in job_position"
                        :key="job_position.id"
                        :value="job_position.id"
                    >
                      {{ job_position.job_position_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name"
                  >Employee Status <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="employee_status"
                      name="employee_status"
                      v-model="employee.employee_status"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option value="contract">Contract</option>
                    <option value="permanent">Permanent</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phone"
                  >Other Phone Number <span class="mandatory"></span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input number"
                      id="other_phone_number"
                      name="other_phone_number"
                      @keypress="isNumber($event)"
                      class="form-control"
                      v-model="employee.other_phone_number"
                      maxlength="20"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phone"
                  >Maritial Status <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="maritial_status"
                      name="maritial_status"
                      v-model="employee.maritial_status"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="widower">Widower</option>
                    <option value="divorced">Divorced</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phone"
                  >Identity Type <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="identity_type"
                      name="identity_type"
                      v-model="employee.identity_type"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option value="KTP">KTP</option>
                    <option value="SIM">SIM</option>
                    <option value="PASSPORT">PASSPORT</option>
                    <option value="KTAS">KTAS</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phone"
                  >Identity Number <span class="mandatory"></span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input number"
                      id="identity_number"
                      name="identity_number"
                      @keypress="isNumber($event)"
                      class="form-control"
                      v-model="employee.identity_number"
                      maxlength="20"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phone"
                  >NPWP Number <span class="mandatory"></span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input number"
                      id="npwp_number"
                      name="npwp_number"
                      @keypress="isNumber($event)"
                      class="form-control"
                      v-model="employee.npwp_number"
                      maxlength="20"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phone"
                  >Family Card Number <span class="mandatory"></span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input number"
                      id="family_card_number"
                      name="family_card_number"
                      @keypress="isNumber($event)"
                      class="form-control"
                      v-model="employee.family_card_number"
                      maxlength="20"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phone"
                  >BPJS Number <span class="mandatory"></span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input number"
                      id="bpjs_kesehatan_number"
                      name="bpjs_kesehatan_number"
                      @keypress="isNumber($event)"
                      class="form-control"
                      v-model="employee.bpjs_kesehatan_number"
                      maxlength="20"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phone"
                  >JKN Number <span class="mandatory"></span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input number"
                      id="jkn_number"
                      name="jkn_number"
                      @keypress="isNumber($event)"
                      class="form-control"
                      v-model="employee.jkn_number"
                      maxlength="20"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="phone"
                  >Medical Facility Number <span class="mandatory"></span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input number"
                      id="medical_facility_number"
                      name="medical_facility_number"
                      @keypress="isNumber($event)"
                      class="form-control"
                      v-model="employee.medical_facility_number"
                      maxlength="20"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="name"
                  >Blood Type <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="blood_type"
                      name="blood_type"
                      v-model="employee.blood_type"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option value="O">O</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name"
                  >Gender <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="gender"
                      name="gender"
                      v-model="employee.gender"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Postcode"
                  >Province <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="province"
                      name="province"
                      v-model="employee.province_id"
                      @change="getCities()"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="provinces in province"
                        :key="provinces.id"
                        :value="provinces.id"
                    >
                      {{ provinces.province_name_id }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Postcode"
                  >City <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="city_id"
                      name="city_id"
                      v-model="employee.city_id"
                      @change="getDistrict()"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="items in city"
                        :key="items.id"
                        :value="items.id"
                    >
                      {{ items.city_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Postcode"
                  >District <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="district_id"
                      name="district_id"
                      v-model="employee.district_id"
                      @change="getVillage()"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="itemss in district"
                        :key="itemss.id"
                        :value="itemss.id"
                    >
                      {{ itemss.district_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Postcode"
                  >Village <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="village"
                      name="village"
                      v-model="employee.village_id"
                      @change="getPostalCode()"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="village in village"
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
                  <label for="Postcode"
                  >Postcode <span class="mandatory"></span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input number"
                      @keypress="isNumber($event)"
                      id="Postcode"
                      name="Postcode"
                      class="form-control"
                      v-model="employee.postal_code"
                      maxlength="50"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="name"
                >Education <span class="mandatory"></span></label
                >
                <select
                    class="form-control form-select"
                    id="education"
                    name="education"
                    v-model="employee.education"
                >
                  <option value="null" disabled>Choose...</option>
                  <option
                      v-for="pendidikan in education"
                      :key="pendidikan.id"
                      :value="pendidikan.id"
                  >
                    {{ pendidikan.education_name }}
                  </option>
                </select>
              </div>
            </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="name"
                  >Non Formal Education <span class="mandatory"></span></label
                  >
                  <textarea
                      type="text"
                      placeholder="Please input text"
                      rows="5"
                      id="non_formal_education"
                      name="non_formal_education"
                      class="form-control"
                      v-model="employee.non_formal_education"
                      maxlength="200"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="birth_place"
                    >Birth Place <span class="mandatory"></span></label
                  >
                  <input
                    type="text"
                    placeholder="Please input text"
                    id="birth_place"
                    name="birth_place"
                    class="form-control"
                    v-model="employee.birth_place"
                    maxlength="50"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="birth_date"
                  >Join Date <span class="mandatory"></span></label
                  >
                  <input
                      type="date"
                      placeholder="Please input date"
                      id="join_date"
                      name="birth_place"
                      class="form-control"
                      v-model="employee.join_date"
                      maxlength="20"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="birth_date"
                  >End Contract Date <span class="mandatory"></span></label
                  >
                  <input
                      type="date"
                      placeholder="Please input date"
                      id="end_contract_date"
                      name="end_contract_date"
                      class="form-control"
                      v-model="employee.end_contract_date"
                      maxlength="20"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="name"
                  >
                    Emergency Contact Name <span class="mandatory"></span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input text"
                      id="emergency_contact_person"
                      name="emergency_contact_person"
                      maxlength="40"
                      class="form-control"
                      v-model="employee.emergency_contact_person"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Postcode"
                  >Emergency Contact Number <span class="mandatory"></span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input number"
                      @keypress="isNumber($event)"
                      id="emergency_contact_number"
                      name="emergency_contact_number"
                      class="form-control"
                      v-model="employee.emergency_contact_number"
                      maxlength="50"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Postcode"
                  >Bank <span class="mandatory"></span></label
                  >
                  <select
                      class="form-control form-select"
                      id="bank_id"
                      name="bank_id"
                      v-model="employee.bank_id"
                  >
                    <option value="null" disabled>Choose...</option>
                    <option
                        v-for="banks in bank"
                        :key="banks.id"
                        :value="banks.id"
                    >
                      {{ banks.bank_code }} - {{ banks.bank_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="name"
                  >Account Name <span class="mandatory"></span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input text"
                      id="bank_account"
                      name="bank_account"
                      maxlength="40"
                      class="form-control"
                      v-model="employee.bank_account"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Postcode"
                  >Account Number <span class="mandatory"></span></label
                  >
                  <input
                      type="text"
                      placeholder="Please input number"
                      @keypress="isNumber($event)"
                      id="bank_number"
                      name="bank_number"
                      class="form-control"
                      v-model="employee.bank_number"
                      maxlength="50"
                  />
                </div>
              </div>
              <div class="col-lg-6 mb-3">
                <div class="form-group">
                  <label for="Name"
                    >Status <span class="mandatory"></span></label
                  >
                  <select
                    class="form-control form-select"
                    id="status"
                    name="status"
                    v-model="employee.active"
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
              <div class="col-lg-6 col-md-6 mb-3">
                <div class="form-group">
                  <label for="avatar"
                    >Photo <span class="mandatory"></span></label
                  >
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    @change="onFileChangeAvatar"
                    accept="image/*"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="row text-right mt-3">
              <div class="col-lg-12 d-flex justify-content-end">
                <input type="submit" class="btn btn-primary" value="Submit" />
                <button
                  class="btn btn-primary"
                  @click.prevent="$router.go(-1)"
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
import FormHeader from "../navigation/FormHeader";
import UnitService from "@/services/unit.service";
import JobtitleService from "@/services/jobtitle.service";
import JobpositionService from "@/services/jobposition.service";
import BankService from "@/services/bank.service";
import ProvinceService from "@/services/province.service";
import CitiesService from "@/services/cities.service";
import DistrictService from "@/services/district.service";
import VillageService from "@/services/village.service";
import EducationService from "@/services/education.service";

export default {
  name: "Create",
  components: { FormHeader },
  data() {
    return {
      employee: new RequestEmployee(),
      branch: [],
      unit: [],
      city: [],
      bank: [],
      province: [],
      district: [],
      village: [],
      education: [],
      job_title: [],
      job_position: [],
      status: Utils.status(),
    };
  },
  mounted() {
    this.getBranch();
    this.getUnit();
    this.getJobPosition();
    this.getJobTitle();
    this.getBank();
    this.getProvince();
    this.getEducation();
    this.employee.birth_date = new Date().toISOString().substr(0, 10);
  },
  methods: {
    isNumber(evt) {
      return Utils.isNumber(evt);
    },
    getProvince() {
      let loading = this.$loading.show();
      ProvinceService.getAll().then(response => {
        if (response.code === 200) {
          this.province = response.data;
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
    getCities() {
      let loading = this.$loading.show();
      CitiesService.getCityByProvince(this.employee.province_id).then(response => {
        if (response.code === 200) {
          this.city = response.data;
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
    getDistrict() {
      let loading = this.$loading.show();
      DistrictService.getDistrictByCity(this.employee.city_id).then(response => {
        if (response.code === 200) {
          this.district = response.data;
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
    getVillage() {
      let loading = this.$loading.show();
      VillageService.getVillageByDistrict(this.employee.district_id).then(response => {
        if (response.code === 200) {
          this.village = response.data;
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
    getPostalCode() {
      let loading = this.$loading.show();
      VillageService.getShow(this.employee.village_id).then(response => {
        if (response.code === 200) {
          this.employee.postal_code = response.data.postal_code;
          console.log(this.employee.postal_code)
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
    getEducation() {
      let loading = this.$loading.show();
      EducationService.getAll().then(response => {
        if (response.code === 200) {
          this.education = response.data;
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
    getBank() {
      let loading = this.$loading.show();
      BankService.getAll().then(response => {
        if (response.code === 200) {
          this.bank = response.data;
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
    getBranch() {
      let loading = this.$loading.show();
      BranchService.getAll(this.employee.company_id).then((response) => {
        if (response.code === 200) {
          this.branch = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Business " + response.message, "error");
        }
      });
    },
    getUnit() {
      let loading = this.$loading.show();
      UnitService.getAll(this.employee.company_id).then((response) => {
        if (response.code === 200) {
          this.unit = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Business " + response.message, "error");
        }
      });
    },
    getJobTitle() {
      let loading = this.$loading.show();
      JobtitleService.getAll(this.employee.company_id).then((response) => {
        if (response.code === 200) {
          this.job_title = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Business " + response.message, "error");
        }
      });
    },
    getJobPosition() {
      let loading = this.$loading.show();
      JobpositionService.getAll(this.employee.company_id).then((response) => {
        if (response.code === 200) {
          this.job_position = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Business " + response.message, "error");
        }
      });
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
      EmployeeService.postCreate(this.employee).then((response) => {
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
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
  },
};
</script>
