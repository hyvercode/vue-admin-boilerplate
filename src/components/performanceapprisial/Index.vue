<template>
  <div class="container-fluid">
    <div class="container-fluid px-3 mt-5">
      <div class="row">
        <div class="col-lg-12 mb-3 px-3">
          <div class="card px-3">
            <form-header title="Performance Appraisal"></form-header>
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
                <td class="text-center" v-if="isReviewer ==='true'">
                  <!-- -->
                  <button
                      v-if="props.row.reviewer_status !=='DONE'"
                      class="btn btn-primary nopadding"
                      @click="(e) => handleInput(props.row, e)"
                  >
                    Input
                  </button>
                  <button v-else class="btn btn-success text-white">
                    Done
                  </button>
                </td>
                <td class="text-center" v-if="isHead ==='true'">
                  <!-- -->
                  <button
                      v-if="props.row.head_status !=='DONE'"
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
        <div class="container">
          <div class="card">
            <div class="row">
              <form @submit.prevent="handleSubmit()">
                <div class="col-lg-12 p-5">
                  <div class="form-group">
                    <label>Notes</label>
                    <textarea
                        :readonly="egsHeader.head_status !=='DONE' || egsHeader.reviewer_status !=='DONE'"
                        cols="3"
                        class="form-control"
                        v-model="egsHeader.notes"
                    />
                  </div>
                </div>
                <div class="col-lg-12 d-flex justify-content-end px-2 py-2"
                     v-if="egsHeader.head_status !=='DONE' || egsHeader.reviewer_status !=='DONE'">
                  <button class="btn btn-outline-info mx-2" type="button" @click.prevent="$router.go(-1)">
                    Draf
                  </button>
                  <button class="btn btn-primary" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <b-modal v-show="isHead" id="head" title="Head Input KPI" hide-footer>
      <form @submit.prevent="submit($event)">
        <div v-if="isHead">
          <div class="form-group">
            <label>Head KPI Point</label>
            <input
                type="number"
                class="form-control"
                v-model="performanceapprasial.head_kpi_point"
                placeholder="Max KPI Point 5"
                min="0"
                max="5"
            />
          </div>
          <div class="form-group mt-2">
            <label>Head Achievement</label>
            <textarea
                cols="3"
                class="form-control"
                v-model="performanceapprasial.head_achievement"
            />
          </div>
          <div class="form-group mt-2">
            <label>Head Evaluation</label>
            <textarea
                cols="3"
                class="form-control"
                v-model="performanceapprasial.head_evaluation"
            />
          </div>
          <div class="form-group mt-2">
            <label>Head Notes</label>
            <textarea
                cols="3"
                class="form-control"
                v-model="performanceapprasial.head_notes"
            />
          </div>
        </div>
        <div
            class="form-group mt-3 d-flex justify-content-end"
            v-if="isReviewer && egsHeader.status !=='FIN' || isHead && egsHeader.status !=='APP'"
        >
          <button class="btn btn-danger mx-2" @click.prevent="close">
            cancel
          </button>
          <button class="btn btn-primary" type="button" @click.prevent="submit">
            submit
          </button>
        </div>
      </form>
    </b-modal>

    <b-modal v-show="isReviewer" id="reviewer" title="Reviewer Input KPI" hide-footer>
      <form @submit.prevent="submit($event)">
        <!-- Reviewer -->
        <div v-if="isReviewer">
          <div class="form-group">
            <label>Reviewer kpi point</label>
            <input
                type="number"
                class="form-control"
                v-model="performanceapprasial.reviewer_kpi_point"
                placeholder="Max KPI Point 5"
                min="0"
                max="5"
                required
            />
          </div>
          <div class="form-group">
            <label>Reviewer Achievement</label>
            <textarea
                cols="3"
                class="form-control"
                v-model="performanceapprasial.reviewer_achievement"
                required
            />
          </div>
          <div class="form-group mt-2">
            <label>Reviewer Evaluation</label>
            <textarea
                cols="3"
                class="form-control"
                v-model="performanceapprasial.reviewer_evaluation"
            />
          </div>
          <div class="form-group mt-2">
            <label>Reviewer Notes</label>
            <textarea
                cols="3"
                class="form-control"
                v-model="performanceapprasial.reviewer_notes"
            />
          </div>
        </div>
        <div
            class="form-group mt-3 d-flex justify-content-end"
            v-if="isReviewer && egsHeader.status !=='FIN' || isHead && egsHeader.status !=='APP'"
        >
          <button class="btn btn-danger mx-2" @click.prevent="close">
            cancel
          </button>
          <button class="btn btn-primary" type="button" @click.prevent="submit">
            submit
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import PerformanceReviewService from "../../services/performanceapprasial.service";
import RequestPerformanceApprasial from "../../payloads/request/RequestPerformanceApprasial.js";
import MyDataTable from "../mih/components/DataTable";
import Utils from "../../helpers/Utils";
import RequestEgs from "../../payloads/request/EGS";
import EmployeeService from "../../services/employee.service";
import FormHeader from "../navigation/FormHeader.vue";
import utils from "../../helpers/Utils";
import EgsService from "../../services/egs.service";

