<template>
  <nav id="sidebarMenu" class="sidebar d-lg-block bg-gray-700 collapse">
    <div class="sidebar-inner">
      <!--      Sidebar Header-->
      <div class="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
        <div class="d-flex align-items-center">
          <div class="avatar-lg me-4">
            <img alt="Image placeholder" v-if="user.avatar" :src="user.avatar" class="avatar-md rounded bg-gray-50 me-2"
                 style="margin-left: 5px!important;">
            <avatar v-else :username="user.name" :size="size" class="avatar-md rounded bg-gray-50 me-2 mt-2"
                    style="margin-left: 5px!important;"></avatar>
          </div>
          <div class="d-block">
            <h2 class="h5 mb-3 text-white">{{ user.name }}</h2>
            <a @click.prevent="handleLogout" class="btn btn-secondary btn-sm d-inline-flex align-items-center">
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
      <!--        Dynamic-->
      <ul class="nav flex-column pt-3 pt-md-2 mt-2">
        <!--menu-menu-->
        <li v-for="(items,index) in menu" :key="index" v-if="items.slug === 'link'" class="nav-item">
          <router-link :to="items.href" class="nav-link">
               <span class="sidebar-icon">
              <i v-if="items.isIcon" class="material-icons">{{ items.icon }}</i>
              <img v-else :src="items.icon" :alt="index"/>
            </span>
            <span class="sidebar-text">{{ items.name }}</span>
          </router-link>
        </li>
        <!--end menu-menu-->
        <!--title-menu-->
        <li v-for="(items,index) in menu" :key="index" v-if="items.slug === 'title'" class="nav-item px-3 mt-2">
          <span class="sidebar-text-group sidebar-text-title">{{ items.name }}</span>
        </li>
        <!--end title-menu-->
        <!--dropdown-menu-->
        <li v-for="(items,index) in menu" :key="index" v-if="items.slug ==='dropdown'" class="nav-item">
            <span
                class="nav-link collapsed d-flex justify-content-between align-items-center"
                v-bind:href="'#collapse'+replaceSpace(items.id)"
                data-bs-toggle="collapse" aria-expanded="false"
            >
              <span>
                <span class="sidebar-icon">
                   <i v-if="items.isIcon" class="material-icons">{{ items.icon }}</i>
                  <img v-else :src="items.icon" :alt="index"/>
                </span>
                <span class="sidebar-text">{{ items.name }}</span>
              </span>
              <span class="link-arrow">
                <svg
                    class="icon icon-sm"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </span>
          <div
              v-bind:id="'collapse'+replaceSpace(items.id)" class="multi-level collapse"
              role="list"
              aria-expanded="false"
          >
            <ul v-for="(element, index ) in items.elements" :key="index" class="flex-column nav">
              <li class="nav-item">
                <router-link class="nav-link" :to="element.href">
                  <span class="sidebar-text">{{ element.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <!--dropdown-menu-->
      </ul>
    </div>
  </nav>
</template>

<script>
import avatar from 'vue-avatar'
import VueCookies from "vue-cookies";
import Util from "../../helpers/Utils";

export default {
  name: "SideBar",
  components: {
    avatar,
  },
  data() {
    return {
      user: null,
      size: 60
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.auth.status.loggedIn;
    },
    toggle() {
      return this.$store.state.nav.toggle;
    },
    menu() {
      return this.$store.state.menu.menus;
    },
  },
  created() {
    this.user = Util.jwtDecode(
        JSON.parse(JSON.stringify(VueCookies.get("__MIH__BASE__SESSIONID__"))).access_token
    );
  },
  methods: {
    replaceSpace(value) {
      let link = value ? value.replaceAll(" ", "_") : "";
      return link.toString();
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
  }
};
</script>