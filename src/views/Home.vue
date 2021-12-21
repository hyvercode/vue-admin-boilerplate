<template>
  <div class="home">
    <Sidebar/>
    <main class="content">
      <Navbar/>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
export default {
  name: "Home",
  components: {Sidebar, Navbar}
};
</script>