<template>
  <div class="container-fluid">
    <div class="container-fluid px-3 mt-5">
      <div class="row">
        <div class="col-lg-12 mb-3 px-3">
          <div class="card px-3">
            <form-header title="Profile"></form-header>
            <div class="d-flex flex-row mb-4">
              <img
                  :src="employee.images"
                  class="profile-img"
                  alt="No Image"
                  style="margin-right: 30px !important; margin-left: 20px"
              />
              <div>
                <h6 class="mt-3">
                  {{ employee.NIK }}
                </h6>
                <h6 class="mt-1">
                  {{ employee.first_name + " " + employee.last_name }}
                </h6>
                <h6 class="mt-1">
                  {{ employee.branch_name }}
                </h6>
                <h6 class="mt-1">
                  JG : {{ employee.job_grade }} / PG : {{ employee.personal_grade }}
                </h6>
              </div>
            </div>
            <div class="container-fluid">
              <div class="row mb-4">
                <div class="col-lg-6">
                  <label class="h6">Unit</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="employee.unit_name"
                      disabled
                  />
                </div>
                <div class="col-lg-6">
                  <label class="h6">Job Title</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="employee.job_position_name"
                      disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-responsive">
            <MyDataTable
                title="IPP KPI Core"
                :columns="columns"
                :rows="records"
                :arrow-back="false"
                :clickable="true"
                :sortable="true"
                :paginate="true"
                :rows-per-page="paginate.recordsPerPage"
                :current-page="paginate.currentPage"
                :last-page="paginate.lastPage"
                :default-per-page="paginate.perPage"
                :next-page-url="paginate.nextPageUrl"
                :prev-page-url="paginate.prevPageUrl"
                v-on:onChangeRowPage="handleChangeRecords"
                v-on:onPreviousPage="prevPage"
                v-on:onNextPage="nextPage"
                :searching="true"
                v-on:onChangeSearch="doSearch"
                v-on:onEnterSearch="doSearch"
                v-on:onChangeFilter="doFilterSelected"
                :filterDate="false"
                v-on:onChangeDate="doFilterDate"
                :exportable="true"
                :printable="true"
                :create-button="true"
                v-on:onCreate="handleCreate"
                :refreshable="true"
                v-on:onRefresh="doRefresh"
                :loadingAnimation="false"
            >
              <th
                  id="delete"
                  slot="thead-tr"
                  class="text-center tbl-action-button"
              >
                Actions
              </th>
              <template slot="tbody-tr" slot-scope="props">
                <td class="text-center">
                  <button
                      class="btn btn-flat nopadding"
                      @click="(e) => handleUpdate(props.row, e)"
                  >
                    <i class="material-icons white-text">edit</i>
                  </button>
                  <button
                      class="btn btn-flat nopadding"
                      @click="(e) => handleDelete(props.row, e)"
                  >
                    <i class="material-icons white-text">delete</i>
                  </button>
                </td>
              </template>
            </MyDataTable>
            <table class="table">
              <tbody>
              <th colspan="1" style="float: right;">Total Weight :</th>
              <th>{{ weight }}</th>
              </tbody>
          </table>
        </div>
        <b-modal
            id="m-egs"
            :title="isUpdate ? 'Update IPP' : 'Create IPP'"
            hide-footer
        >
          <form @submit.prevent="submit($event)">
            <div class="col-lg-12 text-left">
              <label for="exampleFormControlSelect1">KPI</label>
              <select class="form-control" v-model="egs.kpi_id" required>
                <option value="null" disabled>Choose...</option>
                <option v-for="item in items" :key="item.id" :value="item.id">
                  {{ item.kpi_name }}
                </option>
              </select>
            </div>
            <div class="col-lg-12 mt-3 text-left">
              <label for="exampleFormControlSelect1">Measurement</label>
              <textarea
                  cols="3"
                  class="form-control"
                  placeholder="Please input text"
                  v-model="egs.measurement"
                  required
              />
            </div>
            <div class="col-lg-12 mt-3 text-left">
              <label for="exampleFormControlSelect1">Target Type</label>
              <select
                  class="form-control form-select"
                  id="exampleFormControlSelect1"
                  v-model="egs.target_type_id"
                  required
              >
                <option value="null" disabled>Choose...</option>
                <option v-for="targets in target" :key="targets.id" :value="targets.id">
                  {{ targets.target_type_name }}
                </option>
              </select>
            </div>
            <div class="form-group mt-3">
              <label>Target</label>
              <input
                  type="text"
                  class="form-control"
                  placeholder="Please input text"
                  v-model="egs.target"
                  required
              />
            </div>
            <div class="form-group mt-3">
              <label>Weight</label>
              <input
                  type="number"
                  maxlength="3"
                  minlength="1"
                  min=1
                  max=100
                  class="form-control"
                  placeholder="Please input text"
                  v-model="egs.weight"
                  required
              />
            </div>

            <div class="d-flex mt-4 float-end">
              <button
                  class="btn btn-primary"
                  style="margin-right: 5px"
                  @click.prevent="doClose"
              >
                Cancel
              </button>
              <input type="submit" class="btn btn-primary" value="Submit"/>
            </div>
          </form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import KpiService from "../../services/kpidirectories.service";
