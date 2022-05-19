<template>
  <div class="container-fluid">
    <MyDataTable
        title="List Attendances"
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
        v-on:onRowClick="onRowClick"
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
        :refreshable="true"
        v-on:onRefresh="doRefresh"
        :loadingAnimation="false"
        :mode="true"
        :kanban="true"
        :command-contact="true"
        :columnsKanban="columnsKanban">
      <th id="delete" slot="thead-tr" class="text-center tbl-action-button">Actions</th>
      <template slot="tbody-tr" slot-scope="props">
        <td class="text-center">
          <button
              class="btn btn-flat nopadding"
              @click="(e) => onRowClick(props.row, e)"
          >
            <i class="material-icons tbl-material-icons ">article</i>
          </button>
        </td>
      </template>
    </MyDataTable>
  </div>
</template>

<script>

import MyDataTable from "../hyver-vue/components/DataTable";
import Pages from "../../helpers/HR";
import Utils from "../../helpers/Utils";
import router from "../../router";
import AttendanceService from "../../services/attendance.service";

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
        {id: 'id', desc: "Attendance ID"},
        {id: 'employees.NIK', desc: "NIK"},
        {id: 'employees.first_name', desc: 'Employee Name'},
        {id: 'trx_attendances.status', desc: "Status"}
      ],
      columns: [
        {
          label: "Photo",
          field: "images",
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
          label: "ID",
          field: "id",
          numeric: false,
          html: false,
          hidden: true,
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
          label: "status",
          field: "status",
          numeric: false,
          html: false,
          badge: true
        },
        {
          label: "check in",
          field: "check_in",
          numeric: false,
          html: false,
          badge: true,
          badgeClass: 'badge bg-success'
        },
        {
          label: "check out",
          field: "check_out",
          numeric: false,
          html: false,
          badge: true,
          badgeClass: 'badge bg-danger'
        },
        {
          label: "location in",
          field: "location_in",
          numeric: false,
          html: false,
        },
        {
          label: "location out",
          field: "location_out",
          numeric: false,
          html: false,
        }
      ],
      columnsKanban: [
        {
          label: "NIK",
          field: "NIK",
          numeric: true,
          html: false,
          badge: true,
          badgeClass: 'badge bg-secondary'
        },
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
          label: "Fullname",
          field: "first_name",
          numeric: false,
          html: false,
          concat: true,
          concatWith: "last_name",
        },
        {
          label: "status",
          field: "status",
          numeric: false,
          html: false,
          badge: true
        },
        {
          label: "check in",
          field: "check_in",
          numeric: false,
          html: false,
          badge: true,
          badgeClass: 'badge bg-success'
        },
        {
          label: "check out",
          field: "check_out",
          numeric: false,
          html: false,
          badge: true,
          badgeClass: 'badge bg-danger'
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
    let d = new Date(this.dateTo);
    d.setDate(d.getDate() + 1);
    this.dateTo = new Date(d).toISOString().substr(0, 10);
    d.setDate(d.getDate() + 1);
    this.dateFrom = new Date(d).toISOString().substr(0, 10);
    this.month = new Date(d).toISOString().substr(0, 10);
    this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
  },
  methods: {
    async onRowClick(prop) {
      await router.push({
        path: Pages.ATTENDANCE_TMP,
        query: {id: Utils.encrypt(prop.id)}
      });
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
      this.dateTo = selectedDate[1];
      this.doRefresh();
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
        dateFilter: 'created_at'
      }
      let loading = this.$loading.show();
      AttendanceService.getPaginate(params).then(response => {
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
  }
}
</script>
