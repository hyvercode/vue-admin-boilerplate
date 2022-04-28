<template>
  <div class="container-fluid">
    <form-header
        title="Inbox"
    />
    <div class="row">
      <div class="col-lg-3 col-md-12 col-sm-12 col-12">
        <div class="card px-3 py-3">
          <div v-for="item in notifications" :key="item.id" class="list-group mt-1">
            <div class="list-group-item" @click.prevent="handleRead(item)"
                 :style="[ item.read?{ 'background-color':'#FFFFFF' }:{ 'background-color':'#F2F4F6' }]">
              <div class="row">
                <div class="col-2">
                  <img alt="No Image" v-if="item.images" :src="item.images"
                       class="avatar-xl rounded-circle mx-auto mt-n7 mb-4">
                  <avatar v-else :username="item.first_name" :size="size"
                          class="avatar-xl rounded-circle mx-auto mt-n7 mb-4"></avatar>
                </div>
                <div class="col-10">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ item.subject }}</h5>
                    <small class="text-info" style="font-size: 9px">{{
                        item.created_at | moment("DD MMMM YYYY HH:mm")
                      }}</small>
                  </div>
                  <p class="mb-1" v-if="item.body">{{ subStr(item.body) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="notification" class="col-lg-9 col-md-12 col-sm-12 col-12">
        <div class="card px-3 py-3" style="min-height: 1020px">
          <div class="row">
            <div class="col-6">
              <span class="d-flex justify-content-start">
                 <h5>{{ notification.subject }}</h5>
              </span>
            </div>
            <div class="col-6">
               <span class="d-flex justify-content-end">
                <button type="button" class="btn btn-youtube btn-sm d-inline-flex align-items-center">
                  <i class="material-icons">delete_forever</i>Delete
                </button>
              </span>
              <span class="d-flex justify-content-end"><small
                  class="text-info mt-1">{{ notification.created_at | moment("DD MMMM YYYY HH:mm") }}</small></span>
            </div>
          </div>
          <div class="row">
            <hr class="mt-2">
            <span v-html="notification.body"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-1">
      <div class="col-lg-8 col-md-8 col-sm-6 col-6">
        <div class="py-1">
          <div class="row">
            <div class="col-md-2 mt-2">
              <label>Records :</label>
            </div>
            <div class="col-md-2">
              <select class="form-select" v-model="limit" @change="handleChange">
                <option v-for="(item,index) in records" :key="index" v-bind:value="item">{{ item }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-6">
        <div class="table-pagination py-1">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" href="#"
                   v-on:click.prevent="prevPage($event)">Previous</a>
              </li>
              <li class="page-item disabled"><a class="page-link" href="#" disabled>{{
                  pagination.currentPage
                }}</a>
              </li>
              <li class="page-item disabled"><a class="page-link" href="#" disabled>/</a></li>
              <li class="page-item disabled"><a class="page-link" href="#" disabled>{{
                  pagination.lastPage
                }}</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#"
                   v-on:click.prevent="nextPage($event)">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router";
import Pages from "../../helpers/Pages";
import Utils from "../../helpers/Utils";
import NotificationService from "../../services/notification.service";
import FormHeader from "../navigation/FormHeader";
import avatar from 'vue-avatar';

export default {
  name: "index",
  components: {FormHeader, avatar},
  data() {
    return {
      notifications: [],
      searchBy: 'id',
      searchParam: '',
      size: 30,
      limit: 10,
      records: [5, 10, 30, 50, 100, 500, 1000],
      pagination: {
        perPage: 10,
        currentPage: 1,
        lastPage: '',
        nextPageUrl: '',
        prevPageUrl: ''
      },
      reads: null
    }
  },
  computed: {
    paginate() {
      return this.pagination;
    },
    notification() {
      return this.reads;
    }
  },
  mounted() {
    this.getPaginate(this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
  },
  methods: {
    doRefresh() {
      this.getPaginate(this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
    },

    subStr(str) {
      return Utils.sunStr(str, 0, 20);
    },

    async handleRead(params) {
      this.reads = params;
    },

    handleDelete(id) {
      let loading = this.$loading.show();
      NotificationService.delete(id).then(response => {
        if (response.code === 200) {
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Message has been deleted",
          });
          this.doRefresh()
        } else {
          loading.hide();
          this.$swal.fire(
              'Error!',
              response.message,
              'error'
          )
        }
      })
    },
    getPaginate(searchBy, searchParam, limit, page) {
      let params = {
        searchBy: searchBy,
        searchParam: searchParam,
        limit: limit,
        page: page,
        sortBy: 'DESC'
      }
      let loading = this.$loading.show();
      NotificationService.getPaginate(params).then(response => {
        if (response.code === 200) {
          this.notifications = response.data.data;
          this.reads = response.data.data[0]
          this.pagination = {
            currentPage: response.data.current_page,
            perPage: response.data.per_page,
            lastPage: response.data.last_page,
            prevPageUrl: response.data.prev_page_url,
            nextPageUrl: response.data.next_page_url
          }
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire(
              'Error!',
              response.message,
              'error'
          )
        }
      })
    },
    //Prev Pagination
    prevPage() {
      if (this.pagination.prevPageUrl) {
        this.pagination.currentPage--;
        this.getPaginate(this.searchBy, this.searchParam, this.limit, this.pagination.currentPage)
      }
    },

    //Next Pagination
    nextPage() {
      if (this.pagination.nextPageUrl) {
        this.pagination.currentPage++;
        this.getPaginate(this.searchBy, this.searchParam, this.limit, this.pagination.currentPage)
      }
    },
    //Search Record
    handleChange() {
      this.searchParam = '';
      this.getPaginate(this.searchBy, this.searchParam, this.limit, 1)
    },
  }
}
</script>