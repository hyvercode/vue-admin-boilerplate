<template>
  <div class="container-fluid">
    <div class="container-fluid px-3 mt-5">
      <div class="row mb-3">
        <div class="col-6 d-flex justify-content-between ps-0">
          <div class="me-lg-3">
            <h5 class="form-title">Read Notification</h5>
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
      <div class="col-12">
        <div class="card px-3 py-3">
          <div class="list-group" style="max-height: 500px">
            <div class="list-group-item"
                 :style="[ message.read?{ 'background-color':'#FFFFFF' }:{ 'background-color':'#F2F4F6' }]">
              <div class="row">
                <div class="col-1">
                  <img :src="message.icon" class="rounded" :alt="message.id" width="40">
                </div>
                <div class="col-10">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ message.title }}</h5>
                    <small class="text-danger" style="cursor: pointer"
                           @click.prevent="handleDelete(message.id)">Delete</small>
                  </div>
                  <p class="mb-1">{{ message.content }}</p>
                  <div class="d-flex w-100 justify-content-between">
                    <small class="text-warning">{{ message.type }}</small>
                    <small class="text-warning">{{ message.created_at }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationService from "../../services/notification.service";
import utils from "../../helpers/Utils";
import router from "../../router";
import publicPages from "../../helpers/Pages";

export default {
  name: "Read",
  data() {
    return {
      message: {
        id: null,
        title: null,
        read: null,
        icon: null,
        type: null,
        created_at: null,
        content: null
      }
    }
  },
  mounted() {
    this.handleRead()
  },
  methods: {
    handleDelete(id) {
      let loading = this.$loading.show();
      NotificationService.delete(id).then(response => {
        if (response.code === 200) {
          loading.hide();
          this.$store.dispatch('notification/getCounts');
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Message has been deleted",
          });
          router.push(pages.NOTIFICATIONS)
        } else {
          loading.hide();
          router.push(pages.NOTIFICATIONS)
        }
      })
    },
    handleRead() {
      let loading = this.$loading.show();
      NotificationService.postRead(utils.decrypt(this.$route.query.id)).then(response => {
        if (response.code === 200) {
          this.message = response.data
          this.$store.dispatch('notification/getCounts');
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
    }
  }
}
</script>