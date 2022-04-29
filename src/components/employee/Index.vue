<template>
  <div class="container-fluid">
    <MyDataTable
        title="Employees"
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
        v-on:onRowClick="handleClick"
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
        :create-button="true"
        v-on:onCreate="handleCreate"
        :refreshable="true"
        v-on:onRefresh="doRefresh"
        :loadingAnimation="false"
        :mode="true"
        :kanban="true"
        :columnsKanban="columnsKanban"
        :commandContact="true"
        @onCheckToggle="doCheckToggle">

      <th id="delete" slot="thead-tr" class="text-center tbl-action-button">
        Actions
      </th>
      <template slot="tbody-tr" slot-scope="props">
        <td class="text-center">
          <button class="btn btn-flat nopadding" data-bs-toggle="tooltip" data-bs-placement="top" title="Family"
                  @click.prevent="(e) => handleViewEmployee(props.row, e)">
            <i class="material-icons tbl-material-icons text-primary">family_restroom</i>
          </button>
          <button class="btn btn-flat nopadding" data-bs-toggle="tooltip" data-bs-placement="top"
                  title="Edit /View"
                  @click.prevent="(e) => handleUpdate(props.row, e)">
            <i class="material-icons tbl-material-icons text-info">edit</i>
          </button>
          <button class="btn btn-flat nopadding" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                  @click.prevent="(e) => handleDelete(props.row, e)">
            <i class="material-icons tbl-material-icons text-danger">delete</i>
          </button>
        </td>
      </template>
    </MyDataTable>
  </div>
</template>

<script>

import EmployeesService from "../../services/employee.service";
import MyDataTable from "../mih/components/DataTable";
import router from "../../router";
import Pages from "../../helpers/HR";
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
        {id: 'NIK', desc: "NIK"},
        {id: 'first_name', desc: "First Name"},
        {id: 'last_name', desc: "Last Name"},
        {id: 'nick_name', desc: "Nick Name"},
        {id: 'email', desc: "Email"},
        {id: 'phone_number', desc: "Phone Number"},
        {id: 'birth_date', desc: "Birth Date (YYYY-MM-DD)"},
        {id: 'active', desc: "Status ( Active =true /Inactive = false )"},
        {id: 'id', desc: "Employee ID"}
      ],
      columns: [
        {
          label: "Photo",
          field: "images",
          name: "first_name",
          size: 30,
          numeric: false,
          html: false,
          image: true
        },
        {
          label: "NIK",
          field: "NIK",
          numeric: true,
          html: false,
        },
        {
          label: "Employee Name",
          field: "first_name",
          numeric: false,
          html: false,
          concat: true,
          concatWith: "last_name",
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
          email: true
        },
        {
          label: "Employee Status",
          field: "employee_status",
          numeric: false,
          html: false,
        },
        {
          label: "Birth Date",
          field: "birth_date",
          numeric: false,
          html: false,
          date:true,
          dateFormat:"DD MMMM YYYY"
        },
        {
          label: "active",
          field: "active",
          numeric: false,
          html: false,
          hidden: false,
          buttonToggle: true,
          buttonToggleDesc: [
            "Active", "Inactive"
          ]
        },
        {
          label: "ID",
          field: "id",
          hidden: true
        },
      ],
      columnsKanban: [
        {
          label: "Photo",
          field: "images",
          name: "first_name",
          size: 70,
          numeric: false,
          html: false,
          image: true,
          hidden: true
        },
        {
          label: "NIK",
          field: "NIK",
          numeric: true,
          html: false,
          badge: true,
          badgeClass: 'badge bg-secondary'
        },
        {
          label: "Fullname",
          field: "first_name",
          numeric: false,
          html: false,
          concat: true,
          concatWith: "last_name",
        },
        {
          label: "Phone",
          field: "phone_number",
          numeric: false,
          html: false,
        },
        {
          label: "Email",
          field: "email",
          numeric: false,
          html: false,
        },
        {
          label: "Status",
          field: "active",
          numeric: false,
          html: false,
          hidden: false,
          buttonToggle: true,
          buttonToggleDesc: [
            "Active", "Inactive"
          ]
        },
        {
          label: "ID",
          field: "id",
          hidden: true
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
        total: 0
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
    async handleViewEmployee(prop) {
      await router.push({
        path: Pages.EMPLOYEES_FAMILY,
        query: {id: Utils.encrypt(prop.id)},
      });
    },
    async handleClick(prop) {
      await router.push({path: Pages.EMPLOYEE_UPDATE, query: {id: Utils.encrypt(prop.id)}});
    },
    async handleUpdate(prop) {
      await router.push({path: Pages.EMPLOYEE_UPDATE, query: {id: Utils.encrypt(prop.id)}});
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
            total: response.data.total
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

    /**
     * Button Toggle
     * @param props
     */
    doCheckToggle(props) {
      let payload = props;
      payload.active = !props.active
      let loading = this.$loading.show();
      EmployeeService.postUpdate(props.id, payload).then((response) => {
        if (response.code === 200) {
          this.doRefresh();
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
  }
}
</script>