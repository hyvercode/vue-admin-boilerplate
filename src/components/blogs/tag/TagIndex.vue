<template>
  <div class="container-fluid">
    <DataTable v-if="pagination" :key="pagination.currentPage"
               title="Blog Tag"
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
               @onChangeDate="doFilterDate"
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
            <i class="material-icons tbl-material-icons  text-info">edit</i>
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
          <h5 class="modal-title">{{ idUpdate ? 'Update' : 'Create' }}</h5>
          <button type="button" class="btn-close" @click="hide"></button>
        </div>
        <div class="modal-body">
          <form role="form">
            <div class="mb-3">
              <label class="form-label" for="menuName">Tags Name</label>
              <input type="text" class="form-control" v-model="tags.tag_name" placeholder="Please input"
                     required>
            </div>
            <div class="mb-3">
              <label class="form-label" for="href">Tags Slug</label>
              <input type="text" class="form-control" v-model="tags.tag_slug" placeholder="Please input"
                     required>
            </div>
            <div class="mb-3">
              <label class="form-label" for="href">Tags Descriptions</label>
              <textarea cols="5" rows="5" class="form-control" v-model="tags.descriptions"
                        placeholder="Please input" required></textarea>
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
import DataTable from "../../hyver-vue/components/DataTable";
import BlogTagService from "../../../services/blogTag.service";
import RequestBlogTag from "../../../payloads/request/RequestBlogTag";

export default {
  name: "tagsIndex",
  components: {DataTable},
  data() {
    return {
      tags: new RequestBlogTag(),
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
          label: "tag name",
          field: "tag_name",
          numeric: false,
          html: false,
          hidden: false,
        },
        {
          label: "tag slug",
          field: "tag_slug",
          numeric: false,
          html: false,
          hidden: false,
        },
        {
          label: "descriptions",
          field: "descriptions",
          numeric: false,
          html: false,
          hidden: false
        },
        {
          label: "Update At",
          field: "updated_at",
          numeric: false,
          html: false,
          hidden: false,
          date: true,
          dateFormat: "DD MMMM YYYY"
        },
      ],
      records: [],
      searchBy: 'id',
      searchParam: '',
      sortBy: 'created_at',
      sort: 'DESC',
      filterRecord: [
        {'id': 'id', "desc": "ID"},
        {'id': 'tag_name', "desc": "Tag Name"},
        {'id': 'tag_slug', "desc": "Tag Slug"},
        {'id': 'descriptions', "desc": "Descriptions"},
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
      menuList: [],
      menus: []
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
    /**
     * Get regords pagination
     * @param dateFrom
     * @param dateTo
     * @param searchBy
     * @param searchParam
     * @param perPage
     * @param currentPage
     * @param sortBy
     * @param sort
     */
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
      BlogTagService.getPaginate(payload).then((response) => {
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
     * Refresh datatable
     */
    doRefresh() {
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage, this.sortBy, this.sort)
    },

    /**
     * Filter selected datatable
     * @param pagination
     */
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

    /**
     * Filter date datatable
     * @param selectedDate
     */
    doFilterDate(selectedDate) {
      this.dateFrom = selectedDate[0];
      this.dateFrom = selectedDate[1];
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage, this.sortBy, this.sort);
    },

    /**
     * Searching action
     * @param props
     */
    doSearch(props) {
      this.searchParam = props[0];
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, props[1], props[2], this.sortBy, this.sort);
    },

    /**
     * Prev page datatable
     * @param props
     */
    doPrevPage(props) {
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, props[0], props[1], this.sortBy, this.sort);
    },

    /**
     * Netx page datatable
     * @param props
     */
    doNextPage(props) {
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, props[0], props[1], this.sortBy, this.sort);
    },

    /**
     * Search datatable
     * @param limit
     */
    handleSearch(limit) {
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, props[0], props[1], this.sortBy, this.sort);
    },

    /**
     * Change datatable record perpage
     * @param props
     */
    doChangePerPage(props) {
      this.getRecordPaginate(this.dateFrom, this.dateTo, this.searchBy, this.searchParam, props[0], props[1], this.sortBy, this.sort);
    },

    /**
     * Delete
     * @param prop
     */
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
          BlogTagService.delete(prop.id)
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
    beforeOpen(event) {
      if (this.idUpdate) this.getShow();
    },
    getShow() {
      let loading = this.$loading.show();
      BlogTagService.getShow(this.tags.id).then((response) => {
        if (response.code === 200) {
          this.tags = response.data;
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
        BlogTagService.postCreate(this.tags).then((response) => {
          if (response.code === 200) {
            this.tags = new RequestBlogTag();
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
        BlogTagService.postUpdate(this.tags.id, this.tags).then((response) => {
          if (response.code === 200) {
            this.tags = new RequestBlogTag();
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
      this.$modal.show('my-modal')
    },
    handleUpdate(props) {
      this.tags.id = props.id
      this.idUpdate = true;
      this.$modal.show('my-modal')
    },
    hide() {
      this.$modal.hide('my-modal');
    },

  }
}
</script>
