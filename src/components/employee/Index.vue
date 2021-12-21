<template>
  <div class="pickers">
    <div class="container-fluid px-3 mt-5">
      <div class="row">
        <div class="table-responsive">
          <table class="table">
            <MyDataTable
                title="List Employees"
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
                :crate-button="true"
                v-on:onCreate="handleCreate"
                :refreshable="true"
                v-on:onRefresh="doRefresh"
                :loadingAnimation="false">

              <th id="delete" slot="thead-tr" class="text-center">
                Actions
              </th>
              <template slot="tbody-tr" slot-scope="props">
                <td class="text-center">
                  <button class="btn btn-flat nopadding" @click="(e) => handleUpdate(props.row, e)">
                    <i class="material-icons white-text">edit</i>
                  </button>
                  <button class="btn btn-flat nopadding" @click="(e) => handleDelete(props.row, e)">
                    <i class="material-icons white-text">delete</i>
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

import EmployeesService from "../../services/employee.service";
import MyDataTable from "../mydatatable/MyDataTable";
import router from "../../router";
import Pages from "../../helpers/Pages";
import Utils from "../../helpers/Utils";
import EmployeeService from "../../services/employee.service";

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
      filterRecord: [
        {id: 'id', desc: "Company ID"},
        {id: 'company_name', desc: "Company Name"},
        {id: 'company_code', desc: "Company Code"},
        {id: 'status', desc: "Status"}],
      columns: [
        {
          label: "NIK",
          field: "NIK",
          numeric: true,
          html: false,
        },
        {
          label: "Employee Name",
          field: "employee_name",
          numeric: false,
          html: false,
        },
        {
          label: "Phone Number",
          field: "phone_number",
          numeric: false,
          html: false,
        },
        {
          label: "email",
          field: "email",
          numeric: false,
          html: false,
        },
        {
          label: "Address",
          field: "address",
          numeric: false,
          html: false,
        },
        {
          label: "Postal Code",
          field: "postal_code",
          numeric: false,
          html: false,
        },
        {
          label: "Birth Date",
          field: "birth_date",
          numeric: false,
          html: false,
        },
        {
          label: "status",
          field: "status",
          numeric: false,
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
    paginate() {
      return this.pagination;
    }
  },
  mounted() {
    this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
  },
  methods: {
    doRefresh() {
      this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
    },

    handleCreate() {
      router.push(Pages.EMPLOYEE_CREATE);
    },
    async handleUpdate(prop) {
      await router.push(Pages.EMPLOYEE_UPDATE.concat(Utils.encrypt(prop.id.toString())));
    },
    handleDelete(prop) {
      let loading = this.$loading.show();
      EmployeeService.delete(prop.id).then(response => {
        if (response.code === 200) {
          this.doRefresh();
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Employee account has been deleted",
          });
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
      this.dateTo = selectedDate[1];
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
        page: page,
        dateFilter: 'created_at',
        sortBy: 'DESC'
      }
      let loading = this.$loading.show();
      EmployeesService.getPaginate(params).then(response => {
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