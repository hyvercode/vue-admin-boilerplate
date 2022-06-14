<template>
  <div class="container-fluid">
    <MyDataTable
        title="List Attendance Detail"
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
        v-on:onPreviousPage="prevPage"
        v-on:onNextPage="nextPage"
        :searching="false"
        :filter="false"
        :filterRecord="filterRecord"
        :filterDate="false"
        :exportable="true"
        :printable="true"
        :create-button="false"
        :refreshable="true"
        v-on:onRefresh="doRefresh"
        :loadingAnimation="false">
      <th id="image" slot="thead-tr" class="text-center" style="width:40px !important;">Image Path</th>
      <template slot="tbody-tr" slot-scope="props">
        <td class="text-center" style="width:100px !important;">
          <img v-if="props.row.photo_path !='Unable to init from given binary data.'"
               :src="props.row.photo_path" class="tbl-image-icon" style="width:40px !important;"
               :alt="img">
        </td>
      </template>
    </MyDataTable>
  </div>
</template>

<script>

import MyDataTable from "../hyver-vue/components/table/DataTable";
import Utils from "../../helpers/Utils";
import AttendanceService from "../../services/attendance.service";

export default {
  name: "IndexTmp",
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
        {'id': 'id', "desc": "Attendance ID"},
        {'id': 'status', "desc": "Status"}
      ],
      columns: [
        {
          label: "clock",
          field: "clock",
          numeric: false,
          html: false,
        },
        {
          label: "location",
          field: "location",
          numeric: false,
          html: false,
        },
        {
          label: "coordinate",
          field: "coordinate",
          numeric: false,
          html: false,
        },
        {
          label: "mode",
          field: "mode",
          numeric: false,
          html: false,
        },
        {
          label: "status",
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
    doRefresh() {
      this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
    },

    getPaginate(dateFrom, dateTo, searchBy, searchParam, limit, page) {
      let params = {
        searchBy: searchBy,
        searchParam: searchParam,
        limit: limit,
        page: page,
        attendance_id: Utils.decrypt(this.$route.query.id)
      }
      let loading = this.$loading.show();
      AttendanceService.getPaginateTmp(params).then(response => {
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
    }
  }
}
</script>