<template>
  <div class="pickers">
    <div class="container-fluid px-3 mt-5">
      <div class="row">
        <div class="table-responsive">
          <table class="table">
            <MyDataTable
                title="List Invoice & Billing"
                :columns="columns"
                :rows="records"
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
                :loadingAnimation="false"
                :clickable="true"
                v-on:onRowClick="onRowClick">
              <th id="delete" slot="thead-tr" class="text-center">
                Resend Email
              </th>
              <template slot="tbody-tr" slot-scope="props">
                <td class="text-center">
                  <button class="btn btn-flat no-padding" @click="(e) => handleApprove(props.row, e)">
                    <i class="material-icons">email</i>
                  </button>
                </td>
              </template>
            </MyDataTable>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import InvoiceService from "../../services/invoice.service";
import MyDataTable from "../mydatatable/MyDataTable";
import router from "../../router";
import pages from "../../helpers/Pages";

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
      filterRecord: [{'id': 'id', "desc": "Invoice ID"}, {'id': 'invoice_number', "desc": "Invoice Number"}, {
        'id': 'status',
        "desc": "Status"
      }],
      columns: [
        {
          label: "Invoice Date",
          field: "invoice_date",
          numeric: false,
          html: false,
        },
        {
          label: "Invoice ID",
          field: "id",
          numeric: false,
          html: false,
          hidden: false,
        },
        {
          label: "Invoice Number",
          field: "invoice_number",
          numeric: false,
          html: false,
        },
        {
          label: "Due Date",
          field: "due_date",
          numeric: false,
          html: false,
        },
        {
          label: "Qty",
          field: "qty",
          numeric: false,
          html: false,
        },
        {
          label: "Amount",
          field: "amount",
          numeric: false,
          html: false,
          currency: true,
        },
        {
          label: "Discount",
          field: "discount_amount",
          numeric: false,
          html: false,
          currency: true,
        },
        {
          label: "Total Amount",
          field: "total_amount",
          numeric: false,
          html: false,
          currency: true,
        },
        {
          label: "PPN",
          field: "ppn",
          numeric: false,
          html: false,
          currency: true,
        },
        {
          label: "PPH 23",
          field: "pph_23",
          numeric: false,
          html: false,
          currency: true,
        },
        {
          label: "Total Payment",
          field: "total_payment",
          numeric: false,
          html: false,
          currency: true,
        },
        {
          label: "Status",
          field: "status",
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
    onRowClick(row) {
      sessionStorage.setItem("__invoice_number__", row.invoice_number);
      router.push(pages.INVOICE_DETAIL);
    },

    doRefresh() {
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
      InvoiceService.getPaginate(params).then(response => {
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

    handleApprove(prop) {
      let loading = this.$loading.show();
      let params = {
        status: 'APPROVED'
      }
      InvoiceService.postApprove(prop.id, params).then(response => {
        if (response.code === 200) {
          this.doRefresh();
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
    }
  }
}
</script>