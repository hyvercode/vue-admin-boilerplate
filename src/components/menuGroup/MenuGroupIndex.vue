<template>
  <div class="container-fluid">
    <DataTable v-if="pagination" :key="pagination.currentPage"
               title="Groups Menu"
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
               :command-checkbox="true"
               @onSelectAll="onSelectAll"
               @onSelect="onSelect"
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
    <modal name="my-first-modal"
           :width="500"
           height="auto"
           @before-open="beforeOpen"
           :adaptive="true"
    >

      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ idUpdate ? 'Update' : 'Create' }}</h5>
          <button type="button" class="btn-close" @click="hide"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label" for="menuGroup">Role</label>
              <select class="form-select" id="menuGroup" v-model="menu.role_name" required>
                <option value="null" disabled>Choose...</option>
                <option v-for="item in roles" :key="item.name" :value="item.name">{{ item.name }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label" for="parentMenu">Menu</label>
              <select class="form-select" id="parentMenu" v-model="menu.menus_id">
                <option value="null" disabled>Choose...</option>
                <option v-for="item in menus" :key="item.id" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="menu.active" id="checkRemember">
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
import MenuRoleService from "../../services/menuRole.service";
import RolesService from "../../services/role.service";
import RequestMenuRole from "../../payloads/request/RequestMenuRole";
import MenuService from "../../services/menu.service";

export default {
  name: "Index",
  components: {DataTable},
  data() {
    return {
      menu: new RequestMenuRole(),
      columns: [
        {
          label: "ID",
          field: "id",
          numeric: false,
          html: false,
          hidden: true,
          concatWith: false
        },
        {
          label: "role",
          field: "role_name",
          numeric: false,
          html: false,
          hidden: false,
        },
        {
          label: "menu name",
          field: "name",
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
          buttonToggle: true,
          buttonToggleDesc: [
            "Active", "Inactive"
          ]
        },
      ],
      records: [],
      searchBy: 'id',
      searchParam: '',
      sortBy: 'created_at',
      sort: 'DESC',
      filterRecord: [
        {'id': 'id', "desc": "ID Menu"},
        {'id': 'role_name', "desc": " Role Name"}
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
      idUpdate: true,
      roles: [],
      menus: [],
      selected: [],
      selectAll: false
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
      MenuRoleService.getPaginate(payload).then((response) => {
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

    /**
     * Checkbox All
     */
    onSelectAll(props) {
      console.log(props);
    },

    /**
     * Checkbox
     */
    onSelect(props) {
      console.log(props)
    },

    doRefresh() {
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage, this.sortBy, this.sort)
    },

    doFilterSelected(pagination) {
      this.searchBy = pagination[0];
      if (this.searchBy === 'All') {
        this.searchBy = 'id';
        this.searchParam = '';
        this.getPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, pagination[1], pagination[2])
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
      MenuRoleService.postUpdate(props.id, payload).then((response) => {
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
      this.getMenus();
      this.getRoles()
      if (this.idUpdate) this.getShowMenu();
    },
    getRoles() {
      let loading = this.$loading.show();
      RolesService.getAll().then((response) => {
        if (response.code === 200) {
          this.roles = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    getMenus() {
      let loading = this.$loading.show();
      MenuService.getAll().then((response) => {
        if (response.code === 200) {
          this.menus = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    getShowMenu() {
      let loading = this.$loading.show();
      MenuRoleService.getShow(this.menu.id).then((response) => {
        if (response.code === 200) {
          this.menu = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    handleSubmit() {
      let loading = this.$loading.show();
      if (!this.idUpdate) {
        MenuRoleService.postCreate(this.menu).then((response) => {
          if (response.code === 200) {
            this.menu = new RequestMenuRole();
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
        MenuRoleService.postUpdate(this.menu.id, this.menu).then((response) => {
          if (response.code === 200) {
            this.menu = new RequestMenuRole();
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
      this.idUpdate = false;
      this.$modal.show('my-first-modal')
    },
    handleUpdate(props) {
      this.menu.id = props.id
      this.idUpdate = true;
      this.$modal.show('my-first-modal')
    },
    hide() {
      this.$modal.hide('my-first-modal');
    },

    handleDelete(prop) {
      this.$swal({
        title: "Are you sure?",
        text: "This record can't be undo",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        timer: 8200,
      }).then((result) => {
        if (result.value) {
          // <-- if confirmed
          MenuRoleService.delete(prop.id)
              .then(() => {
                this.$swal({
                  position: "top-end",
                  toast: true,
                  timer: 3000,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  icon: "success",
                  title: "Success",
                  text: "Record has been deleted",
                });
                this.doRefresh();
              })
              .catch((error) => {
                console.log("Error ", error.response);
              });
        }
      });
    },
  }
}
</script>