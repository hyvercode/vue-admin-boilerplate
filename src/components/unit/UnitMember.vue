<template>
  <div class="container-fluid">
    <div class="container-fluid px-3 mt-5">
      <h1></h1>
      <div class="row">
        <div class="col-lg-12 mb-3 px-3">
          <div class="card px-3">
            <form-header title="Unit Head"></form-header>
            <div class="d-flex flex-row mb-4">
              <img
                  :src="employee_head.images"
                  class="profile-img"
                  alt="No Image"
                  style="margin-right: 30px !important; margin-left: 20px"
              />
              <div>
                <h6 class="mt-3">
                  {{ employee_head.NIK }}
                </h6>
                <h6 class="mt-1">
                  {{ employee_head.first_name + " " + employee_head.last_name }}
                </h6>
                <h6 class="mt-1">
                  {{ employee_head.branch_name }}
                </h6>
                <h6 class="mt-1">
                  JG : {{ employee_head.job_grade }} / PG : {{ employee_head.personal_grade }}
                </h6>
              </div>
            </div>
            <div class="container-fluid">
              <div class="row mb-4">
                <div class="col-lg-6">
                  <label class="h6">Unit</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="employee_head.unit_name"
                      disabled
                  />
                </div>
                <div class="col-lg-6">
                  <label class="h6">Job Title</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="employee_head.job_position_name"
                      disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <MyDataTable
              title="Unit Member"
              :arrow-back="false"
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
                    @click="(e) => handleDelete(props.row, e)"
                >
                  <i class="material-icons white-text">delete</i>
                </button>
              </td>
            </template>
          </MyDataTable>
        </div>
        <b-modal id="m-unit" :title="isUpdate?'Update Unit Member':'Create Unit Member'" hide-footer>
          <form @submit.prevent="submit($event)">
            <div class="form-group mt-1 mb-3">
              <label>Member Name</label>
              <select class="form-control form-select" v-model="unit.member_id" required>
                <option value="null" disabled>Choose...</option>
                <option
                    v-for="items in employee"
                    :key="items.id"
                    :value="items.id"
                >
                  {{ items.first_name }} {{ items.last_name }}
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
              <input type="submit" class="btn btn-primary" value="Submit">
            </div>
          </form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import RequestUnitMember from "../../payloads/request/RequestUnitMember";
import UnitMemberService from "../../services/unitmember.service";
import UnitService from "../../services/unit.service";
import EmployeeService from "@/services/employee.service";
import MyDataTable from "../mih/components/DataTable";
import Utils from "../../helpers/Utils";
import router from "@/router";
import Pages from "@/helpers/Pages";
import FormHeader from "@/components/navigation/FormHeader";

export default {
  name: "UnitMember",
  components: {
    MyDataTable,
    FormHeader
  },
  data() {
    return {
      unit: new RequestUnitMember(),
      title: "Unit ",
      units: "",
      employee: "",
      employee_head: "",
      head: "",
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
          label: "Nama Member",
          field: "member_name",
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
        {id: 'id', desc: "Member ID"},
        {id: 'member_name', desc: "Nama Member"},
        {id: 'active', desc: "Active"}],
      pagination: {
        recordsPerPage: [5, 10, 50, 100, 500, 1000],
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: "",
        prevPageUrl: "",
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
    this.getShow();
    this.getAll();
    this.getHead();
  },
  methods: {
    async handleViewMember(prop) {
      await router.push({
        path: Pages.UNIT_MEMBER,
        query: {id: Utils.encrypt(prop.id)},
      });
    },

    doClose() {
      this.$bvModal.hide('m-unit');
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      if (!this.isUpdate) {
        this.unit.head_id = this.$route.query.head_id
        this.unit.unit_id = Utils.decrypt(this.$route.query.id)
        UnitMemberService.postCreate(this.unit).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestUnitMember();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Member has been created",
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
        UnitMemberService.postUpdate(this.unit.id, this.unit).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestUnitMember();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Member has been updated",
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
      this.unit = new RequestUnitMember();
      this.isUpdate = false;
      this.$bvModal.show('m-unit');
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
          UnitMemberService.delete(prop.id)
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
        id: Utils.decrypt(this.$route.query.id)
      };
      let loading = this.$loading.show();
      UnitMemberService.getPaginate(params).then((response) => {
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

    getShow() {
      let loading = this.$loading.show();
      UnitService.getShow(Utils.decrypt(this.$route.query.id)).then((response) => {
        if (response.code === 200) {
          this.units = response.data;
          this.title = "Unit " + this.units.unit_name + " - " + this.units.head_id;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
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

    getHead() {
      let loading = this.$loading.show();
      EmployeeService.getShow(this.$route.query.head_id).then((response) => {
        if (response.code === 200) {
          this.employee_head = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
  },
}
</script>

<style scoped>

</style>
