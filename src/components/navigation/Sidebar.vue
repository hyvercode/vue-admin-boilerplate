<template>
  <div>
    <nav class="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
      <a class="navbar-brand me-lg-5" href="/">
        <img
            class="navbar-brand-dark"
            src="~@/assets/img/icons/icon.png"
            alt="logo"
        />
      </a>
      <div class="d-flex align-items-center">
        <button
            class="navbar-toggler d-lg-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
    <!-- Navbar -->
    <nav
        id="sidebarMenu"
        class="sidebar d-lg-block bg-white text-white collapse"
        data-simplebar
    >
      <div class="sidebar-inner px-4 pt-3">
        <div
            class="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4"
        >
          <div class="d-flex align-items-center">
            <div class="avatar-lg me-4">
              <img
                  :src="user.avatar"
                  class="card-img-top rounded-circle border-white"
                  alt="Bonnie Green"
              />
            </div>
            <div class="d-block">
              <h2 class="h5 mb-3" style="color: #0a0e17">{{ user.name }}</h2>
              <a
                  v-on:click.prevent="onLogout($event)"
                  class="btn btn-secondary btn-sm d-inline-flex align-items-center"
              >
                <svg
                    class="icon icon-xxs me-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                Sign Out
              </a>
            </div>
          </div>
          <!-- Is Responsive -->
          <div class="collapse-close d-md-none">
            <a
                href="#sidebarMenu"
                data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu"
                aria-controls="sidebarMenu"
                aria-expanded="true"
                aria-label="Toggle navigation"
                style="color: #0a0e17"
            >
              <svg
                  class="icon icon-xs"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <ul class="nav flex-column pt-3 pt-md-0">
          <li class="nav-item">
            <router-link :to="PAGES.HOME" class="d-flex align-items-center">
              <span class="sidebar-icon">
               <img src="~@/assets/img/brand/light.png" style="width: 350px !important;height:50px;margin-bottom: 20px;" alt="brand"/>
              </span>
            </router-link>
          </li>
          <!-- Transactions -->
          <li class="nav-item px-3">
            <span class="sidebar-text-group"
            >Transactions</span
            >
          </li>

          <!--Transactions-->
          <li class="nav-item">
            <router-link class="nav-link" :to="PAGES.ORDERS">
               <span class="sidebar-icon">
                  <img src="~@/assets/img/icons/Order.png" alt="user"/>
                </span>
              <span class="sidebar-text">Orders</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="PAGES.INVOICE">
               <span class="sidebar-icon">
                  <img src="~@/assets/img/icons/Billing.png" alt="user"/>
                </span>
              <span class="sidebar-text">Invoice & Billing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to=PAGES.REPORTS>
              <span class="sidebar-icon">
                  <img src="~@/assets/img/icons/Report.png" alt="user"/>
                </span>
              <span class="sidebar-text">Report</span>
            </router-link>
          </li>
          <!-- Settings -->
          <li class="nav-item px-3">
            <span class="sidebar-text-group"
            >Settings</span
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="PAGES.BRANCH">
              <span class="sidebar-icon">
                  <img src="~@/assets/img/icons/Branch.png" alt="user"/>
                </span>
              <span class="sidebar-text">Branch</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="PAGES.EMPLOYEES">
              <span class="sidebar-icon">
                  <img src="~@/assets/img/icons/Employee.png" alt="user"/>
                </span>
              <span class="sidebar-text">Employee</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="PAGES.USERS">
              <span class="sidebar-icon">
                  <img src="~@/assets/img/icons/users.svg" alt="user"/>
                </span>
              <span class="sidebar-text">Users</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
             <span class="sidebar-icon">
                  <img src="~@/assets/img/icons/Notification.png" alt="user"/>
                </span>
              <span class="sidebar-text">Notification</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
               <span class="sidebar-icon">
                  <img src="~@/assets/img/icons/Settings.png" alt="user"/>
                </span>
              <span class="sidebar-text">Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import Pages from "../../helpers/Pages";
import Utils from "../../helpers/Utils";
import VueCookies from "vue-cookies";

export default {
  name: "Navbar",
  components: {},

  data() {
    return {
      PAGES: Pages,
      user: null
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("auth/logout")
    }
  },
  created() {
    this.user = Utils.jwtDecode(JSON.parse(JSON.stringify(VueCookies.get('_PICKERSSESSIONID'))).access_token);
  },
};
</script>
