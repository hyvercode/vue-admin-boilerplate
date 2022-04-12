<template>
  <div class="container-fluid">
    <MyDataTable
        title="Performance"
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
  </div>
</template>

<script>
import PerformanceService from "../../services/performance.service";
import MyDataTable from "../mih/components/DataTable";
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
      periode: "",
      status: Utils.status(),
      columns: [
        {
          label: "ID",
          field: "id",
          numeric: false,
          html: false,
          hidden: true
        },
        {
          label: "EGS Periode",
          field: "egs_periode",
          numeric: true,
          html: false,
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
          label: "Head ID",
          field: "head_id",
          numeric: true,
          html: false,
          hidden: true,
        },
        {
          label: "Head",
          field: "head_name",
          numeric: false,
          html: false,
        },

        {
          label: "Reviewer",
          field: "reviewer_id",
          numeric: true,
          html: false,
          hidden: true
        },
        {
          label: "Reviewer",
          field: "reviewer_name",
          numeric: false,
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
          field: "reviewer_status",
          numeric: true,
          html: false,
        },
        {
          label: "Total KPI",
          field: "total_kpi_result",
          numeric: true,
          html: false,
        },
        {
          label: "Status",
          field: "status",
          numeric: true,
          html: false,
          badge: true
        },
      ],
      records: [],
      isReviewer: false,
      isHead: false,
      filterRecord: [
        {id: "id", desc: "Job Title ID"},
        {id: "job_title_name", desc: "Job Title Name"},
        {id: "active", desc: "Active"},
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
    this.month = new Date().toISOString().substr(0, 10);
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
        path: Pages.PERFORMANCE_APPRAISAL,
        query: {
          isReviewer: this.isReviewer,
          isHead: this.isHead,
          id: Utils.encrypt(prop.id),
          head_id: prop.head_id,
          reviewer_id: prop.reviewer_id,
          employee_id: Utils.encrypt(prop.employee_id),
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
      this.$bvModal.hide("m-jobtitle");
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();

      if (!this.isUpdate) {
        let params = {
          periode: this.periode,
        };
        PerformanceService.postCreate(params).then((response) => {
          if (response.code === 200) {
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Egs has been created",
            });
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
        PerformanceService.postUpdate(params).then((response) => {
          if (response.code === 200) {
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Job Title  has been updated",
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
          PerformanceService.delete(prop.id)
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
      PerformanceService.getPaginate(params).then((response) => {
        if (response.code === 200) {
          this.records = response.data.records.data;
          this.isReviewer = response.data.isReviewer;
          this.isHead = response.data.isHead;
          this.pagination = {
            currentPage: response.data.records.current_page,
            perPage: response.data.records.per_page,
            lastPage: response.data.records.last_page,
            prevPageUrl: response.data.records.prev_page_url,
            nextPageUrl: response.data.records.next_page_url,
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
