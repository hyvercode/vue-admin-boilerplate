<template xmlns="http://www.w3.org/1999/html">
  <div class="container-fluid">
    <form-header title="Update Post"/>
    <form @submit.prevent="submit($event)">
      <div class="row">
        <div class="col-8">
          <div class="card px-3 py-3 mb-3">
            <div class="row">
              <div class="col-12 mb-3">
                <div class="form-group">
                  <label for="Name">Title</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="post.title"
                      placeholder="Please input text"
                      required
                  />
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group">
                  <label for="Name">Content</label>
                  <ckeditor
                      :editor="editor"
                      v-model="post.content"
                      :config="editorConfig"
                  ></ckeditor>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card px-3 py-3 mb-3">
            <div class="row">
              <div class="col-12 mb-3">
                <div class="form-group">
                  <label for="Name">Categories</label>
                  <select
                      type="text"
                      class="form-select"
                      v-model="post.category_id"
                      required
                  >
                    <option disabled value="">Choose...</option>
                    <option v-for="item in categories" :key="item.id" v-model:value="item.id">{{ item.category_name }}
                    </option>
                  </select>

                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group">
                  <label for="Name">Tags</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="post.tag"
                      placeholder="Please input text"
                      required
                  />
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group">
                  <label for="Name">Thumbnail</label>
                  <input
                      type="file"
                      accept="image/*"
                      @change="onFileChange"
                      class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="row text-right mt-3">
              <div class="col-lg-12 d-flex justify-content-end">
                <button
                    class="btn btn-primary"
                    @click.prevent="submit"
                >
                  Update
                </button>
                <button class="btn btn-primary" v-if="post.published" style="margin-left: 10px !important" @click.prevent="handleDraft">
                  {{ post.published ? 'Draft' : 'Publish' }}
                </button>
                <button v-else class="btn btn-primary" style="margin-left: 10px !important" @click.prevent="handlePublish">
                  {{ post.published ? 'Draft' : 'Publish' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import RequestBlogPost from "../../../payloads/request/RequestBlogPost";
import BlogPostService from "../../../services/blogPost.service";
import CategoriesService from "../../../services/blogCategory.service";
import Utils from "../../../helpers/Utils";
import FormHeader from "../../navigation/FormHeader";
import router from "../../../router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Post from "../../../theme/pages/blog/Post";

export default {
  components: {FormHeader},
  data() {
    return {
      post: new RequestBlogPost(),
      categories: [],
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        height: 800,
        // The configuration of the editor.
      },
    };
  },
  mounted() {
    this.getCategories();
    this.getPost()
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      BlogPostService.postUpdate(this.post.id, this.post).then((response) => {
        if (response.code === 200) {
          this.getPost();
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Post has been updated",
          });
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    getPost() {
      let loading = this.$loading.show();
      BlogPostService.getShow(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          this.post = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Post " + response.message, "error");
        }
      });
    },
    getCategories() {
      let loading = this.$loading.show();
      CategoriesService.getAll().then((response) => {
        if (response.code === 200) {
          this.categories = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Categories" + response.message, "error");
        }
      });
    },
    isNumber(evt) {
      return Utils.isNumber(evt);
    },
    /**
     * Image Change
     * @param e
     */
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    /**
     * Convert image to bas64
     * @param file
     */
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.post.thumbnail = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    handleDraft() {
      let payload = {
        published: false
      }
      let loading = this.$loading.show();
      BlogPostService.postPublished(this.post.id, payload).then((response) => {
        if (response.code === 200) {
          this.getPost();
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    handlePublish() {
      let payload = {
        published: true
      }
      let loading = this.$loading.show();
      BlogPostService.postPublished(this.post.id, payload).then((response) => {
        if (response.code === 200) {
          loading.hide();
          this.getPost();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
  },
}
;
</script>
<style>
.ck-editor__editable {
  min-height: 600px;
}
</style>