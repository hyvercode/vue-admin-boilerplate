<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="onClose"></button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table">
              <MyDataTable
                  title="List Users"
                  :title-show="false"
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
                  :filter="false"
                  :filterRecord="filterRecord"
                  v-on:onChangeFilter="doFilterSelected"
                  :loadingAnimation="false">
                <th id="delete" slot="thead-tr" class="text-center">
                  Actions
                </th>
                <template slot="tbody-tr" slot-scope="props">
                  <td class="text-center">
                    <button data-bs-toggle="tooltip" data-bs-placement="top" title="Dispatch"
                            class="btn btn-flat nopadding"
                            @click="(e) => onSubmit(props.row, e)">
                      <i class="material-icons">add_to_home_screen</i>
                    </button>
                  </td>
                </template>
              </MyDataTable>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button v-if="submit" type="button" class="btn btn-primary" @click="onSubmit">Changes</button>
          <button type="button" class="btn btn-secondary" @click="onClose">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from "../../services/user.service";
import MyDataTable from "../mih/mihVueDataTable";

export default {
  name: "Picker",
  components: {
    MyDataTable
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    submit: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      searchBy: "api_roles",
      searchParam: "picker",
      dateFrom: "",
      dateTo: "",
      filterRecord: [
        {'id': 'id', "desc": "RequestUser ID"},
        {'id': 'username', "desc": "NIK"},
        {'id': 'name', "desc": "Picker Name"}],
      columns: [
        {
          label: "ID",
          field: "id",
          numeric: false,
          html: false,
        },
        {
          label: "Name",
          field: "name",
          numeric: false,
          html: false,
        },
        {
          label: "Phone Number",
          field: "phone_number",
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
      UsersService.getPaginate(params).then(response => {
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

    onClose() {
      this.$emit('onClose');
    },

    onSubmit(prop) {
      this.$emit('onSubmit', prop);
    }
  }
}
</script>