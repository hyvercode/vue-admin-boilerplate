<template>
  <div class="container-fluid">
    <MyDataTable
        title="KPI Directories"
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
        :loadingAnimation="false"
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
    <b-modal id="m-kpidirectories" :title="isUpdate?'Update KPI':'Create KPI'" hide-footer>
      <form @submit.prevent="submit($event)">
        <div class="form-group mt-1 mb-2">
          <label>Code</label>
          <input
              :readonly="isUpdate"
              type="text"
              class="form-control"
              placeholder="Please input text"
              v-model="kpidirectories.kpi_code"
              required
          />
        </div>
        <div class="form-group mt-1 mb-2">
          <label>Kpi Name</label>
          <textarea
              cols="3"
              class="form-control"
              placeholder="Please input text"
              v-model="kpidirectories.kpi_name"
              required
          />
        </div>
        <div class="form-group mt-1 mb-2">
          <label>BSC</label>
          <select class="form-control form-select" v-model="kpidirectories.bsc_id" required>
            <option value="null" disabled>Choose...</option>
            <option
                v-for="item in bsc"
                :key="item.id"
                :value="item.id"
            >
              {{ item.bsc_name }}
            </option>
          </select>
        </div>
        <div class="form-group mt-1 mb-2">
          <label>KPI GROUP</label>
          <select class="form-control form-select" v-model="kpidirectories.kpi_group_id" required>
            <option value="null" disabled>Choose...</option>
            <option
                v-for="items in kpigroup"
                :key="items.id"
                :value="items.id"
            >
              {{ items.kpi_group_name }}
            </option>
          </select>
        </div>
        <div class="form-group mt-1 mb-2">
          <label>Location</label>
          <select class="form-control form-select" v-model="kpidirectories.branch_id" required>
            <option value="null" disabled>Choose...</option>
            <option
                v-for="ite in branch"
                :key="ite.id"
                :value="ite.id"
            >
              {{ ite.branch_name }}
            </option>
          </select>
        </div>
        <div class="form-group mt-1 mb-2">
          <label>Target Type</label>
          <select class="form-control form-select" v-model="kpidirectories.target_type_id" required>
            <option value="null" disabled>Choose...</option>
            <option
                v-for="items in targettype"
                :key="items.id"
                :value="items.id"
            >
              {{ items.target_type_name }}
            </option>
          </select>
        </div>
        <div class="form-group mt-1 mb-2">
          <label>Definition</label>
          <textarea
              cols="3"
              class="form-control"
              placeholder="Please input text"
              v-model="kpidirectories.definisi"
              required
          />
        </div>
        <div class="col-lg-12 mb-3">
          <label for="status" style="text-align: left">Active</label>
          <select class="form-control form-select" v-model="kpidirectories.active" required>
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
import RequestKpiDirectories from "../../payloads/request/RequestKpiDirectories";
import KpiDirectoriesService from "../../services/kpidirectories.service";
import MyDataTable from "../hyver-vue/components/table/DataTable";
import Utils from "../../helpers/Utils";
import BscService from "@/services/bsc.service";
import KpigroupService from "@/services/kpigroup.service";
import BranchService from "@/services/branch.service";
import TargettypeService from "@/services/targettype.service";

export default {
  name: "Index",
  components: {
    MyDataTable,
  },
  data() {
    return {
      kpidirectories: new RequestKpiDirectories(),
      bsc: [],
      kpigroup: [],
      branch: [],
      targettype: [],
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
          label: "Code",
          field: "kpi_code",
          numeric: true,
          html: false,
        },
        {
          label: "KPI Name",
          field: "kpi_name",
          numeric: true,
          html: false,
        },
        {
          label: "BSC",
          field: "bsc_name",
          numeric: true,
          html: false,
        },
        {
          label: "Kpi Group",
          field: "kpi_group_name",
          numeric: true,
          html: false,
        },
        {
          label: "Branch",
          field: "branch_name",
          numeric: true,
          html: false,
        },
        {
          label: "Target Type",
          field: "target_type_name",
          numeric: true,
          html: false,
        },
        {
          label: "Status",
          field: "active",
          numeric: false,
          html: false,
        },
      ],
      records: [],
      filterRecord: [
        {id: 'id', desc: "KPI ID"},
        {id: 'kpi_name', desc: "KPI Name"},
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
    this.getBsc();
    this.getKpiGroup();
    this.getBranch();
    this.getTargetTypes();
  },
  methods: {
    doClose() {
      this.$bvModal.hide('m-kpidirectories');
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      if (!this.isUpdate) {
        KpiDirectoriesService.postCreate(this.kpidirectories).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestKpiDirectories();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Kpi has been created",
            });
            this.doRefresh();
            this.$bvModal.hide('m-kpidirectories');
          } else {
            loading.hide();
            this.$bvModal.hide('m-kpidirectories');
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      } else {
        KpiDirectoriesService.postUpdate(this.kpidirectories.id, this.kpidirectories).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestKpiDirectories();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Kpi has been updated",
            });
            this.doRefresh();
            this.$bvModal.hide('m-kpidirectories');
          } else {
            loading.hide();
            this.$bvModal.hide('m-kpidirectories');
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
      this.kpidirectories = new RequestKpiDirectories();
      this.isUpdate = false;
      this.$bvModal.show('m-kpidirectories');
    },

    handleUpdate(prop) {
      this.isUpdate = true;
      this.kpidirectories = prop;
      this.$bvModal.show('m-kpidirectories');
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
          KpiDirectoriesService.delete(prop.id)
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
      KpiDirectoriesService.getPaginate(params).then((response) => {
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

    getBsc() {
      BscService.getAll().then((response) => {
        if (response.code === 200) {
          this.bsc = response.data;
        } else {
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    getKpiGroup() {
      KpigroupService.getAll().then((response) => {
        if (response.code === 200) {
          this.kpigroup = response.data;
        } else {
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    getBranch() {
      BranchService.getAll().then((response) => {
        if (response.code === 200) {
          this.branch = response.data;
        } else {
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    getTargetTypes() {
      TargettypeService.getAll().then((response) => {
        if (response.code === 200) {
          this.targettype = response.data;
        } else {
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
  },
}
</script>

<style scoped>

</style>
