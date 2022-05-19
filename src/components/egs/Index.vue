<template>
  <div class="container-fluid">
    <MyDataTable
        title="IPP (Individual Performance Plan)"
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
        :create-button="true"
        v-on:onCreate="handleCreate"
        :refreshable="true"
        v-on:onRefresh="doRefresh"
        :loadingAnimation="false"
        :filter-month="true"
        v-on:onChangeMonth="doChangeMonth"
        v-on:onRowClick="onRowClick"
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
              v-show="!props.row.self_status"
              class="btn btn-primary nopadding"
              @click="(e) => onRowClick(props.row, e)"
          >
            Input
          </button>
          <button
              v-show="props.row.self_status"
              class="btn btn-success nopadding text-white"
          >
            Done
          </button>
        </td>
      </template>
    </MyDataTable>
    <b-modal
        id="m-jobtitle"
        :title="isUpdate ? 'Update IPP' : 'Create IPP'"
        hide-footer
    >
      <form @submit.prevent="submit($event)">
        <div class="col-lg-12 mb-3">
          <label for="date" style="text-align: left">Periode</label>
          <input type="date" placeholder="dd-mm-yyyy" id="date" class="form-control" v-model="periode"/>
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
</template>

<script>
import EgsService from "../../services/egs.service";
import MyDataTable from "../hyver-vue/components/DataTable";
import Utils from "../../helpers/Utils";
import router from "../../router";
import Pages from "../../helpers/PerformanceManagement";

export default {
  name: "Index",
  components: {
    MyDataTable,
  },
  data() {
    return {
      searchBy: "id",
      searchParam: "",
      dateFrom: "",
      dateTo: "",
      month: "",
      periode: new Date().toISOString().substr(0, 10),
      status: Utils.status(),
      columns: [
        {
          label: "IPP Periode",
          field: "egs_periode",
          numeric: false,
          html: false
        },
        {
          label: "Employee ID",
          field: "employee_id",
          numeric: true,
          html: false,
          hidden: true
        },
        {
          label: "NIK",
          field: "NIK",
          numeric: true,
          html: false,
        },
        {
          label: "Name",
          field: "first_employee_name",
          numeric: true,
          html: false,
          concat: true,
          concatWith: "last_employee_name",
        },
        {
          label: "Unit",
          field: "unit_name",
          numeric: true,
          html: false,
        },
        {
          label: "PR",
          field: "head_status",
          numeric: true,
          html: false,
        },
        {
          label: "PA",
          field: "reviewer_notes",
          numeric: true,
          html: false,
        },
        {
          label: "Weight",
          field: "total_weight",
          numeric: true,
          html: false,
          badge: true
        },
        {
          label: "ID",
          field: "id",
          numeric: false,
          html: false,
          hidden: true
        },
        {
          label: "Head ID",
          field: "head_id",
          numeric: false,
          hidden: true
        },
        {
          label: "Reviewer",
          field: "reviewer_id",
          numeric: false,
          hidden: true
        },
      ],
      records: [],
      filterRecord: [
        {id: "id", desc: "IPP ID"},
        {id: "employees.NIK", desc: "NIK"},
        {id: "employees.first_name", desc: "Employee Name"},
        {id: "units.unit_name", desc: "Unit"},
        {id: "job_titles.job_title_name", desc: "Job Title"},
        {id: "job_positions.job_position_name", desc: "Job Position"},
        {id: "egs_headers.active", desc: "Active =1, Inactive =0"},
      ],
      pagination: {
        recordsPerPage: [5, 10, 50, 100, 500, 1000],
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: "",
        prevPageUrl: "",
        total: 0
      },
      isUpdate: false,
    };
  },
  computed: {
    paginate() {
      return this.pagination;
    },
  },
  mounted() {
    this.month = new Date();
    this.getPaginate(
        this.dateFrom,
        this.dateTo,
        this.searchBy,
        this.searchParam,
        this.pagination.perPage,
        this.pagination.currentPage,
        this.month
    );
  },
  methods: {
    async onRowClick(prop) {
      await router.push({
        path: Pages.EGS_DETAIL,
        query: {
          id: Utils.encrypt(prop.id),
          head_id: prop.head_id,
          reviewer_id: prop.reviewer_id,
          employee_id: Utils.encrypt(prop.employee_id)
        },
      });
    },
    doChangeMonth(month) {
      this.month = month;
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          this.pagination.perPage,
          this.pagination.currentPage,
          this.month
      );
    },
    doClose() {
      this.doRefresh();
      this.$bvModal.hide("m-jobtitle");
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      if (!this.isUpdate) {
        let params = {
          periode: this.periode,
        };
        EgsService.postCreate(params).then((response) => {
          if (response.code === 200) {
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "IPP has been created",
            });
            this.month = this.periode;
            this.doRefresh();
            this.$bvModal.hide("m-jobtitle");
          } else {
            loading.hide();
            this.$bvModal.hide("m-jobtitle");
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      } else {
        let params = {
          periode: this.params,
        };
        EgsService.postUpdate(params).then((response) => {
          if (response.code === 200) {
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "IPP  has been updated",
            });
            this.doRefresh();
            this.$bvModal.hide("m-jobtitle");
          } else {
            loading.hide();
            this.$bvModal.hide("m-jobtitle");
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
          this.pagination.currentPage,
          this.month
      );
    },

    handleCreate() {
      this.isUpdate = false;
      this.$bvModal.show("m-jobtitle");
    },

    handleUpdate(prop) {
      this.isUpdate = true;
      this.jobtitle = prop;
      this.$bvModal.show("m-jobtitle");
    },

    handleDelete(prop) {
      this.$swal({
        title: "Hapus data ini?",
        text: "Data ini akan terhapus selamanya",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        timer: 8200,
      }).then((result) => {
        if (result.value) {
          // <-- if confirmed
          EgsService.delete(prop.id)
              .then(() => {
                this.$swal({
                  position: "bottom-end",
                  toast: true,
                  timer: 3000,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  icon: "success",
                  title: "Success",
                  text: "Hapus Berhasil",
                });
                this.doRefresh();
              })
              .catch((error) => {
                console.log("Gagal Terhapus", error.response);
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
            pagination[2],
            this.month
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
          props[2],
          this.month
      );
    },
    getPaginate(dateFrom, dateTo, searchBy, searchParam, limit, page, month) {
      let params = {
        periode: month,
        dateFrom: dateFrom,
        dateTo: dateTo,
        searchBy: searchBy,
        searchParam: searchParam,
        limit: limit,
        page: page,
      };
      let loading = this.$loading.show();
      EgsService.getPaginate(params).then((response) => {
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
          limit[1],
          this.month
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
          limit[1],
          this.month
      );
    },

    //Search Record
    handleSearch(limit) {
      this.getPaginate(
          this.searchBy,
          this.searchParam,
          limit[0],
          limit[1],
          this.month
      );
    },

    handleChangeRecords(limit) {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          limit[0],
          limit[1],
          this.month
      );
    },
  },
};
</script>

<style scoped></style>
