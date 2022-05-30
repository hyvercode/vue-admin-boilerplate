<template>
  <div class="container-fluid">
    <MyDataTable
        title="E-Ticket IssueTypes"
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
        v-on:onChangeRowPage="handleChangeRecords"
        v-on:onPreviousPage="prevPage"
        v-on:onNextPage="nextPage"
        :searching="true"
        v-on:onChangeSearch="doSearch"
        v-on:onEnterSearch="doSearch"
        :filter="true"
        :filterRecord="filterRecord"
        v-on:onChangeFilter="doFilterSelected"
        :filterDate="false"
        v-on:onChangeDate="doFilterDate"
        :exportable="true"
        :printable="true"
        :create-button="true"
        v-on:onCreate="handleCreate"
        :refreshable="true"
        v-on:onRefresh="doRefresh"
        @onCheckToggle="doCheckToggle"
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
    <b-modal id="m-jobposition" :title="isUpdate?'Update E-Ticket IssueTypes':'Create E-Ticket IssueTypes'" hide-footer>
      <form @submit.prevent="submit($event)">
        <div class="form-group mb-3">
          <label>IssueTypes Name <span class="mandatory">*</span></label>
          <input
              type="text"
              class="form-control"
              placeholder="Please input text"
              v-model="eticketissuetype.issue_type_name"
              required
          />
        </div>
        <div class="col-lg-12 mb-3">
          <label for="NIK" style="text-align: left">Active <span class="mandatory">*</span></label>
          <select class="form-control form-select" v-model="eticketissuetype.active" required>
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
          <button class="btn btn-primary" style="margin-right: 5px" @click.prevent="doClose">Cancel</button>
          <input type="submit" class="btn btn-primary" value="Submit">
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import MyDataTable from "../../hyver-vue/components/DataTable";
import Utils from "../../../helpers/Utils";
import RequestEticketIssueType from "@/payloads/request/RequestEticketIssueType";
import EticketissuetypeService from "@/services/eticketissuetype.service";

export default {
  name: "IndexIssueType",
  components: {
    MyDataTable,
  },
  data() {
    return {
      eticketissuetype: new RequestEticketIssueType(),
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
          label: "IssueType Name",
          field: "issue_type_name",
          numeric: true,
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
      ],
      records: [],
      filterRecord: [
        {id: 'id', desc: "Issue Type ID"},
        {id: 'issue_type_name', desc: "Issue Type Name"},
        {id: 'active', desc: "Active"}],
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
    this.getPaginate(
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
        EticketissuetypeService.postCreate(this.eticketissuetype).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestEticketIssueType();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "ETicket Issue Type has been created",
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
        EticketissuetypeService.postUpdate(this.eticketissuetype.id, this.eticketissuetype).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestEticketIssueType();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "ETicket Issue Type has been updated",
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
    doRefresh() {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          this.pagination.perPage,
          this.pagination.currentPage
      );
    },

    handleCreate() {
      this.isUpdate = false;
      this.$bvModal.show('m-jobposition');
    },

    handleUpdate(prop) {
      this.isUpdate = true;
      this.eticketissuetype = prop;
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
          EticketissuetypeService.delete(prop.id)
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

    doCheckToggle(props) {
      let payload = props;
      payload.active = !props.active
      let loading = this.$loading.show();
      EticketissuetypeService.postUpdate(props.id, payload).then((response) => {
        if (response.code === 200) {
          this.doRefresh();
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },

    getPaginate(dateFrom, dateTo, searchBy, searchParam, limit, page) {
      let params = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        searchBy: searchBy,
        searchParam: searchParam,
        limit: limit,
        page: page,
      };
      let loading = this.$loading.show();
      EticketissuetypeService.getPaginate(params).then((response) => {
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
    //Prev Pagination
    prevPage(limit) {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          limit[0],
          limit[1]
      );
    },
    //Next Pagination
    nextPage(limit) {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          limit[0],
          limit[1]
      );
    },

    //Search Record
    handleSearch(limit) {
      this.getPaginate(this.searchBy, this.searchParam, limit[0], limit[1]);
    },

    handleChangeRecords(limit) {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          limit[0],
          limit[1]
      );
    },
  },
};
</script>

<style scoped></style>
