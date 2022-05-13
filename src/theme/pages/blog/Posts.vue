<template>
  <div class="blog">
    <!-- ***** Header Area End ***** -->
    <Navbar/>
    <!-- ***** Breadcumb Area Start ***** -->
    <div class="mt-3">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12">
            <div class="bradcumbContent">
              <h2>Blog</h2>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Blog</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ***** Breadcumb Area End ***** -->

    <!-- ***** Blog Area Start ***** -->
    <section class="blog-area section_padding_100">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-8">
            <div class="mosh-blog-posts">
              <div class="row">
                <!-- Single Blog Start -->
                <div class="col-12" v-for="post in posts" :key="post.id">
                  <div class="single-blog wow fadeInUp" data-wow-delay="1.7s">
                    <!-- Post Thumb -->
                    <div class="blog-post-thumb">
                      <img :src="post.thumbnail" alt="No Image" class="bg-white px-4 responsive-img"
                           style="max-height: 350px;background-size: cover;width: 100%">
                    </div>
                    <!-- Post Meta -->
                    <div class="post-meta">
                      <h6>By <a href="#">Lore Papp,</a><a href="#">{{ post.updated_at | moment("DD MMMM YYYY") }}</a><a
                          href="#">Uncategorized,</a><a
                          href="#">3 Comments</a></h6>
                    </div>
                    <!-- Post Title -->
                    <h2>{{ post.title }}</h2>
                    <!-- Post Excerpt -->
                    <p><span v-html="subStr(post.content)"></span></p>
                    <!-- Read More btn -->
                    <router-link :to="`blog/post/${post.id}/${post.slug}`">Read More</router-link>
                  </div>
                </div>
              </div>
            </div>
            <!-- Pagination Area Start -->
            <div class="mosh-pagination-area">
              <div class="table-pagination">
                <nav aria-label="navigation">
                  <ul class="pagination justify-content-center">
                    <li class="page-item">
                      <a class="page-link px-2" href="#"
                         v-on:click.prevent="prevPage($event)">Prev</a>
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
          <div class="col-12 col-md-4">
            <div class="mosh-blog-sidebar">

              <div class="blog-post-search-widget mb-100">
                <form action="#">
                  <input type="search" name="search" class="form-control form-control-lg" placeholder="Search"
                         id="Search">
                  <button type="submit"><i class="material-icons py-1 mt-2">search</i></button>
                </form>
              </div>

              <div class="blog-post-archives mb-100 mt-3">
                <h5>Archives</h5>
                <ul>
                  <li v-for="(archive,index) in archives" :key="index"><a
                      href="#">{{ archive.created_at | moment("MMMM YYYY") }}</a></li>
                </ul>
              </div>

              <div class="blog-post-categories mb-100">
                <h5>Categories</h5>
                <ul>
                  <li v-for="category in categories" :key="category.id"><a href="#">{{ category.category_name }}</a>
                  </li>
                </ul>
              </div>

              <div class="latest-blog-posts mb-100">
                <h5>Latest Posts</h5>
                <!-- Single Latest Blog Post -->
                <div class="single-latest-blog-post d-flex" v-for="latest in latestPosts" :key="latest.id">
                  <div class="latest-blog-post-thumb">
                    <img :src="latest.thumbnail" class="bg-white px-2 img-thumbnail" alt="No Image"
                         style="background-size: cover;">
                  </div>
                  <div class="latest-blog-post-content">
                    <h6><a href="#">{{ latest.title }}</a></h6>
                    <div class="post-meta">
                      <h6>By <a href="#">Jane Smith</a>/<a href="#">{{ latest.updated_at | moment("DD MMMM YYYY") }}</a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div class="instagram-feeds mt-4">
                <h5>Instagram</h5>
                <ul>
                  <li><a href="#"><img src="~@/theme/assets/img/blog-img/ins-1.jpg" alt=""></a></li>
                  <li><a href="#"><img src="~@/theme/assets/img/blog-img/ins-2.jpg" alt=""></a></li>
                  <li><a href="#"><img src="~@/theme/assets/img/blog-img/ins-3.jpg" alt=""></a></li>
                  <li><a href="#"><img src="~@/theme/assets/img/blog-img/ins-4.jpg" alt=""></a></li>
                  <li><a href="#"><img src="~@/theme/assets/img/blog-img/ins-5.jpg" alt=""></a></li>
                  <li><a href="#"><img src="~@/theme/assets/img/blog-img/ins-6.jpg" alt=""></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** Blog Area End ***** -->
    <!-- <section> close ============================-->
    <Footer/>
  </div>
</template>

<script>
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import Utils from "../../../helpers/Utils";
import BlogService from "../../../services/blog.service";
import avatar from 'vue-avatar';

