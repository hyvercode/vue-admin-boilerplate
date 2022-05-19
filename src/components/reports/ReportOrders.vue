<template>
  <div class="container-fluid">
    <div class="container-fluid px-3 mt-5">
      <div class="row">
        <div class="card material-table" ref="table">
          <div class="table-header">
            <span class="table-title">Report Orders</span>
            <div class="actions">
              <div class="btn-group">
                <button class="btn btn-submit text-black" @click="$router.go(-1)">
                  <i class="material-icons">arrow_back</i>
                </button>
              </div>
            </div>
          </div>
          <div class="table-header">
            <span class="span-margin">
              <div class="input-group">
                <span class="input-group-text">Order Date</span>
                <input type="date" v-model="dateFrom" class="form-control form-control-sm">
                <span class="input-group-text">to</span>
                <input type="date" v-model="dateTo" class="form-control form-control-sm">
              </div>
            </span>
            <span class="span-margin">
                <div class="input-group">
                  <span class="input-group-text"><i class="material-icons">filter_list</i></span>
                  <select class="form-select form-select-sm" v-model="status"
                          aria-label="Filter">
                    <option selected value="">All</option>
                     <option v-for="item in listStatus" :value="item.name" :key="item.id">{{
                         item.description
                       }}</option>
                  </select>
                </div>
            </span>
            <span class="span-margin">
                <div class="input-group">
                  <span class="input-group-text"><i class="material-icons">motorcycle</i></span>
                  <select class="form-select form-select-sm" v-model="picker_name"
                          aria-label="Filter">
                    <option selected value="">All</option>
                    <option v-for="item in pickers" :value="item.name" :key="item.id">{{ item.name }}</option>
                  </select>
                </div>
            </span>
            <span class="span-margin">
                <div class="input-group">
                  <span class="input-group-text"><i class="material-icons">business</i></span>
                  <select class="form-select form-select-sm" v-model="company_name"
                          aria-label="Filter">
                    <option selected value="">All</option>
                     <option v-for="item in companies" :value="item.company_name"
                             :key="item.id">{{ item.company_name }}</option>
                  </select>
                </div>
            </span>
            <span class="span-margin">
              <button class="btn btn-primary" @click.prevent="handleQuery">Query</button>
            </span>
            <span class="span-margin">
               <a
                   class="waves-effect btn-flat nopadding mt-1"
                   @click.prevent="handlePrint('EXCEL')"
               >
                <i class="material-icons">print</i>
              </a>
              <a
                  class="waves-effect btn-flat nopadding mt-1"
                  @click.prevent="handlePrint('PDF')"
              >
                <i class="material-icons">picture_as_pdf</i>
              </a>
            </span>
          </div>
          <div class="table-responsive">
            <MyDataTable
                title="Report Orders"
                :columns="columns"
                :commandShow="false"
                :rows="records"
                :clickable="false"
                :sortable="true"
                :paginate="false"
                :loadingAnimation="false"
            >
            </MyDataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import MyDataTable from "../hyver-vue/components/DataTable";
import UsersService from "../../services/user.service";
import GlobalService from "../../services/global.service";
import CompaniesService from "../../services/companies.service";
import ReportsService from "../../services/reports.service";
import Utils from "../../helpers/Utils";

