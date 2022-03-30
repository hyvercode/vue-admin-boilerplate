<template>
  <div class="container-fluid">
    <DataTable
        title="Users"
        :columns="columns"
        :rows="records"
        :clickable="true"
        :sortable="true"
        :paginate="true"
        :rows-per-page="rowPerPage"
        :pagination="paginate"
        :create-button="true"
        create-button-title="Add New"
        :printable="true"
        :exportable="true"
        :searchable="true"
        :filter="true"
        :refreshable="true"
        :filter-date="true"
        :filter-month="true"
        :upload-button="true"
        upload-button-title="Upload"
        @onRefresh="doRefresh"
        @onPreviousPage="doPrevPage"
        @onNextPage="doNextPage"
        @onChangeRowPage="doChangePerPage"
    >
      <th
          id="delete"
          slot="thead-tr"
          class="text-center"
          style="margin-top: -30px !important;"
      >
        Actions
      </th>
      <template slot="tbody-tr" slot-scope="props">
        <td class="text-center">
          <button
              class="btn btn-flat nopadding"
              @click="(e) => handleUpdate(props.row, e)"
          >
            <i class="material-icons tbl-material-icons  white-text">edit</i>
          </button>
          <button
              class="btn btn-flat nopadding"
              @click="(e) => handleDelete(props.row, e)"
          >
            <i class="material-icons tbl-material-icons white-text">delete</i>
          </button>
        </td>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "../mih/components/DataTable";
import UserService from "../../services/user.service";

export default {
  name: "UserIndex",
  components: {DataTable},
  data() {
    return {
      columns: [
        {
          label: "ID",
          field: "id",
          numeric: false,
          html: false,
          hidden: true,
        },
        {
          label: "avatar",
          field: "avatar",
          name: "name",
          size: 30,
          numeric: false,
          html: false,
          image: true
        },
        {
          label: "name",
          field: "name",
          numeric: false,
          html: false,
          hidden: false,
        },
        {
          label: "email",
          field: "email",
          numeric: false,
          html: false,
          hidden: false,
        },
        {
          label: "phone number",
          field: "phone_number",
          numeric: false,
          html: false,
          hidden: false,
        },
        {
          label: "roles",
          field: "menu_roles",
          numeric: false,
          html: false,
          hidden: false,
        },
        {
          label: "status",
          field: "active",
          numeric: false,
          html: false,
          hidden: false,
        },
      ],
      records: [],
      rowPerPage: [5, 10, 50, 100, 500, 1000],
      pagination: {
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: "",
        prevPageUrl: "",
        total: 0,
        searchBy: 'id',
        searchParam: '',
        sortBy: 'created_at',
        sort: 'DESC'
      },
    }
  },
  computed: {
    paginate() {
      return this.pagination;
    },
  },
  mounted() {
    this.getRecordPaginate()
  },
  methods: {
    getRecordPaginate() {
      let loading = this.$loading.show();
      UserService.getPaginate(this.pagination).then((response) => {
        if (response.code === 200) {
          this.records = response.data.data;
          this.pagination = {
            currentPage: response.data.current_page,
            perPage: response.data.per_page,
            lastPage: response.data.last_page,
            prevPageUrl: response.data.prev_page_url,
            nextPageUrl: response.data.next_page_url,
            total: response.data.total,
            searchBy: 'id',
            searchParam: '',
            sortBy: 'created_at',
            sort: 'DESC'
          };
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    doRefresh() {
      this.getRecordPaginate();
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
          props[2]
      );
    },
    //Prev Pagination
    doPrevPage(props) {
      this.pagination.perPage = props[0];
      this.pagination.currentPage = props[1];
      this.getRecordPaginate();
    },
    //Next Pagination
    doNextPage(props) {
      this.pagination.perPage = props[0];
      this.pagination.currentPage = props[1];
      this.getRecordPaginate();
    },
    //Search Record
    handleSearch(limit) {
      this.getPaginate(this.searchBy, this.searchParam, limit[0], limit[1]);
    },

    doChangePerPage(props) {
      this.pagination.perPage = props[0];
      this.pagination.currentPage = props[1];
      this.getRecordPaginate();
    },
  }
}
</script>

<style scoped>

</style>