export default {
  name: "Index",
  components: {
    MyDataTable,
    FormHeader,
  },
  data() {
    return {
      performanceapprasial: new RequestPerformanceApprasial(),
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
          label: "Target Type Name",
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
        {
          label: "Head Achievement",
          field: "head_achievement",
          numeric: false,
          html: false,
        },
        {
          label: "Head KPI Point",
          field: "head_kpi_point",
          numeric: false,
          html: false,
        },
        {
          label: "Head Notes",
          field: "head_notes",
          numeric: false,
          html: false,
        },
        {
          label: "Reviewer Achievement",
          field: "reviewer_achievement",
          numeric: false,
          html: false,
        },
        {
          label: "Reviewr KPI Point",
          field: "reviewer_kpi_point",
          numeric: false,
          html: false,
        },
        {
          label: "Reviewer Notes",
          field: "reviewer_notes",
          numeric: false,
          html: false,
        },
      ],
      placements: ["top"],
      records: [],
      filterRecord: [
        {id: "id", desc: "Performance Aprraisal ID"}
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
      isReviewer: false,
      isHead: false,
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
      },
      egsHeader: {
        id: null,
        status: null,
        head_status: null,
        reviewer_status: null,
        notes: null
      }
    };
  },
  computed: {
    paginate() {
      return this.pagination;
    },
  },
  mounted() {
    this.getEgs();
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
    this.isHead = this.$route.query.isHead;
    this.isReviewer = this.$route.query.isReviewer;
  },
  methods: {
    close() {
      this.doRefresh();
      this.isHead === 'true' ? this.$bvModal.hide("head") : this.$bvModal.hide("reviewer");
    },

    handleSubmit() {
      let payload = {
        notes: this.egsHeader.notes
      }
      PerformanceReviewService.postSubmit(utils.decrypt(this.$route.query.id), payload).then((response) => {
        this.performanceapprasial = new RequestPerformanceApprasial();
        this.response = response.data;
        this.doRefresh();
      }).catch((error, response) => {
        this.doRefresh();
        this.error = error.data;
        this.$swal.fire("Error!", response.message, "error");
      });
    },

    handleInput(prop) {
      (this.performanceapprasial = prop), this.isHead === 'true' ? this.$bvModal.show("head") : this.$bvModal.show("reviewer");
    },

    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      PerformanceReviewService.postUpdate(
          this.performanceapprasial.id,
          this.performanceapprasial
      ).then((response) => {
        if (response.code === 200) {
          this.performanceapprasial = new RequestPerformanceApprasial();
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Performance has been Updated",
          });
          this.doRefresh();
          this.close();
        } else {
          this.doRefresh();
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },

    getEmployee() {
      let loading = this.$loading.show();
      EmployeeService.getShow(Utils.decrypt(this.$route.query.employee_id)).then((response) => {
        if (response.code === 200) {
          this.employee = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Employee" + response.message, "error");
        }
      });
    },
    getEgs() {
      let loading = this.$loading.show();
      EgsService.getShow(Utils.decrypt(this.$route.query.id)).then((response) => {
        if (response.code === 200) {
          this.egsHeader = response.data;
          this.egsHeader.notes = this.isReviewer === 'true' ? response.data.reviewer_notes : response.data.head_notes;
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
        egs_id: utils.decrypt(this.$route.query.id),
        head_id: this.$route.query.head_id,
        reviewer_id: this.$route.query.reviewer_id,
        employee_id: utils.decrypt(this.$route.query.employee_id),
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