export default {
  name: "ReportOrders",
  components: {MyDataTable},
  data() {
    return {
      picker_name: "",
      status: "",
      company_name: "",
      dateFrom: "",
      dateTo: "",
      columns: [
        {
          label: "Order Date",
          field: "order_date",
          numeric: true,
          html: false,
        },
        {
          label: "Order No",
          field: "order_no",
          numeric: true,
          html: false,
        },
        {
          label: "Debitur Name",
          field: "debitur_name",
          numeric: true,
          html: false,
        },
        {
          label: "Company Name",
          field: "company_name",
          numeric: false,
          html: false,
        },
        {
          label: "Branch Name",
          field: "branch_name",
          numeric: false,
          html: false,
        },
        {
          label: "Branch Coordinate",
          field: "branch_coordinate",
          numeric: false,
          html: false,
        },
        {
          label: "Agreement No",
          field: "agreement_no",
          numeric: false,
          html: false,
        },
        {
          label: "Picker Name",
          field: "picker_name",
          numeric: false,
          html: false,
        },
        {
          label: "Appointment Coordinate",
          field: "appointment_coordinate",
          numeric: false,
          html: false,
        },
        {
          label: "KM (PP)",
          field: "debitur_km_distance",
          numeric: false,
          html: false,
        },
        {
          label: "Date Finish",
          field: "date_finish",
          numeric: false,
          html: false,
        },
        {
          label: "Time Finish",
          field: "time_finish",
          numeric: false,
          html: false,
        },
        {
          label: "Arrival Start",
          field: "arrival_start_date",
          numeric: false,
          html: false,
        },
        {
          label: "Arrival End",
          field: "arrival_end_date",
          numeric: false,
          html: false,
        },
        {
          label: "Total Amount",
          field: "total_amount",
          numeric: false,
          html: false,
          currency: true
        },
        {
          label: "Funding Amount",
          field: "founding_amount",
          numeric: false,
          html: false,
          currency: true
        },
        {
          label: "License Plate",
          field: "license_plate",
          numeric: false,
          html: false,
        },
        {
          label: "Bispro",
          field: "bispro_name",
          numeric: false,
          html: false
        },
        {
          label: "Order Status",
          field: "order_status",
          numeric: false,
          html: false,
        },
        {
          label: "Foto Persyaratan",
          field: "foto_persyaratan",
          numeric: false,
          html: false
        },
        {
          label: "TTD Perjanjiann",
          field: "tanda_tangan_Perjanjian",
          numeric: false,
          html: false
        },
        {
          label: "BPKB",
          field: "bpkb_kendaraan",
          numeric: false,
          html: false
        },
        {
          label: "Package Name",
          field: "package_name",
          numeric: false,
          html: false
        },
        {
          label: "Order Created",
          field: "order_created",
          numeric: false,
          html: false
        },
        {
          label: "Appointment Date",
          field: "appointment_date",
          numeric: false,
          html: false
        },
        {
          label: "Reschedule Date",
          field: "reschedule_date",
          numeric: false,
          html: false
        },
        {
          label: "Otw Debitur",
          field: "otw_debitur_at",
          numeric: false,
          html: false
        },
        {
          label: "Worked Service Start",
          field: "worked_start",
          numeric: false,
          html: false
        },
        {
          label: "Worked Service End",
          field: "worked_end",
          numeric: false,
          html: false
        },
        {
          label: "Otw Branch",
          field: "otw_branch",
          numeric: false,
          html: false
        },
        {
          label: "Arrival Branch",
          field: "at_cabang",
          numeric: false,
          html: false
        },
        {
          label: "Order Submission",
          field: "doc_submission",
          numeric: false,
          html: false
        },
        {
          label: "Order Receive",
          field: "doc_received",
          numeric: false,
          html: false
        },
        {
          label: "Order Confirmation",
          field: "order_done",
          numeric: false,
          html: false
        },
        {
          label: "Status",
          field: "status",
          numeric: false,
          html: false,
        },
        {
          label: "Remarks",
          field: "remarks",
          numeric: false,
          html: false
        },
      ],
      records: [],
      pickers: [],
      companies: [],
      listStatus: []
    };
  },
  created() {
    this.dateTo = new Date().toISOString().substr(0, 10);
    let d = new Date(this.dateTo);
    d.setDate(d.getDate() - 25);
    this.dateFrom = new Date(d).toISOString().substr(0, 10);
    this.getPickers();
    this.getGlobals();
    this.getCompanies();
  },
  methods: {
    getPickers() {
      let loading = this.$loading.show();
      UsersService.getPickers().then(response => {
        if (response.code === 200) {
          this.pickers = response.data;
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
    getGlobals() {
      let loading = this.$loading.show();
      GlobalService.getByParam('STATUS').then(response => {
        if (response.code === 200) {
          this.listStatus = response.data;
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
    getCompanies() {
      let loading = this.$loading.show();
      CompaniesService.getAll().then(response => {
        if (response.code === 200) {
          this.companies = response.data;
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
    handleQuery() {
      let payloads = {
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        status: this.status,
        pickerName: this.picker_name,
        companyName: this.company_name
      }
      let loading = this.$loading.show();
      ReportsService.getReportOrders(payloads).then(response => {
        if (response.code === 200) {
          this.records = response.data;
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
    handlePrint(e) {
      if (e === 'PDF') {
        Utils.onPrintPdf('Report order period ', 'landscape', 'a0', this.columns, this.records);
      } else {
        Utils.onExportExcel('Report order period ', this.columns, this.records);
      }
    }
  }
}
</script>

<style scoped>
.span-margin {
  margin-right: 10px;
}

div.material-table {
  padding: 0;
}

tr.clickable {
  cursor: pointer;
}

#search-input {
  margin: 0;
  border: transparent 0 !important;
  height: 48px;
  color: rgba(0, 0, 0, .84);
}

#search-input-container {
  padding: 0 14px 0 24px;
  border-bottom: solid 1px #DDDDDD;
}

table {
  table-layout: fixed;
}

.table-header {
  height: 64px;
  padding-left: 24px;
  padding-right: 14px;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: flex;
  -webkit-display: flex;
  border-bottom: solid 1px #DDDDDD;
}

.table-header .actions {
  display: -webkit-flex;
  margin-left: auto;
}

.table-header .btn-flat {
  min-width: 36px;
  padding: 0 8px;
}

.table-header input {
  margin: 0;
  height: auto;
}

.table-header i {
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
}

.table-footer {
  height: 56px;
  padding-left: 24px;
  padding-right: 14px;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
  -webkit-align-items: center;
  align-items: center;
  font-size: 12px !important;
  color: rgba(0, 0, 0, 0.54);
}

.table-footer .datatable-length {
  display: -webkit-flex;
  display: flex;
}

.table-footer .datatable-length select {
  outline: none;
}

.table-footer label {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  /* works with row or column */

  flex-direction: row;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.table-footer .select-wrapper {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  /* works with row or column */

  flex-direction: row;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.table-footer .datatable-info,
.table-footer .datatable-length {
  margin-right: 32px;
}

.table-footer .material-pagination {
  display: flex;
  -webkit-display: flex;
  margin: 0;
}

.table-footer .material-pagination li a {
  color: rgba(0, 0, 0, 0.54);
  padding: 0 8px;
  font-size: 24px;
}

.table-footer .select-wrapper input.select-dropdown {
  margin: 0;
  border-bottom: none;
  height: auto;
  line-height: normal;
  font-size: 12px;
  width: 40px;
  text-align: right;
}

.table-footer select {
  background-color: transparent;
  width: auto;
  padding: 0;
  border: 0;
  border-radius: 0;
  height: auto;
  margin-left: 20px;
}

.table-title {
  font-size: 20px;
  color: #000;
}

table tr td {
  padding: 0 0 0 56px;
  height: 48px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: solid 1px #DDDDDD;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

table td, table th {
  border-radius: 0;
}

table tr td a {
  color: inherit;
}

table tr td a i {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.54);
}

table tr {
  font-size: 12px;
}

table th {
  font-size: 12px;
  font-weight: 500;
  color: #757575;
  cursor: pointer;
  white-space: nowrap;
  padding: 0;
  height: 56px;
  padding-left: 56px;
  vertical-align: middle;
  outline: none !important;

  overflow: hidden;
  text-overflow: ellipsis;
}

table th:hover {
  overflow: visible;
  text-overflow: initial;
}

table th.sorting-asc,
table th.sorting-desc {
  color: rgba(0, 0, 0, 0.87);
}

table th.sorting:after,
table th.sorting-asc:after {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 16px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  word-wrap: normal;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  content: "arrow_back";
  -webkit-transform: rotate(90deg);
  display: none;
  vertical-align: middle;
}

table th.sorting:hover:after,
table th.sorting-asc:after,
table th.sorting-desc:after {
  display: inline-block;
}

table th.sorting-desc:after {
  content: "arrow_forward";
}

table tbody tr:hover {
  background-color: #EEE;
}

table th:last-child,
table td:last-child {
  padding-right: 14px;
}

table th:first-child, table td:first-child {
  padding-left: 24px;
}

.rtl {
  direction: rtl;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>