<template>
  <div class="pickers">
    <div class="container-fluid px-3 mt-5">
      <div class="row">
        <div class="table-responsive">
          <table class="table">
            <MyDataTable
                title="List Orders"
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
                :filterDate="true"
                v-on:onChangeDate="doFilterDate"
                :exportable="true"
                :printable="true"
                :crate-button="false"
                :refreshable="true"
                v-on:onRefresh="doRefresh"
                :loadingAnimation="false">
            </MyDataTable>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import OrdersService from "../../services/orders.service";
import MyDataTable from "../mydatatable/MyDataTable";

export default {
  name: "Index",
  components: {
    MyDataTable
  },
  data() {
    return {
      searchBy: "id",
      searchParam: "",
      dateFrom: "",
      dateTo: "",
      filterRecord: [{'id': 'id', "desc": "Order ID"}, {'id': 'order_no', "desc": "Order Number"}, {
        'id': 'order_status',
        "desc": "Status"
      }],
      columns: [
        {
          label: "Order Date",
          field: "order_date",
          numeric: false,
          html: false,
        },
        {
          label: "Order Number",
          field: "order_no",
          numeric: false,
          html: false,
        },
        {
          label: "Agreement Number",
          field: "agreement_no",
          numeric: false,
          html: false,
        },
        {
          label: "Debitur Name",
          field: "debitur_name",
          numeric: false,
          html: false,
        },
        {
          label: "Debitur Phone",
          field: "debitur_phone_number",
          numeric: false,
          html: false,
        },
        {
          label: "Debitur Email",
          field: "debitur_email",
          numeric: false,
          html: false,
        },
        {
          label: "Debitur Address",
          field: "debitur_destination_address",
          numeric: false,
          html: false,
        },
        {
          label: "Order Status",
          field: "order_status",
          numeric: false,
          html: false,
        },
        {
          label: "Finished Date",
          field: "date_finish",
          numeric: false,
          html: false,
        }
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
    paginate() {
      return this.pagination;
    }
  },
  mounted() {
    this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
  },
  methods: {
    doRefresh(){
      this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
    },
    doFilterSelected(pagination) {
      this.searchBy = pagination[0];
      if (this.searchBy === 'All') {
        this.searchBy = 'id';
        this.searchParam = '';
        this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, pagination[1], pagination[2])
      }
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
        dateFrom: dateFrom,
        dateTo: dateTo,
        searchBy: searchBy,
        searchParam: searchParam,
        limit: limit,
        page: page
      }
      let loading = this.$loading.show();
      OrdersService.getPaginate(params).then(response => {
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