<template>
  <div class="container-fluid">
    <div class="container-fluid px-3 mt-5">
      <div class="row mb-3">
        <div class="col-6 d-flex justify-content-between ps-0">
          <div class="me-lg-3">
            <h5 class="form-title">Notifications</h5>
          </div>
        </div>
        <div class="col-6 px-0 text-end">
          <div class="btn-group">
            <button class="btn btn-submit text-black" @click="$router.go(-1)">
              <i class="material-icons">arrow_back</i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 col-md-12 col-sm-12 col-12">
        <div class="card px-3 py-3">
          <div v-for="item in notifications" :key="item.id" class="list-group" style="max-height: 500px">
            <div class="list-group-item" @click.prevent="handleRead(item.id)"
                 :style="[ item.read?{ 'background-color':'#FFFFFF' }:{ 'background-color':'#F2F4F6' }]">
              <div class="row">
                <div class="col-1">
                  <img :src="item.icon" class="rounded" :alt="item.id">
                </div>
                <div class="col-10">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ item.title }}</h5>
                    <small class="text-warning">{{ item.created_at }}</small>
                  </div>
                  <p class="mb-1" v-if="item.content">{{ subStr(item.content) }}</p>
                  <div class="d-flex justify-content-between">
                    <small class="text-warning">{{ item.type }}</small>
                    <small class="text-danger" style="cursor: pointer"
                           @click.prevent="handleDelete(item.id)">Delete</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row m-1">
            <div class="col-lg-8 col-md-8 col-sm-6 col-6">
              <div class="py-4">
                <div class="row">
                  <div class="col-md-2 mt-2">
                    <label>Records :</label>
                  </div>
                  <div class="col-md-2">
                    <select class="form-control" v-model="limit" @change="handleChange">
                      <option v-for="(item,index) in records" :key="index" v-bind:value="item">{{ item }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-6">
              <div class="table-pagination py-4">
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
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router";
import Pages from "../../helpers/Pages";
import Utils from "../../helpers/Utils";
import NotificationService from "../../services/notification.service";

export default {
  name: "index",
  data() {
    return {
      notifications: [],
      searchBy: 'id',
      searchParam: '',
      limit: 10,
      records: [5, 10, 30, 50, 100, 500, 1000],
      pagination: {
        perPage: 10,
        currentPage: 1,
        lastPage: '',
        nextPageUrl: '',
        prevPageUrl: ''
      },
    }
  },
  computed: {
    paginate() {
      return this.pagination;
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
      return Utils.sunStr(str, 0, 70);
    },

    async handleRead(id) {
      await router.push({path: Pages.NOTIFICATION_READ, query: {id: Utils.encrypt(id)}});
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