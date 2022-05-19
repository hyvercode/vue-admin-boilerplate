<template>
  <div class="container-fluid">
    <DataTable v-if="pagination" :key="pagination.currentPage"
               title="Blog Post"
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
               create-button-title="Create Post"
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
  </div>
</template>

<script>
import DataTable from "../../hyver-vue/components/DataTable";
import BlogPostService from "../../../services/blogPost.service";
import router from "../../../router";
import Pages from "../../../helpers/Blog";
import Utils from "../../../helpers/Utils";

export default {
  name: "PostIndex",
  components: {DataTable},
  data() {
    return {
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
          label: "title",
          field: "title",
          numeric: false,
          html: false,
          hidden: false,
        },
        {
          label: "tags",
          field: "tag",
          numeric: false,
          html: false,
          hidden: false,
        },
        {
          label: "published",
          field: "published",
          numeric: false,
          html: false,
          hidden: false,
          buttonToggle: true,
          buttonToggleDesc: [
            "Published", "Draft"
          ]
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
        {'id': 'id', "desc": "ID Post"},
        {'id': 'title', "desc": "Title"},
        {'id': 'published', "desc": "Published =1 / Draft=0"}
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
     * Create
     */
    handleCreate() {
      router.push(Pages.BLOG_POST_CREATE);
    },

    /**
     * Update
     * @param prop
     * @returns {Promise<void>}
     */
    async handleUpdate(props) {
      await router.push(`/blogs/post/update/${props.id}/${props.slug}`);
    },

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
      BlogPostService.getPaginate(payload).then((response) => {
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
     * Button Toggle
     * @param props
     */
    doCheckToggle(props) {
      let payload = props;
      payload.published = !props.published
      let loading = this.$loading.show();
      BlogPostService.postPublished(props.id, payload).then((response) => {
        if (response.code === 200) {
          this.doRefresh();
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
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
          BlogPostService.delete(prop.id)
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