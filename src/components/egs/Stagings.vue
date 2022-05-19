<template>
  <div class="container-fluid">
    <MyDataTable
        title="Staging Approval"
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
        :refreshable="true"
        v-on:onRefresh="doRefresh"
        :loadingAnimation="false"
        :filter-month="false"
        v-on:onRowClick="onRowClick"
    >
    </MyDataTable>
    <b-modal
        id="m-staging"
        title="Staging"
        hide-footer
    >
      <form>
        <div class="col-lg-12 mb-3">
          <label style="text-align: left">Unit Name</label>
          <input type="text" class="form-control" v-model="staging.unit_name" readonly/>
        </div>
        <div class="col-lg-12 mb-3">
          <label style="text-align: left">Staging 1</label>
          <input type="text" class="form-control" v-model="staging.staging1" readonly/>
        </div>
        <div class="col-lg-12 mb-3">
          <label style="text-align: left">Staging 2</label>
          <input type="text" class="form-control" v-model="staging.staging2" readonly/>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>

import MyDataTable from "../hyver-vue/components/DataTable";
import StagingsService from "../../services/stagings.service";
import RequestStaging from "../../payloads/request/RequestStaging";

export default {
  name: "Index",
  components: {
    MyDataTable,
  },
  data() {
    return {
      staging: new RequestStaging(),
      searchBy: "id",
      searchParam: "",
      dateFrom: "",
      dateTo: "",
      columns: [
        {
          label: "Unt Name",
          field: "unit_name",
          numeric: false,
          html: false,
        },
        {
          label: "Staging 1",
          field: "staging1",
          numeric: false,
          html: false,
        },
        {
          label: "Staging 2",
          field: "staging2",
          numeric: false,
          html: false,
        },
        {
          label: "Active",
          field: "active",
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
        {id: "id", desc: "Unit ID"},
        {id: "unit_name", desc: "Unit Name"},
        {id: "active", desc: "Active"},
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
    this.getPaginate(
        this.dateFrom,
        this.dateTo,
        this.searchBy,
        this.searchParam,
        this.pagination.perPage,
        this.pagination.currentPage,
    );
  },
  methods: {
    async onRowClick(prop) {
      this.staging = prop;
      this.$bvModal.show("m-leaves-staging");
    },
    doClose() {
      this.$bvModal.hide("m-leaves-staging");
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
          props[2],
          this.month
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
      };
      let loading = this.$loading.show();
      StagingsService.getAll(params).then((response) => {
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
      this.getPaginate(
          this.searchBy,
          this.searchParam,
          limit[0],
          limit[1]
      );
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
