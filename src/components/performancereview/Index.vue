<template>
  <div class="container-fluid">
    <div class="container-fluid px-3 mt-5">
      <div class="row">
        <div class="col-lg-12 mb-3 px-3">
          <div class="card px-3">
            <form-header title="Performance Review"></form-header>
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
                title="KPI Core"
                :arrow-back="false"
                :title-show="true"
                :columns="columns"
                :rows="records"
                :clickable="true"
                :sortable="true"
                :paginate="true"
                :total-records="paginate.total"
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
                :filter="true"
                :filterRecord="filterRecord"
                v-on:onChangeFilter="doFilterSelected"
                :filterDate="false"
                v-on:onChangeDate="doFilterDate"
                :exportable="true"
                :printable="true"
                :create-button="false"
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
                      v-if="
                      props.row.self_status === 'NEW' ||
                      props.row.self_status === 'DRAFT'
                    "
                      class="btn btn-primary nopadding"
                      @click="(e) => handleInput(props.row, e)"
                  >
                    Input
                  </button>
                  <button v-else class="btn btn-success text-white">
                    Done
                  </button>
                </td>
              </template>
            </MyDataTable>
        </div>
        <div class="container" v-if="records.length >0">
          <div class="card">
            <div class="col-lg-12 d-flex justify-content-end px-2 py-2">
              <button class="btn btn-outline-info mx-2">Draf</button>
              <button class="btn btn-primary" @click.prevent="handleSubmit()">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <b-modal id="modal-1" title="Input KPI" hide-footer>
      <form @submit.prevent="submit($event)">
        <div class="form-group">
          <label>Achievement</label>
          <textarea
              cols="3"
              class="form-control"
              v-model="performancereview.self_achievement"
          />
        </div>
        <div class="form-group mt-2">
          <label>KPI Point</label>
          <input
              type="number"
              class="form-control"
              placeholder="Max KPI Point 5"
              v-model="performancereview.self_kpi_point"
              min="1"
              max="5"
          />
        </div>
        <div class="form-group mt-2">
          <label>Selft Evaluation</label>
          <textarea
              cols="3"
              class="form-control"
              v-model="performancereview.self_evaluation"
          />
        </div>
        <div class="form-group mt-2">
          <label>Notes</label>
          <textarea
              cols="3"
              class="form-control"
              v-model="performancereview.self_notes"
          />
        </div>
        <div
            class="form-group mt-3 d-flex justify-content-end"
            v-if="records.length > 0 && records[0].self_status !== 'DONE'"
        >
          <button class="btn btn-primary mx-2" @click.prevent="close">
            Cancel
          </button>
          <button class="btn btn-primary" type="button" @click.prevent="submit">
            Submit
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import PerformanceReviewService from "../../services/performancereview.service";
import RequestPerformanceReview from "../../payloads/request/RequestPerformanceReview.js";
import MyDataTable from "../mih/components/DataTable";
import Utils from "../../helpers/Utils";
import RequestEgs from "../../payloads/request/EGS";
import EmployeeService from "../../services/employee.service";
import VueCookies from "vue-cookies";
import FormHeader from "../navigation/FormHeader.vue";

export default {
  name: "Index",
  components: {
    MyDataTable,
    FormHeader,
  },
  data() {
    return {
      performancereview: new RequestPerformanceReview(),
      egs: new RequestEgs(),
      user: null,
      searchBy: "id",
      searchParam: "",
      dateFrom: "",
      dateTo: "",
      status: Utils.status(),
      columns: [
        {
          label: "ID",
          field: "id",
          numeric: true,
          html: false,
          hidden:true
        },
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
          label: "Target Types Name",
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
          label: "Achievement",
          field: "self_achievement",
          numeric: false,
          html: false,
        },
        {
          label: "KPI Poin 1-5",
          field: "self_kpi_point",
          numeric: false,
          html: false,
        },
        {
          label: "Self Notes",
          field: "self_notes",
          numeric: false,
          html: false,
        },
      ],
      placements: ["top"],
      records: [],
      filterRecord: [
        {id: "id", desc: "IPP ID"},
        {id: "egs_periode", desc: "IPP Periode (YYYY-MM-DD)"},
        {id: "self_status", desc: "Status"},
      ],
      pagination: {
        recordsPerPage: [5, 10, 50, 100, 500, 1000],
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: "",
        prevPageUrl: "",
        total:0
      },
      isUpdate: false,
      items: "",
      means: "",
      employee: {
        images: "",
        unit_name: "",
        job_title_name: "",
        first_name: "",
        last_name: "",
        NIK: "",
        job_grade:"",
        personal_grade:""
      }
    };
  },
  computed: {
    profile() {
      return this.$store.state.user.data.profile === undefined
          ? "Logtify"
          : this.$store.state.user.data.profile.company_name;
    },
    paginate() {
      return this.pagination;
    },
  },
  mounted() {
    this.getProfile();
    this.getEmployee();
    this.getPaginate(
        this.dateFrom,
        this.dateTo,
        this.searchBy,
        this.searchParam,
        this.pagination.perPage,
        this.pagination.currentPage
    );
  },
  created() {
    this.getProfile();
    this.user = Utils.jwtDecode(
        JSON.parse(JSON.stringify(VueCookies.get("__MIH__BASE__SESSIONID__")))
            .access_token
    );
  },
  methods: {
    close() {
      this.doRefresh();
      this.$bvModal.hide("modal-1");
    },
    handleSubmit() {
      PerformanceReviewService.postSubmit(this.records[0].egs_id)
          .then((response) => {
            this.response = response.data;
            this.doRefresh();
          })
          .catch((error, response) => {
            this.error = error.data;
            this.$swal.fire("Error!", response.message, "error");
          });
    },
    handleInput(prop) {
      (this.performancereview = prop), this.$bvModal.show("modal-1");
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      PerformanceReviewService.postUpdate(
          this.performancereview.id,
          this.performancereview
      ).then((response) => {
        if (response.code === 200) {
          this.performancereview = new RequestPerformanceReview();
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Performance has been Updated",
          });
          this.doRefresh();
          this.$bvModal.hide("modal-1");
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },

    handleCreate() {
    },
    getProfile() {
      let loading = this.$loading.show();
      this.$store.dispatch("user/getProfile").then(() => {
        setInterval(function () {
          loading.hide();
        }, 100);
      });
    },
    getEmployee() {
      let loading = this.$loading.show();
      EmployeeService.getShow(this.user.employee_id).then((response) => {
        if (response.code === 200) {
          this.employee = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Employee" + response.message, "error");
        }
      });
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
        // egs_id: utils.decrypt(this.$route.query.id),
      };
      let loading = this.$loading.show();
      PerformanceReviewService.getPaginate(params).then((response) => {
        if (response.code === 200) {
          this.records = response.data.data;
          this.pagination = {
            currentPage: response.data.current_page,
            perPage: response.data.per_page,
            lastPage: response.data.last_page,
            prevPageUrl: response.data.prev_page_url,
            nextPageUrl: response.data.next_page_url,
            total: response.data.total
          };
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
