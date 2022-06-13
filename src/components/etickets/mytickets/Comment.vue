<template>
  <div class="row">
    <div class="col-12">
      <div class="card px-3 py-3 mb-3">
        <h5 class="card-title">Activity</h5>
        <form>
          <div class="row">
            <div class="col-12 mb-3">
              <div class="form-group">
                <label for="Name">Comment</label>
                <ckeditor
                    :editor="editor"
                    :config="editorConfig"
                    v-model="comment.body"
                ></ckeditor>
              </div>
            </div>
          </div>
          <div class="col-3 mb-3">
            <div class="form-group">
              <label for="Name">Attachment</label>
              <input class="form-control btn btn-light btn-sm" type="file" accept="image/*"
                     @change="onFileChange" />
              <br>
              <br>
              <img alt="No Image" v-if="comment.attachments" :src="comment.attachments"
                   class="avatar-xl mx-auto bg-gray-100" style="height: 80px; width: 150px">
            </div>
          </div>
          <div class="row text-right mt-3">
            <div class="col-lg-12 d-flex justify-content-end">
              <button
                  class="btn btn-primary"
                  @click.prevent="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="col-12">
      <div class="card px-3 py-3 mb-3 scroll-comment">
        <div v-for="item in eticketComment" :key="item.id">
          <div class="flex-row-reverse bg-gray-100" v-if="user.id === item.user_id">
            <div class="p-2 bd-highlight d-flex float-end">
              <div class="p-2 bd-highlight">
                <h5 style="text-align: right">{{ item.first_name }} {{ item.last_name }}</h5>
                <p style="text-align: right; font-size: 10px">{{ item.created_at | moment('DD-MMM-YYYY') }}</p>
              </div>

              <img alt="No Image" src="~@/assets/images/icons/photo-bg.png" style="height: 60px; width: 60px"
                   class="avatar-xl rounded-circle mb-4 bg-gray-100">
            </div>
            <div class="clearfix"/>
            <div class="span-right">
              <span v-html="item.body"></span>
              <a :href="item.attachments" target="_blank"><i class="material-icons mt-2">attachment</i><span class="text-info">Attacment</span></a>
            </div>
          </div>
          <div class="flex-row bd-highlight mb-3" v-else>
            <div class="p-2 bd-highlight d-flex">
              <img alt="No Image" src="~@/assets/images/icons/photo-bg.png" style="height: 60px; width: 60px"
                   class="avatar-xl rounded-circle mb-4 bg-gray-100">

              <div class="p-2 bd-highlight">
                <h5 style="text-align: left">{{ item.first_name }} {{ item.last_name }}</h5>
                <p style="text-align: left; font-size: 10px">{{ item.created_at | moment('DD-MMM-YYYY') }}</p>
              </div>
            </div>
            <div class="clearfix"/>

              <div class="span-left" style="text-align: left">
                <span v-html="item.body"></span>
                <a :href="item.attachments" target="_blank"><i class="material-icons mt-2">attachment</i><span class="text-info">Attacment</span></a>
              </div>
          </div>
          <div class="solid clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import RequestEticketComment from "@/payloads/request/RequestEticketComment";
import EticketcommentService from "@/services/eticketcomment.service";
import Util from "@/helpers/Utils";
import VueCookies from "vue-cookies";

export default {
  name: "Comment",
  props: {
    project_id: String,
  },
  data() {
    return {
      eticketComment: new RequestEticketComment(),
      comment: new RequestEticketComment(),
      user: {},
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        height: 400,
        // The configuration of the editor.
      },
    };
  },
  created() {
    this.user = Util.jwtDecode(
        JSON.parse(JSON.stringify(VueCookies.get("__MIH__BASE__SESSIONID__"))).access_token
    );
    this.getListComment();
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      this.comment.e_ticket_id = this.project_id;
      EticketcommentService.postCreate(this.comment).then((response) => {
        if (response.code === 200) {
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Comment has been create",
          });
          this.editor = [];
          this.getListComment();
          // router.push(Pages.ETICKETS);
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    getListComment() {
      // let loading = this.$loading.show();
      EticketcommentService.getAllComment(this.project_id).then((response) => {
        if (response.code === 200) {
          this.eticketComment = response.data;
          // loading.hide();
        } else {
          // loading.hide();
          this.$swal.fire("Error!", "Comment " + response.message, "error");
        }
      });
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
        this.comment.attachments = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  }
}
</script>

<style scoped>
.ck-editor__editable {
  min-height: 100px;
}

.solid {
  border-top: 1px solid #bbb;
}

.scroll-comment {
  height: 400px;
  overflow: scroll;
  /*scrollbar-width: thin;*/
}

/* width */
.scroll-comment::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.scroll-comment::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.scroll-comment::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.scroll-comment::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.span-right {
  display: block;
  text-align: left;
  word-break: break-word;
  overflow-x: scroll;
}

.span-left {
  word-break: break-word;
}
</style>
