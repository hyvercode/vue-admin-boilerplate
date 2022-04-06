<template>
  <nav id="sidebarMenu" class="sidebar d-lg-block bg-gray-700 collapse">
    <div class="sidebar-inner">
      <!--      Sidebar Header-->
      <div class="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
        <div class="d-flex align-items-center">
          <div class="avatar-lg me-4">
            <img alt="Image placeholder" v-if="user.avatar" :src="user.avatar" class="avatar-md rounded">
            <avatar v-else :username="user.name" :size="size" class="me-2 mt-2"
                    style="margin-left: 5px!important;"></avatar>
          </div>
          <div class="d-block">
            <h2 class="h5 mb-3 text-white">{{ user.name }}</h2>
            <a href="/" class="btn btn-secondary btn-sm d-inline-flex align-items-center">
              <svg class="icon icon-xxs me-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Sign Out
            </a>
          </div>
        </div>
        <div class="collapse-close d-md-none">
          <a href="#sidebarMenu" data-bs-toggle="collapse"
             data-bs-target="#sidebarMenu"
             aria-controls="sidebarMenu"
             aria-expanded="true"
             aria-label="Toggle navigation">
            <svg class="icon icon-xs text-white" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
      <!--      End Sidebar Header-->
      <!--      Desktop Sidebar-->
      <ul class="nav flex-column pt-3 pt-md-2 mt-2">
        <li class="nav-item @@if (context.page === 'overview') { active }">
          <a href="/" class="nav-link">
             <span class="sidebar-icon">
              <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            </span>
            <span class="ms-1 sidebar-text">Home</span>
          </a>
        </li>
        <li class="nav-item @@if (context.page === 'overview') { active }">
          <a href="/" class="nav-link">
          <span class="sidebar-icon">
           <i class="material-icons">pie_chart</i>
          </span>
            <span class="sidebar-text">Dashboard</span>
          </a>
        </li>
        <li class="nav-item @@if (context.page === 'transactions') { active }">
          <a href="/" class="nav-link">
          <span class="sidebar-icon">
            <i class="material-icons">compare_arrows</i>
          </span>
            <span class="sidebar-text">Transactions</span>
          </a>
        </li>
        <li class="nav-item">
        <span
            class="nav-link @@if (context.page !== 'datatables' && context.page !== 'tables') { collapsed } d-flex justify-content-between align-items-center"
            data-bs-toggle="collapse" data-bs-target="#inventory-app">
          <span>
            <span class="sidebar-icon">
            <i class="material-icons">inventory</i>
            </span>
            <span class="sidebar-text">Inventory</span>
          </span>
          <span class="link-arrow">
            <svg class="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"></path></svg>
          </span>
        </span>
          <div class="multi-level collapse"
               role="list" id="inventory-app" aria-expanded="false">
            <ul class="flex-column nav">
              <li class="nav-item @@if (context.page === 'tables') { active }">
                <a class="nav-link" :href="PAGES.USERS">
                  <span class="sidebar-text">Asset Receive</span>
                </a>
              </li>
              <li class="nav-item @@if (context.page === 'tables') { active }">
                <a class="nav-link" :href="PAGES.USERS">
                  <span class="sidebar-text">Asset Grading</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
        <span
            class="nav-link @@if (context.page !== 'datatables' && context.page !== 'tables') { collapsed } d-flex justify-content-between align-items-center"
            data-bs-toggle="collapse" data-bs-target="#selling-app">
          <span>
            <span class="sidebar-icon">
            <i class="material-icons">sell</i>
            </span>
            <span class="sidebar-text">Selling Apps</span>
          </span>
          <span class="link-arrow">
            <svg class="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"></path></svg>
          </span>
        </span>
          <div class="multi-level collapse"
               role="list" id="selling-app" aria-expanded="false">
            <ul class="flex-column nav">
              <li class="nav-item @@if (context.page === 'tables') { active }">
                <a class="nav-link" :href="PAGES.USERS">
                  <span class="sidebar-text">Online Shop</span>
                </a>
              </li>
              <li class="nav-item @@if (context.page === 'tables') { active }">
                <a class="nav-link" :href="PAGES.USERS">
                  <span class="sidebar-text">Online Bidding</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
        <span
            class="nav-link @@if (context.page !== 'datatables' && context.page !== 'tables') { collapsed } d-flex justify-content-between align-items-center"
            data-bs-toggle="collapse" data-bs-target="#warehouse-app">
          <span>
            <span class="sidebar-icon">
             <i class="material-icons">warehouse</i>
            </span>
            <span class="sidebar-text">Warehouse</span>
          </span>
          <span class="link-arrow">
            <svg class="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"></path></svg>
          </span>
        </span>
          <div class="multi-level collapse"
               role="list" id="warehouse-app" aria-expanded="false">
            <ul class="flex-column nav">
              <li class="nav-item @@if (context.page === 'tables') { active }">
                <a class="nav-link" :href="PAGES.USERS">
                  <span class="sidebar-text">Regions</span>
                </a>
              </li>
              <li class="nav-item @@if (context.page === 'tables') { active }">
                <a class="nav-link" :href="PAGES.USERS">
                  <span class="sidebar-text">Warehouse</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
        <span
            class="nav-link @@if (context.page !== 'datatables' && context.page !== 'tables') { collapsed } d-flex justify-content-between align-items-center"
            data-bs-toggle="collapse" data-bs-target="#submenu-app">
          <span>
            <span class="sidebar-icon">
              <i class="material-icons">ballot</i>
            </span>
            <span class="sidebar-text">Masters</span>
          </span>
          <span class="link-arrow">
            <svg class="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"></path></svg>
          </span>
        </span>
          <div class="multi-level collapse"
               role="list" id="submenu-app" aria-expanded="false">
            <ul class="flex-column nav">
              <li class="nav-item @@if (context.page === 'tables') { active }">
                <a class="nav-link" :href="PAGES.USERS">
                  <span class="sidebar-text">Company</span>
                </a>
              </li>
              <li class="nav-item @@if (context.page === 'tables') { active }">
                <a class="nav-link" :href="PAGES.USERS">
                  <span class="sidebar-text">Branch</span>
                </a>
              </li>
              <li class="nav-item @@if (context.page === 'tables') { active }">
                <a class="nav-link" :href="PAGES.USERS">
                  <span class="sidebar-text">Users</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li role="separator" class="dropdown-divider mt-4 mb-3 border-gray-900"></li>
        <li class="nav-item @@if (context.page === 'settings') { active }">
          <a href="/" class="nav-link">
          <span class="sidebar-icon">
           <i class="material-icons">settings</i>
          </span>
            <span class="sidebar-text">Settings</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import avatar from 'vue-avatar'
import VueCookies from "vue-cookies";
import Util from "../../helpers/Util";
import pages from "../../helpers/Pages";

export default {
  name: "SideBar",
  components: {
    avatar,
  },
  data() {
    return {
      user: null,
      size: 60,
      PAGES: pages
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.auth.status.loggedIn;
    },
    toggle() {
      return this.$store.state.nav.toggle;
    }
  },
  created() {
    this.user = Util.jwtDecode(
        JSON.parse(JSON.stringify(VueCookies.get("__PMS__SSESSIONID__"))).access_token
    );
  },
};
</script>