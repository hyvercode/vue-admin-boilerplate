<template>
  <div class="container-fluid">
    <MyDataTable
        title="Job Positions"
        :columns="columns"
        :rows="records"
        :filter-record="filterRecord"
        :clickable="true"
        :sortable="true"
        :paginate="true"
        :pagination="paginate"
        :rows-per-page="paginate.recordsPerPage"
        :current-page="paginate.currentPage"
        :last-page="paginate.lastPage"
        :total-records="paginate.total"
        :default-per-page="paginate.perPage"
        :next-page-url="paginate.nextPageUrl"
        :prev-page-url="paginate.prevPageUrl"
        :create-button="true"
        create-button-title="Add New"
        :printable="true"
        :exportable="true"
        :searchable="true"
        :filter="true"
        :refreshable="true"
        :filter-date="true"
        @onEnterSearch="doSearch"
        @onRefresh="doRefresh"
        @onPreviousPage="doPrevPage"
        @onNextPage="doNextPage"
        @onChangeRowPage="doChangePerPage"
        @onCheckToggle="doCheckToggle"
        @onCreate="handleCreate"
        @onChangeFilter="doFilterSelected"
        @onChangeSearch="doSearch"
    >
      <th
          id="delete"
          slot="thead-tr"
          class="text-center tbl-action-button"
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
    </MyDataTable>
    <b-modal id="m-jobposition" :title="isUpdate?'Update Job Position':'Create Job Position'" hide-footer>
      <form @submit.prevent="submit($event)">
        <div class="form-group mb-3">
          <label>Job Position Name <span class="mandatory">*</span></label>
          <input
              type="text"
              class="form-control"
              placeholder="Please input text"
              v-model="jobposition.job_position_name"
              required
          />
        </div>
        <div class="col-lg-12 mb-3">
          <label for="NIK" style="text-align: left">Active <span class="mandatory">*</span></label>
          <select class="form-control form-select" v-model="jobposition.active" required>
            <option value="null" disabled>Choose...</option>
            <option
                v-for="item in status"
                :key="item.id"
                :value="item.id"
            >
              {{ item.desc }}
            </option>
          </select>
        </div>
        <div class="d-flex mt-4 float-end">
          <button class="btn btn-secondary" style="margin-right: 5px" @click.prevent="doClose">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import RequestJobPosition from "../../../payloads/request/RequestJobPosition";
import JobPositionService from "../../../services/jobposition.service";
import MyDataTable from "../../hyver-vue/components/table/DataTable";
import Utils from "../../../helpers/Utils";

export default {
  name: "Index",
  components: {
    MyDataTable,
  },
  data() {
    return {
      jobposition: new RequestJobPosition(),
      searchBy: "id",
      searchParam: "",
      dateFrom: "",
      dateTo: "",
      status: Utils.status(),
      columns: [
        {
          label: "ID",
          field: "id",
          numeric: true,
          html: false,
          hidden: true,
        },
        {
          label: "Job Position Name",
          field: "job_position_name",
          numeric: true,
          html: false,
        },
        {
          label: "status",
          field: "active",
          numeric: false,
          html: false,
          hidden: false,
          buttonToggle: true,
          buttonToggleDesc: [
            "Active", "Inactive"
          ]
        },
      ],
      records: [],
      filterRecord: [
        {id: 'id', desc: "Job Position ID"},
        {id: 'job_position_name', desc: "Job Position Name"},
        {id: 'active', desc: "Active=1 ,Inactive=0"}],
      pagination: {
        recordsPerPage: [5, 10, 50, 100, 500, 1000],
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: "",
        prevPageUrl: "",
        total: 0
      },
      isUpdate: false
    };
  },
  computed: {
    paginate() {
      return this.pagination;
    },
  },
  mounted() {
    this.getRecordPaginate(
        this.dateFrom,
        this.dateTo,
        this.searchBy,
        this.searchParam,
        this.pagination.perPage,
        this.pagination.currentPage
    );
  },
  methods: {
    doClose() {
      this.$bvModal.hide('m-jobposition');
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      if (!this.isUpdate) {
        JobPositionService.postCreate(this.jobposition).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestJobPosition();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Job Position  has been created",
            });
            this.doRefresh();
            this.$bvModal.hide('m-jobposition');
          } else {
            loading.hide();
            this.$bvModal.hide('m-jobposition');
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      } else {
        JobPositionService.postUpdate(this.jobposition.id, this.jobposition).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestJobPosition();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Job Title  has been updated",
            });
            this.doRefresh();
            this.$bvModal.hide('m-jobposition');
          } else {
            loading.hide();
            this.$bvModal.hide('m-jobposition');
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      }
    },
    handleCreate() {
      this.isUpdate = false;
      this.$bvModal.show('m-jobposition');
    },

    handleUpdate(prop) {
      this.isUpdate = true;
      this.jobposition = prop;
      this.$bvModal.show('m-jobposition');
    },

    handleDelete(prop) {
      this.$swal({
        title: "Hapus data ini?",
        text: "Data ini akan terhapus selamanya",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        timer: 8200,
      }).then((result) => {
        if (result.value) {
          // <-- if confirmed
          JobPositionService.delete(prop.id)
              .then(() => {
                this.$swal({
                  position: "bottom-end",
                  toast: true,
                  timer: 3000,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  icon: "success",
                  title: "Success",
                  text: "Hapus Berhasil",
                });
                this.doRefresh();
              })
              .catch((error) => {
                console.log("Gagal Terhapus", error.response);
              });
        }
      });
    },


    getRecordPaginate(dateFrom, dateTo, searchBy, searchParam, limit, page) {
      let params = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        searchBy: searchBy,
        searchParam: searchParam,
        limit: limit,
        page: page,
      };
      let loading = this.$loading.show();
      JobPositionService.getPaginate(params).then((response) => {
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
    //Refresh
    doRefresh() {
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage, this.sortBy, this.sort)
    },

    doFilterSelected(pagination) {
      this.searchBy = pagination[0];
      if (this.searchBy === "All") {
        this.searchBy = "id";
        this.searchParam = "";
        this.getRecordPaginate(
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
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage, this.sortBy, this.sort);
    },

    doSearch(props) {
      this.searchParam = props[0];
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, props[1], props[2], this.sortBy, this.sort);
    },
    //Prev Pagination
    doPrevPage(props) {
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, props[0], props[1], this.sortBy, this.sort);
    },
    //Next Pagination
    doNextPage(props) {
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, props[0], props[1], this.sortBy, this.sort);
    },

    //Search Record
    handleSearch(limit) {
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, props[0], props[1], this.sortBy, this.sort);
    },

    doChangePerPage(props) {
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, props[0], props[1], this.sortBy, this.sort);
    },

    /**
     * Button Toggle
     * @param props
     */
    doCheckToggle(props) {
      let payload = props;
      payload.active = !props.active
      let loading = this.$loading.show();
      JobPositionService.postUpdate(props.id, payload).then((response) => {
        if (response.code === 200) {
          this.doRefresh();
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    //hyver-vue Table function end
  },
};
</script>

<style scoped></style>
