<template>
  <div class="base-ui">
    <NavBar/>
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav" v-if="nav">
        <SideBar/>
      </div>
      <div id="layoutSidenav_content">
        <main class="mt-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
    <autor />
  </div>
</template>

<script>
import SideBar from "../components/navigation/SideBar";
import NavBar from "../components/navigation/NavBar";
import Autor from "../components/navigation/Autor";

export default {
  name: "Index",
  components: {Autor, NavBar, SideBar},
  computed: {
    nav() {
      return this.$store.state.nav.toggle;
    }
  }
}
</script>

<style scoped>

</style>