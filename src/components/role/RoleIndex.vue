<template>
  <div class="container-fluid">
    <DataTable v-if="pagination" :key="pagination.currentPage"
               title="Roles (ACL)"
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
          <form role="form">
            <div class="mb-3">
              <label class="form-label" for="href">Role Name</label>
              <input type="text" class="form-control" id="name" v-model="role.name" placeholder="Please input" required>
            </div>
            <div class="mb-3">
              <label class="form-label" for="href">Description</label>
              <textarea type="text" class="form-control" rows="3" v-model="role.description"
                        placeholder="Please input"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label" for="href">Access Privileges :</label>
            </div>
            <div class="px-5">
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="role.create" id="checkRemember">
                  <label class="form-check-label" for="checkRemember">Create</label>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="role.read" id="checkRemember">
                  <label class="form-check-label" for="checkRemember">Read</label>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="role.update" id="checkRemember">
                  <label class="form-check-label" for="checkRemember">Update</label>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="role.delete" id="checkRemember">
                  <label class="form-check-label" for="checkRemember">delete</label>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="role.administration" id="checkRemember"
                         @change="changeAdministration">
                  <label class="form-check-label" for="checkRemember">Administration</label>
                </div>
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
import RoleService from "../../services/role.service";
import RequestRole from "../../payloads/request/RequestRole";

export default {
  name: "Index",
  components: {DataTable},
  data() {
    return {
      role: new RequestRole(),
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
          label: "role name",
          field: "name",
          numeric: false,
          html: false,
          hidden: false,
        },
        {
          label: "description",
          field: "description",
          numeric: false,
          html: false,
          hidden: false,
        },
        {
          label: "create",
          field: "create",
          numeric: false,
          html: false,
          hidden: false,
          boolean: true,
          booleanDesc: [
            "True", "False"
          ]
        },
        {
          label: "read",
          field: "read",
          numeric: false,
          html: false,
          hidden: false,
          boolean: true,
          booleanDesc: [
            "True", "False"
          ]
        },
        {
          label: "update",
          field: "update",
          numeric: false,
          html: false,
          hidden: false,
          boolean: true,
          booleanDesc: [
            "True", "False"
          ]
        },
        {
          label: "delete",
          field: "delete",
          numeric: false,
          html: false,
          hidden: false,
          boolean: true,
          booleanDesc: [
            "True", "False"
          ]
        }
      ],
      records: [],
      searchBy: 'id',
      searchParam: '',
      sortBy: 'created_at',
      sort: 'DESC',
      filterRecord: [
        {id: 'id', desc: "ID Role"},
        {id: 'name', desc: "Role Name"}
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
    changeAdministration() {
      if (this.role.administration) {
        this.role.create = true;
        this.role.read = true;
        this.role.update = true;
        this.role.delete = true;
      }
    },
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
      RoleService.getPaginate(payload).then((response) => {
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

    beforeOpen(event) {
      if (this.idUpdate) this.getShow();
    },

    getShow() {
      let loading = this.$loading.show();
      RoleService.getShow(this.role.id).then((response) => {
        if (response.code === 200) {
          this.role = response.data;
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
        RoleService.postCreate(this.role).then((response) => {
          if (response.code === 200) {
            this.role = new RequestRole();
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
        RoleService.postUpdate(this.role.id, this.role).then((response) => {
          if (response.code === 200) {
            this.role = new RequestRole();
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
      this.role.id = props.id
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
          RoleService.delete(prop.id)
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