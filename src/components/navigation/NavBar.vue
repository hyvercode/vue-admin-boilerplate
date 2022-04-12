<template>
  <div>
    <nav class="sb-topnav navbar navbar-expand navbar-light bg-light fixed-top d-none d-sm-block">
      <div class="d-flex justify-content-between w-100" style="margin-top: -10px;" id="navbarSupportedContent">
        <div class="d-flex align-items-center">
          <router-link class="navbar-brand ml-2" to="/home">
            <em><img src="~@/assets/images/icons/brand.png"></em>
          </router-link>
          <!-- Sidebar Toggle-->
          <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 " id="sidebarToggle"
                  @click="handleToggle">
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- Search form -->
          <form>
            <div class="input-group">
              <input class="form-control" type="search"
                     placeholder="Please input your value">
              <button class="input-group-text" id="addon-wrapping"><i
                  class="material-icons">search</i></button>
            </div>
          </form>
          <!-- / Search form -->
        </div>
        <!-- Navbar links -->
        <ul class="navbar-nav align-items-center px-4">
          <li class="nav-item dropdown">
            <a class="nav-link text-dark notification-bell unread dropdown-toggle" data-unread-notifications="true"
               href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
              <svg class="icon icon-sm text-gray-900" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
              </svg>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
              <div class="list-group list-group-flush">
                <a href="#" class="text-center text-primary fw-bold border-bottom border-light py-3">Notifications</a>
                <a href="#" class="list-group-item list-group-item-action border-bottom">
                  <ul class="list-group" v-for="(inbox,index) in notification.data" :key="inbox.id"
                      @click.prevent="handleNotification(inbox)">
                    <li :class="index.id % 2===0?'list-group-item list-group-item-primary':'list-group-item list-group-item-dark'">
                      <div class="row">
                        <div class="col-auto">
                          <!-- Avatar -->
                          <img alt="Image placeholder" v-if="inbox.avatar" :src="inbox.avatar"
                               class="avatar-md rounded">
                          <avatar v-else :username="inbox.name" :size="size"></avatar>
                        </div>
                        <div class="col ps-0 ms-2">
                          <div class="d-flex justify-content-between align-items-center">
                            <div>
                              <h4 class="h6 mb-0 text-small">{{ inbox.name }}</h4>
                            </div>
                            <div class="text-end">
                              <small class="text-danger">{{ inbox.created_at | moment("DD MMMM YYYY HH:mm") }}</small>
                            </div>
                          </div>
                          <p class="font-small mt-1 mb-0"><span v-html="inbox.body.substring(0,20)"></span></p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </a>
                <a href="/notification" class="dropdown-item text-center fw-bold rounded-bottom py-3">
                  <svg class="icon icon-xxs text-gray-400 me-1" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path fill-rule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clip-rule="evenodd"></path>
                  </svg>
                  View all
                </a>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown ms-lg-3">
            <a class="nav-link dropdown-toggle pt-1 px-0" href="#" role="button" data-bs-toggle="dropdown"
               aria-expanded="false">
              <div class="media d-flex align-items-center">
                <img alt="Image placeholder" v-if="user.avatar" :src="user.avatar" class="avatar-md rounded">
                <avatar v-else :username="user.name" :size="size"></avatar>
                <div class="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                  <span class="mb-0 font-small fw-bold text-gray-900">{{ user.name }}</span>
                </div>
              </div>
            </a>
            <div class="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1">
              <a class="dropdown-item d-flex align-items-center" href="/profile">
                <svg class="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clip-rule="evenodd"></path>
                </svg>
                My Profile
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <svg class="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd"></path>
                </svg>
                Settings
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <svg class="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                        clip-rule="evenodd"></path>
                </svg>
                Messages
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <svg class="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                        clip-rule="evenodd"></path>
                </svg>
                Support
              </a>
              <div role="separator" class="dropdown-divider my-1"></div>
              <a class="dropdown-item d-flex align-items-center" @click.prevent="handleLogout">
                <svg class="dropdown-icon text-danger me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <!--    Mobile Nav-->
    <nav class="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
      <router-link class="navbar-brand me-lg-5" to="/home">
        <img class="navbar-brand-dark" src="~@/assets/images/icons/brand.png" alt="logo"/>
      </router-link>
      <div class="d-flex align-items-center">
        <button class="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
import avatar from 'vue-avatar'
import VueCookies from "vue-cookies";
import Util from "../../helpers/Utils";

export default {
  name: "NavBar",
  components: {
    avatar
  },
  data() {
    return {
      sidebar: this.$store.state.nav.toggle,
      interval: '',
      user: null,
      size: 30,
      pagination: {
        searchBy: 'id',
        searchParam: "",
        page: 1,
        limit: 10,
        sortBy: 'created_at',
        sort: 'DESC'
      },
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.auth.status.loggedIn;
    },
    notification() {
      return this.$store.state.notification.inboxs;
    },
  },
  mounted() {
    this.$store.dispatch("notification/getInboxs", this.pagination)
    this.$store.dispatch("menu/getMenu");
  },
  created() {
    this.user = Util.jwtDecode(
        JSON.parse(JSON.stringify(VueCookies.get("__MIH__BASE__SESSIONID__"))).access_token
    );
    this.interval = window.setInterval(() => this.$store.dispatch("notification/getInboxs", this.pagination), 6000000);
  },
  methods: {
    handleNotification(props) {
      alert(props.id)
    },
    handleLogout() {
      this.$swal
          .fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$store.dispatch("auth/logout");
              this.$router.push("/");
            }
          });
    },
    handleToggle() {
      this.$store.dispatch("nav/toggle", this.sidebar = !this.sidebar);
    }
  },
  beforeDestroy() {
    window.clearInterval(this.interval);
  },
  destroyed() {
    window.clearInterval(this.interval);
  },
}
</script>

<style scoped>

.notification {
  color: white;
  text-decoration: none;
  position: relative;
  display: inline-block;
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 9px;
}

.notification:hover {
  border: 1px solid #F2F2F2;
}

.notification .badge {
  position: absolute;
  top: -8px;
  right: -9px;
  width: 25px;
  height: 25px;
  padding: 7px 3px;
  border-radius: 50%;
  background: red;
  color: white;
  font-size: 12px;
}
</style>