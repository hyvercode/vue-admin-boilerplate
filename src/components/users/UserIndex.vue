<template>
  <div class="container-fluid">
    <DataTable v-if="pagination" :key="pagination.currentPage"
               title="Users"
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
               v-on:onChangeRowPage="doChangePerPage"
               v-on:onPreviousPage="doPrevPage"
               v-on:onNextPage="doNextPage"
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
               :create-button="true"
               v-on:onCreate="handleCreate"
               :refreshable="true"
               v-on:onRefresh="doRefresh"
               :loadingAnimation="false"
               :mode="true"
               :kanban="true"
               :columnsKanban="columnsKanban"
               :commandContact="true"
               @onRowClick="handleUpdate"
               @onCheckToggle="doCheckToggle"
               @onChangeFilter="doFilterSelected"
               @onChangeSearch="doSearch"
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
            <i class="material-icons tbl-material-icons text-info">edit</i>
          </button>
          <button
              class="btn btn-flat nopadding"
              @click="(e) => handleDelete(props.row, e)"
          >
            <i class="material-icons tbl-material-icons text-danger">delete</i>
          </button>
        </td>
      </template>
    </DataTable>

    <!--    modal -->
    <modal name="my-modal"
           :width="500"
           height="auto"
           :adaptive="true"
           @before-open="beforeOpen"
    >

      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ isUpdate ? 'Update' : 'Create' }}</h5>
          <button type="button" class="btn-close" @click="hide"></button>
        </div>
        <div class="modal-body">
          <form role="form">
            <div class="form-group mb-3">
              <label for="Name">Employee Name</label>
              <select
                  type="text"
                  class="form-select"
                  v-model="user.employee_id"
                  required
              >
                <option disabled value="">Choose...</option>
                <option v-for="item in employees" :key="item.id" :value="item.id">{{ item.first_name }}
                  {{ item.last_name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" maxlength="30" min="6" class="form-control" v-model="user.email"
                     placeholder="Please input"
                     required>
            </div>
            <div class="mb-3">
              <label class="form-label" for="menuName">Username</label>
              <input type="text" class="form-control" maxlength="30" min="3" v-model="user.username"
                     placeholder="Please input"
                     required>
            </div>
            <div class="mb-3" v-if="!isUpdate">
              <label class="form-label" for="menuName">Password</label>
              <input type="password" maxlength="30" min="6" class="form-control" v-model="user.password"
                     placeholder="Please input"
                     required>
            </div>
            <div class="form-group mb-3">
              <label for="Name">Roles (ACL)</label>
              <select
                  type="text"
                  class="form-select"
                  v-model="user.menu_roles"
                  required
              >
                <option disabled value="">Choose...</option>
                <option v-for="item in roles" :key="item.id" :value="item.name">{{ item.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="Name">Avatar</label>
              <input
                  type="file"
                  accept="image/*"
                  @change="onFileChange"
                  class="form-control">
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="user.active" id="checkRemember">
                <label class="form-check-label" for="checkRemember">Active</label>
              </div>
            </div>
            <div class="mb-3 d-flex justify-content-end">
              <button type="button" class="btn btn-secondary me-2" @click="hide">Cancel</button>
              <button type="button" class="btn btn-primary" @click="handleSubmit">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </modal>

  </div>
</template>

<script>
import DataTable from "../hyver-vue/components/DataTable";
import UserService from "../../services/user.service";
import RequestUser from "../../payloads/request/RequestUser";
import EmployeeService from "../../services/employee.service";
import RoleService from "../../services/role.service";

export default {
  name: "UserIndex",
  components: {DataTable},
  data() {
    return {
      user: new RequestUser(),
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
          name: "username",
          size: 30,
          numeric: false,
          html: false,
          image: true
        },
        {
          label: "username",
          field: "username",
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
          label: "roles",
          field: "menu_roles",
          numeric: false,
          html: false,
          hidden: false,
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
      columnsKanban: [
        {
          label: "Avatar",
          field: "avatar",
          name: "username",
          size: 70,
          numeric: false,
          html: false,
          image: true,
          hidden: true
        },
        {
          label: "Username",
          field: "username",
          numeric: false,
          html: false,
        },
        {
          label: "Email",
          field: "email",
          numeric: false,
          html: false,
        },
        {
          label: "Roles",
          field: "menu_roles",
          numeric: false,
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
        {
          label: "ID",
          field: "id",
          hidden: true
        },
      ],
      records: [],
      searchBy: 'id',
      searchParam: '',
      sortBy: 'created_at',
      sort: 'DESC',
      filterRecord: [
        {'id': 'id', "desc": "ID User"},
        {'id': 'username', "desc": "Username"},
        {'id': 'email', "desc": "Email"}
      ],
      pagination: {
        recordsPerPage: [5, 10, 50, 100, 500, 1000, 5000, 10000],
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: "",
        prevPageUrl: "",
        total: 0,
      },
      isUpdate: true,
      employees: [],
      roles: [],
    }
  },
  computed: {
    paginate() {
      return this.pagination;
    }
  },
  mounted() {
    this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage, this.sortBy, this.sort)
  },
  methods: {
    getRecordPaginate(dateFrom, dateTo, searchBy, searchParam, perPage, currentPage, sortBy, sort) {
      let loading = this.$loading.show();
      let payload = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        perPage: perPage,
        currentPage: currentPage,
        searchBy: searchBy,
        searchParam: searchParam,
        sortBy: sortBy,
        sort: sort,
      }
      UserService.getPaginate(payload).then((response) => {
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
      UserService.postUpdate(props.id, payload).then((response) => {
        if (response.code === 200) {
          this.doRefresh();
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },

    beforeOpen(event) {
      this.getEmployees();
      this.getRoles();
      if (this.isUpdate) this.getShow();
    },

    getEmployees() {
      let loading = this.$loading.show();
      EmployeeService.getAll().then((response) => {
        if (response.code === 200) {
          this.employees = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Categories" + response.message, "error");
        }
      });
    },

    getRoles() {
      let loading = this.$loading.show();
      RoleService.getAll().then((response) => {
        if (response.code === 200) {
          this.roles = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Categories" + response.message, "error");
        }
      });
    },

    getShow() {
      let loading = this.$loading.show();
      UserService.getShow(this.user.id).then((response) => {
        if (response.code === 200) {
          this.user = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    handleSubmit() {
      let loading = this.$loading.show();
      if (!this.isUpdate) {
        UserService.postCreate(this.user).then((response) => {
          if (response.code === 200) {
            this.user = new RequestUser();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Record has been created",
            });
            this.doRefresh();
            this.hide();
          } else {
            loading.hide();
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      } else {
        UserService.postUpdate(this.user.id, this.user).then((response) => {
          if (response.code === 200) {
            this.user = new RequestUser();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Record has been updated",
            });
            this.doRefresh();
            this.hide();
          } else {
            loading.hide();
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      }
    },
    handleCreate() {
      this.user = new RequestUser();
      this.isUpdate = false;
      this.$modal.show('my-modal')
    },

    handleUpdate(props) {
      this.user.id = props.id
      this.isUpdate = true;
      this.$modal.show('my-modal')
    },

    hide() {
      this.$modal.hide('my-modal');
    },
    /**
     * Image Change
     * @param e
     */
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    /**
     * Convert image to bas64
     * @param file
     */
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.user.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },


  }
}
</script>