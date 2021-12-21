<template>
  <div class="pickers">
    <div class="container-fluid px-3 mt-5">
      <div class="row">
        <div class="table-responsive">
          <table class="table">
            <MyDataTable
                title="List Reports"
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
                :searching="false"
                v-on:onChangeSearch="doSearch"
                v-on:onEnterSearch="doSearch"
                :filter="true"
                :filterRecord="filterRecord"
                v-on:onChangeFilter="doFilterSelected"
                :filterDate="false"
                v-on:onChangeDate="doFilterDate"
                :exportable="true"
                :printable="true"
                :crate-button="false"
                :refreshable="true"
                v-on:onRefresh="doRefresh"
                :loadingAnimation="false"
                :filterYears="true"
                v-on:onChangeYear="onChangeYear">
            </MyDataTable>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ReportsService from "../../services/reports.service";
import MyDataTable from "../mydatatable/MyDataTable";
import BranchService from "../../services/branch.service";

export default {
  name: "Index",
  components: {
    MyDataTable
  },
  data() {
    return {
      searchBy: "id",
      searchParam: "",
      branch_id: "",
      dateFrom: new Date().toISOString().substr(0, 10),
      filterRecord: [],
      columns: [
        {
          label: "Month",
          field: "month",
          numeric: false,
          html: false,
        },
        {
          label: "Asign",
          field: "total_asign",
          numeric: true,
          html: false,
        },
        {
          label: "Delivered",
          field: "total_delivered",
          numeric: true,
          html: false,
        },
        {
          label: "Canceled",
          field: "total_canceled",
          numeric: true,
          html: false,
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
    };
  },
  computed: {
    profile() {
      return this.$store.state.user.data.profile;
    },
    paginate() {
      return this.pagination;
    }
  },
  created() {
    this.branch_id = this.$store.state.user.data.profile.branch_id;
    this.getBranch();
    this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
  },
  methods: {
    onChangeYear(year) {
      this.dateFrom = year;
      this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
    },
    getBranch() {
      let loading = this.$loading.show();
      BranchService.getByCompany(this.$store.state.user.data.profile.company_id).then(response => {
        if (response.code === 200) {
          this.filterRecord = response.data;
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

    doRefresh() {
      this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
    },

    doFilterSelected(pagination) {
      this.searchBy = pagination[0];
      this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, pagination[1], pagination[2])
    },

    doFilterDate(selectedDate) {
      this.dateFrom = selectedDate[0];
      this.dateFrom = selectedDate[1];
    },

    doSearch(props) {
      this.searchParam = props[0];
      this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, props[0], props[1], props[2])
    },

    getPaginate(dateFrom, dateTo, searchBy, searchParam, limit, page) {
      let params = {
        company_id: this.$store.state.user.data.profile.company_id,
        branch_id: this.profile.branch_id,
        year: dateFrom,
        dateTo: dateTo,
        searchBy: searchBy,
        searchParam: searchParam,
        limit: limit,
        page: page
      }
      let loading = this.$loading.show();
      ReportsService.getPaginate(params).then(response => {
        if (response.code === 200) {
          this.records = response.data;
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
          this.$swal.fire(
              'Error!',
              response.message,
              'error'
          )
        }
      })
    },

    //Prev Pagination
    prevPage(limit) {
      this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, limit[0], limit[1])
    },

    //Next Pagination
    nextPage(limit) {
      this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, limit[0], limit[1])
    },

    //Search Record
    handleSearch(limit) {
      this.getPaginate(this.searchBy, this.searchParam, limit[0], limit[1])
    },

    handleChangeRecords(limit) {
      this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, limit[0], limit[1])
    },
  }
}
</script>