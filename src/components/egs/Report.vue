<template>
  <div class="container-fluid">
    <MyDataTable
        title="Reports"
        :columns="columns"
        :rows="records"
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
    >
    </MyDataTable>

    <b-modal
        id="m-jobtitle"
        :title="isUpdate ? 'Update EGS' : 'Create Egs'"
        hide-footer
    >
      <form @submit.prevent="submit($event)">
        <div class="col-lg-12 mb-3">
          <label for="NIK" style="text-align: left">periode</label>
          <input type="date" class="form-control" v-model="periode"/>
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
      status: Utils.status(),
      columns: [
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
        },
        {
          label: "Position",
          field: "job_position_name",
          numeric: false,
          html: false,
        },
        {
          label: "Staging Approval 1",
          field: "staging_approval_1",
          numeric: false,
          html: false,
        },
        {
          label: "Staging Approval 2",
          field: "staging_approval_2",
          numeric: false,
          html: false,
        },
        {
          label: "Status",
          field: "status",
          numeric: false,
          html: false,
        },
        {
          label: "ID",
          field: "id",
          numeric: false,
          html: false,
          hidden: true
        },
      ],
      records: [],
      filterRecord: [
        {id: "id", desc: "IPP ID"},
        {id: "employees.first_name", desc: "Employee Name"},
        {id: "units.unit_name", desc: "Unit"},
        {id: "job_titles.job_title_name", desc: "Job Title"}
      ],
      pagination: {
        recordsPerPage: [5, 10, 50, 100, 500, 1000],
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: "",
        prevPageUrl: "",
      }
    };
  },
  computed: {
    paginate() {
      return this.pagination;
    },
  },
  mounted() {
    this.doChangeMonth();
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

    doFilterSelected(pagination) {
      this.searchBy = pagination[0];
      if (this.searchBy === "All") {
        this.searchBy = "egs_headers.id";
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
      EgsService.getPaginateReports(params).then((response) => {
        if (response.code === 200) {
          this.records = response.data.data;
          this.pagination = {
            currentPage: response.data.current_page,
            perPage: response.data.per_page,
            lastPage: response.data.last_page,
            prevPageUrl: response.data.prev_page_url,
            nextPageUrl: response.data.next_page_url,
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
