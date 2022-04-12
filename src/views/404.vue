<template>
  <div class="home">
    <Sidebar/>
    <main class="content">
      <Navbar/>
      <div class="row">
        <div class="container text-center">
          <div class="center">
            <img src="~@/assets/img/404.png" style="width: 500px;" alt="404"/>
          </div>
          <div class="center m-5">
            <button class="btn btn-primary text-white w-25" @click="$router.back()">Back Home</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from "../components/navigation/Sidebar";
import Navbar from "../components/navigation/Navbar";

export default {
  name: "404",
  components: {Sidebar, Navbar}
}
</script>