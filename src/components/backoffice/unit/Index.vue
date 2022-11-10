<template>
  <div class="container-fluid">
    <MyDataTable
        title="Unit List"
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
              @click="(e) => handleViewMember(props.row, e)"
          >
            <i class="material-icons">people_alt</i>
          </button>
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
    <b-modal id="m-unit" :title="isUpdate?'Update Unit':'Create Unit'" hide-footer>
      <form @submit.prevent="submit($event)">
        <div class="form-group mt-1 mb-3">
          <label>Unit Name</label>
          <input
              type="text"
              class="form-control"
              placeholder="Please input text"
              v-model="unit.unit_name"
              required
          />
        </div>
        <div class="form-group mt-1 mb-3">
          <label>Head</label>
          <select class="form-control form-select" v-model="unit.head_id" required>
            <option value="null" disabled>Choose...</option>
            <option
                v-for="items in employee"
                :key="items.id"
                :value="items.id"
            >
              {{ items.first_name }} {{items.last_name}}
            </option>
          </select>
        </div>
        <div class="col-lg-12 mb-3">
          <label for="status" style="text-align: left">Active</label>
          <select class="form-control form-select" v-model="unit.active" required>
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
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import RequestUnit from "../../../payloads/request/RequestUnit";
import RequestUnitMember from "../../../payloads/request/RequestUnitMember"
import UnitService from "../../../services/unit.service";
import MyDataTable from "../../hyver-vue/components/table/DataTable";
import Utils from "../../../helpers/Utils";
import router from "@/router";
import Pages from "@/helpers/HR";
import EmployeeService from "@/services/employee.service";

export default {
  name: "Index",
  components: {
    MyDataTable,
  },
  data() {
    return {
      unit: new RequestUnit(),
      employee: "",
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
          label: "Unit Name",
          field: "unit_name",
          numeric: true,
          html: false,
        },
        {
          label: "Head ID",
          field: "head_id",
          numeric: true,
          html: false,
          hidden: true,
        },
        {
          label: "NIK",
          field: "NIK",
          numeric: true,
          html: false,
        },
        {
          label: "Head",
          field: "head_name",
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
        {id: 'id', desc: "Unit ID"},
        {id: 'unit_name', desc: "Unit Name"},
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
    this.getRecordPaginate(
        this.dateFrom,
        this.dateTo,
        this.searchBy,
        this.searchParam,
        this.pagination.perPage,
        this.pagination.currentPage
    );
    this.getAll();
  },
  methods: {

    async handleViewMember(prop) {
      await router.push({
        path: Pages.UNIT_MEMBER,
        query: {id: Utils.encrypt(prop.id), head_id: prop.head_id},
      });
    },

    doClose() {
      this.$bvModal.hide('m-unit');
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      if (!this.isUpdate) {
        UnitService.postCreate(this.unit).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestUnit();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Unit has been created",
            });
            this.doRefresh();
            this.$bvModal.hide('m-unit');
          } else {
            loading.hide();
            this.$bvModal.hide('m-unit');
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      } else {
        UnitService.postUpdate(this.unit.id, this.unit).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestUnit();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Unit has been updated",
            });
            this.doRefresh();
            this.$bvModal.hide('m-unit');
          } else {
            loading.hide();
            this.$bvModal.hide('m-unit');
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      }
    },

    handleCreate() {
      this.unit = new RequestUnit();
      this.isUpdate = false;
      this.$bvModal.show('m-unit');
    },

    handleAddMember() {
      this.unit = new RequestUnitMember();
      this.isUpdate = false;
      this.$bvModal.show('m-addmember');
    },

    handleUpdate(prop) {
      this.isUpdate = true;
      this.unit = prop;
      this.$bvModal.show('m-unit');
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
          UnitService.delete(prop.id)
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

    getAll() {
      let loading = this.$loading.show();
      EmployeeService.getAll().then((response) => {
        if (response.code === 200) {
          this.employee = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },

    //hyver-vue Table function start
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
      UnitService.getPaginate(params).then((response) => {
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
      UnitService.postUpdate(props.id, payload).then((response) => {
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
}
</script>

<style scoped>

</style>