export default {
  name: "Blog",
  components: {Footer, Navbar, avatar},
  data() {
    return {
      posts: [],
      latestPosts: [],
      categories: [],
      archives: [],
      searchBy: 'id',
      searchParam: '',
      size: 30,
      limit: 5,
      records: [5, 10, 30, 50, 100, 500, 1000],
      pagination: {
        perPage: 10,
        currentPage: 1,
        lastPage: '',
        nextPageUrl: '',
        prevPageUrl: ''
      },
      reads: null
    }
  },
  computed: {
    paginate() {
      return this.pagination;
    },
    notification() {
      return this.reads;
    }
  },
  created() {
    this.getArchives();
    this.getCategories();
    this.getLatestPosts('id', "", 5, 1);
  },
  mounted() {
    this.getPosts(this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
  },
  methods: {
    doRefresh() {
      this.getPosts(this.searchBy, this.searchParam, this.pagination.perPage, this.pagination.currentPage);
    },

    subStr(str) {
      return Utils.sunStr(str, 0, 300);
    },

    async handleRead(params) {
      this.reads = params;
      BlogService.getPost(params.id).then(response => {
        if (response.code === 200) {
          // this.doRefresh()
        }
      })
    },
    getArchives() {
      let loading = this.$loading.show();
      BlogService.getArchives().then(response => {
        if (response.code === 200) {
          this.archives = response.data;
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
    getCategories() {
      let loading = this.$loading.show();
      BlogService.getCategories().then(response => {
        if (response.code === 200) {
          this.categories = response.data;
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
    getLatestPosts(searchBy, searchParam, limit, page) {
      let params = {
        searchBy: searchBy,
        searchParam: searchParam,
        limit: 4,
        page: page,
        sortBy: 'DESC'
      }
      let loading = this.$loading.show();
      BlogService.getPosts(params).then(response => {
        if (response.code === 200) {
          this.latestPosts = response.data.data;
          this.reads = this.posts ? response.data.data[0] : null
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
    getPosts(searchBy, searchParam, limit, page) {
      let params = {
        searchBy: searchBy,
        searchParam: searchParam,
        limit: limit,
        page: page,
        sortBy: 'DESC'
      }
      let loading = this.$loading.show();
      BlogService.getPosts(params).then(response => {
        if (response.code === 200) {
          this.posts = response.data.data;
          this.reads = this.posts ? response.data.data[0] : null
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
        this.getPosts(this.searchBy, this.searchParam, this.limit, this.pagination.currentPage)
      }
    },

    //Next Pagination
    nextPage() {
      if (this.pagination.nextPageUrl) {
        this.pagination.currentPage++;
        this.getPosts(this.searchBy, this.searchParam, this.limit, this.pagination.currentPage)
      }
    },
    //Search Record
    handleChange() {
      this.searchParam = '';
      this.getPosts(this.searchBy, this.searchParam, this.limit, 1)
    },
  }
}
</script>

<style scoped>
/* -----------------------
:: 18.0 Blog Area CSS
----------------------- */

.blog-area {
  position: relative;
  z-index: 5;
}

.single-blog {
  margin-bottom: 100px;
}

.single-blog .blog-post-thumb {
  margin-bottom: 40px;
}

.single-blog h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.post-meta {
  margin-bottom: 10px;
}

.post-meta h6 {
  color: #b1b3c3;
  text-transform: capitalize;
  margin-bottom: 0;
  font-size: 12px;
}

.post-meta h6 a {
  color: #b1b3c3;
  display: inline-block;
  margin-right: 5px;
}

.post-meta h6 a:hover {
  color: #4a7aec;
}

.single-blog > a {
  color: #6270ff;
  font-size: 14px;
  text-transform: uppercase;
}

.single-blog p {
  margin-bottom: 40px;
}

.mosh-pagination-area .page-link {
  padding: 0;
  line-height: 42px;
  color: #007bff;
  border: none;
  border-radius: 0;
  width: 42px;
  height: 42px;
  font-size: 14px;
  text-align: center;
}

.page-item:first-child .page-link,
.page-item:last-child .page-link {
  margin-left: 0;
  border-radius: 0;
}

.blog-post-search-widget form {
  position: relative;
  z-index: 1;
}

.blog-post-search-widget form > input {
  width: 100%;
  height: 50px;
  border-top: none;
  border-left: none;
  border-radius: 0;
  border-right: none;
  border-bottom: 2px solid #e6e7f4;
}

.blog-post-search-widget form > button {
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border: none;
  background-color: transparent;
  cursor: pointer
}

.blog-post-archives > h5,
.blog-post-categories > h5,
.latest-blog-posts > h5,
.instagram-feeds > h5 {
  font-size: 18px;
  margin-bottom: 30px;
}

.blog-post-archives ul > li > a,
.blog-post-categories ul > li > a {
  color: #abadbe;
  font-size: 15px;
  display: block;
  padding: 5px 0;
  font-weight: 500;
}

.latest-blog-post-content h6 > a {
  color: #404551;
}

.latest-blog-post-content h6 > a:hover,
.blog-post-archives ul > li > a:hover,
.blog-post-categories ul > li > a:hover {
  color: #4a7aec;
}

.single-latest-blog-post {
  margin-bottom: 20px;
}

.latest-blog-post-thumb {
  width: 70px;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 70px;
  flex: 0 0 70px;
  margin-right: 20px;
}

.instagram-feeds ul > li {
  width: calc(33.3333333% - 8px);
  margin: 4px;
  display: inline-block;
  float: left;
}

</style>