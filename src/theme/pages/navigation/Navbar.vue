<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top" data-navbar-on-scroll="data-navbar-on-scroll">
    <div class="container"><a class="navbar-brand" href="index.html"><img src="~@/theme/assets/img/logo.png"
                                                                          height="31"
                                                                          alt="logo"/></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span
          class="navbar-toggler-icon"> </span></button>
      <div class="collapse navbar-collapse border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" aria-current="page" href="#feature">Product</a></li>
          <li class="nav-item"><a class="nav-link" aria-current="page" href="#validation">Customers</a></li>
          <li class="nav-item"><a class="nav-link" aria-current="page" href="#superhero">Pricing</a></li>
          <li class="nav-item"><a class="nav-link" aria-current="page" href="#marketing">Resources</a></li>
          <li class="nav-item"><a class="nav-link" aria-current="page" href="/blog">Blog</a></li>
        </ul>
        <div class="d-flex ms-lg-4">
          <router-link class="btn btn-info" :to="PAGES.LOGIN">Sign In</router-link>
          <a class="btn btn-warning ms-3" href="#!">Sign Up</a></div>
      </div>
    </div>
  </nav>
</template>

<script>
import pages from "../../../helpers/Pages";

export default {
  name: "Navbar",
  data() {
    return {
      PAGES: pages
    }
  }
}
</script>