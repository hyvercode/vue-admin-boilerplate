<template>
  <div class="container-fluid">
    <DataTable
        title="Users"
        :columns="columns"
        :rows="records"
        :clickable="true"
        :sortable="true"
        :paginate="true"
        :create-button="true"
        create-button-title="Add New"
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
            <i class="material-icons white-text">edit</i>
          </button>
          <button
              class="btn btn-flat nopadding"
              @click="(e) => handleDelete(props.row, e)"
          >
            <i class="material-icons white-text">delete</i>
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
          name:"name",
          size:30,
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
      recordsPerPage: [5, 10, 50, 100, 500, 1000],
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
            total: response.data.total
          };
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

<style scoped>

</style>