import MeasurementService from "../../services/measurement.service";
import TargetTypeService from "../../services/targettype.service";
import EgsDetailService from "../../services/egs-detail.service";
import MyDataTable from "../hyver-vue/components/DataTable";
import Utils from "../../helpers/Utils";
import utils from "../../helpers/Utils";
import RequestEgs from "../../payloads/request/EGS";
import EmployeeService from "../../services/employee.service";
import FormHeader from "../navigation/FormHeader";

export default {
  name: "Index",
  components: {
    FormHeader,
    MyDataTable,
  },
  data() {
    return {
      egs: new RequestEgs(),
      searchBy: "id",
      searchParam: "",
      dateFrom: "",
      dateTo: "",
      status: Utils.status(),
      columns: [
        {
          label: "KPI",
          field: "kpi_name",
          numeric: false,
          html: false,
        },
        {
          label: "Measurement",
          field: "measurement",
          numeric: false,
          html: false,
        },
        {
          label: "Target Type",
          field: "target_type_name",
          numeric: false,
          html: false,
        },
        {
          label: "target",
          field: "target",
          numeric: false,
          html: false,
        },
        {
          label: "weight",
          field: "weight",
          numeric: true,
          html: false,
        },
        {
          label: "KPI Result",
          field: "kpi_result",
          numeric: false,
          html: false,
        },
        {
          label: "ID",
          field: "id",
          numeric: true,
          html: false,
          hidden: true
        },
      ],
      records: [],
      pagination: {
        recordsPerPage: [5, 10, 50, 100, 500, 1000],
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: "",
        prevPageUrl: "",
      },
      isUpdate: false,
      items: "",
      means: "",
      target: [],
      employee: {
        images: "",
        unit_name: "",
        job_title_name: "",
        first_name: "",
        last_name: "",
        NIK: "",
        job_grade: "",
        personal_grade: ""
      },
      weight: 0
    };
  },
  computed: {
    paginate() {
      return this.pagination;
    }
  },
  mounted() {
    this.getEmployee();
    this.getPaginate(
        this.dateFrom,
        this.dateTo,
        this.searchBy,
        this.searchParam,
        this.pagination.perPage,
        this.pagination.currentPage
    );
    this.changeKPI();
    this.changeMeasurement();
    this.getTarget();
  },
  methods: {
    getEmployee() {
      let loading = this.$loading.show();
      EmployeeService.getShow(utils.decrypt(this.$route.query.employee_id)).then(
          (response) => {
            if (response.code === 200) {
              this.employee = response.data;
              loading.hide();
            } else {
              loading.hide();
              this.$swal.fire("Error!", "Employee " + response.message, "error");
            }
          }
      );
    },
    changeKPI() {
      KpiService.getAll().then((response) => {
        this.items = response.data;
      });
    },
    getTarget() {
      TargetTypeService.getAll().then((response) => {
        this.target = response.data;
      });
    },
    changeMeasurement() {
      MeasurementService.getUnit(this.employee.unit_id).then((response) => {
        this.means = response.data;
      });
    },
    doClose() {
      this.$bvModal.hide("m-egs");
      this.doRefresh();
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      if (!this.isUpdate) {
        this.egs.egs_id = utils.decrypt(this.$route.query.id);
        this.egs.head_id = this.$route.query.head_id;
        this.egs.reviewer_id = this.$route.query.reviewer_id;
        EgsDetailService.postCreate(this.egs).then((response) => {
          if (response.code === 200) {
            this.egs = new RequestEgs();
            this.doRefresh();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "IPP has been created",
            });
            this.$bvModal.hide("m-egs");
          } else {
            loading.hide();
            this.$bvModal.hide("m-egs");
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      } else {
        EgsDetailService.postUpdate(this.egs.id, this.egs).then((response) => {
          if (response.code === 200) {
            this.egs = new RequestEgs();
            this.doRefresh();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "IPP has been updated",
            });
            this.doRefresh();
            this.$bvModal.hide("m-egs");
          } else {
            loading.hide();
            this.$bvModal.hide("m-egs");
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      }
    },
    doRefresh() {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          this.pagination.perPage,
          this.pagination.currentPage
      );
    },
    handleCreate() {
      this.egs = new RequestEgs();
      this.isUpdate = false;
      this.$bvModal.show("m-egs");
    },
    handleUpdate(prop) {
      this.isUpdate = true;
      this.egs = prop;
      this.$bvModal.show("m-egs");
    },
    handleDelete(prop) {
      this.$swal({
        title: "Delete",
        text: "Are you sure ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        timer: 8200,
      }).then((result) => {
        if (result.value) {
          // <-- if confirmed
          EgsDetailService.delete(prop.id)
              .then(() => {
                this.$swal({
                  position: "bottom-end",
                  toast: true,
                  timer: 3000,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  icon: "success",
                  title: "Success",
                  text: "Record has been deleted",
                });
                this.doRefresh();
              })
              .catch((error) => {
                console.log("Error!", error.response);
              });
        }
      });
    },
    doFilterSelected(pagination) {
      this.searchBy = pagination[0];
      if (this.searchBy === "All") {
        this.searchBy = "id";
        this.searchParam = "";
        this.getPaginate(
            this.dateFrom,
            this.dateTo,
            this.searchBy,
            this.searchParam,
            pagination[1],
            pagination[2]
        );
      }
    },
    doFilterDate(selectedDate) {
      this.dateFrom = selectedDate[0];
      this.dateFrom = selectedDate[1];
    },
    doSearch(props) {
      this.searchParam = props[0];
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          props[0],
          props[1],
          props[2]
      );
    },
    getPaginate(dateFrom, dateTo, searchBy, searchParam, limit, page) {
      let params = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        searchBy: searchBy,
        searchParam: searchParam,
        limit: limit,
        page: page,
        egs_id: utils.decrypt(this.$route.query.id),
      };
      let loading = this.$loading.show();
      EgsDetailService.getPaginate(params).then((response) => {
        if (response.code === 200) {
          this.records = response.data.data;
          this.pagination = {
            currentPage: response.data.current_page,
            perPage: response.data.per_page,
            lastPage: response.data.last_page,
            prevPageUrl: response.data.prev_page_url,
            nextPageUrl: response.data.next_page_url,
          };

          //count weight
          this.weight = 0;
          for (let record in this.records) {
            this.weight = parseInt(this.weight) + parseInt(this.records[record].weight);
          }

          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    //Prev Pagination
    prevPage(limit) {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          limit[0],
          limit[1]
      );
    },
    //Next Pagination
    nextPage(limit) {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          limit[0],
          limit[1]
      );
    },

    //Search Record
    handleSearch(limit) {
      this.getPaginate(this.searchBy, this.searchParam, limit[0], limit[1]);
    },

    handleChangeRecords(limit) {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          limit[0],
          limit[1]
      );
    },
  },
};
</script>

<style scoped></style>
