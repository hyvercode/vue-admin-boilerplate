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
      <div class="card px-3 py-3 mb-3">
        <div v-for="item in eticketComment" :key="item.id">
          <div class="d-flex flex-row-reverse bg-gray-100"  v-if="user.id === item.user_id">
            <div class="p-2 bd-highlight">
              <img alt="No Image" src="~@/assets/images/icons/photo-bg.png" style="height: 60px; width: 60px"
                   class="avatar-xl rounded-circle mx-auto mb-4 bg-gray-100">
            </div>
            <div class="p-2 bd-highlight">
              <h5 style="text-align: right">{{ item.first_name }} {{ item.last_name}}</h5>
              <p style="text-align: right; font-size: 10px">{{item.created_at | moment('DD-MMM-YYYY')}}</p>
              <div style="text-align: right">
                <span v-html="item.body"></span>
              </div>
            </div>
          </div>
          <div class="d-flex flex-row bd-highlight mb-3" v-else>
            <div class="p-2 bd-highlight">
              <img alt="No Image" src="~@/assets/images/icons/photo-bg.png" style="height: 60px; width: 60px"
                   class="avatar-xl rounded-circle mx-auto mb-4 bg-gray-100">
            </div>
            <div class="p-2 bd-highlight">
              <h5 style="text-align: left">{{ item.first_name }} {{ item.last_name}}</h5>
              <p style="text-align: left; font-size: 10px">{{item.created_at | moment('DD-MMM-YYYY')}}</p>
              <div style="text-align: left">
                <span v-html="item.body"></span>
              </div>
            </div>
          </div>
          <div class="solid"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import RequestEticketComment from "@/payloads/request/RequestEticketComment";
import EticketcommentService from "@/services/eticketcomment.service";
import EticketService from "@/services/eticket.service";
import Util from "@/helpers/Utils";
import VueCookies from "vue-cookies";

export default {
  name: "Comment",
  props : {
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
  methods:{
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
</style>
