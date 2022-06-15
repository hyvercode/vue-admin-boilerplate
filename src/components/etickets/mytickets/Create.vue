<template xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
  <div class="container-fluid">
    <form-header title="Create E-Ticket"/>
    <form @submit.prevent="submit($event)">
      <div class="row">
        <div class="col-8">
          <div class="card px-3 py-3 mb-3">
            <div class="row">
              <div class="col-12 mb-3">
                <div class="form-group">
                  <label for="Name">Ticket</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="eticket.ticket"
                      placeholder="Please input text"
                      required
                  />
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group">
                  <label for="Name">Title</label>
                  <input
                      type="text"
                      class="form-control"
                      v-model="eticket.subject"
                      placeholder="Please input text"
                      required
                  />
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group">
                  <label for="Name">Description</label>
                  <ckeditor
                      :editor="editor"
                      v-model="eticket.body"
                      :config="editorConfig"
                  ></ckeditor>
                </div>
              </div>
              <div class="col-3 mb-3">
                <div class="form-group">
                  <label for="Name">Attachment</label>
                  <input class="form-control btn btn-light btn-sm" type="file" accept="image/*"
                         @change="onFileChange"/>
                  <br>
                  <br>
                  <img alt="No Image" v-if="eticket.attachments" :src="eticket.attachments"
                       class="avatar-xl mx-auto bg-gray-100" style="height: 80px; width: 150px">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card px-3 py-3 mb-3">
            <h5 class="card-title">Details</h5>
            <div class="row">
              <div class="col-12 mb-3">
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-4 col-form-label">Assigned</label>
                  <div class="col-sm-8">
                    <select
                        type="text"
                        class="form-select"
                        v-model="eticket.assignee_id"
                        required
                    >
                      <option disabled value="">Choose...</option>
                      <option v-for="item in user" :key="item.id" :value="item.id">{{ item.first_name }} {{ item.last_name }}
                      </option>
                    </select>
                  </div>

                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-4 col-form-label">Cc</label>
                  <div class="col-sm-8">
                    <select
                        type="text"
                        class="form-select"
                        v-model="eticket.cc_id"
                        required
                    >
                      <option disabled value="">Choose...</option>
                      <option v-for="item in user" :key="item.id" :value="item.id">{{ item.first_name }} {{ item.last_name }}
                      </option>
                    </select>
                  </div>

                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-4 col-form-label">Reviewer</label>
                  <div class="col-sm-8">
                    <select
                        type="text"
                        class="form-select"
                        v-model="eticket.reviewer_id"
                        required
                    >
                      <option disabled value="">Choose...</option>
                      <option v-for="item in user" :key="item.id" :value="item.id">{{ item.first_name }} {{ item.last_name }}
                      </option>
                    </select>
                  </div>

                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-4 col-form-label">Request Date</label>
                  <div class="col-sm-8">
                    <input
                        type="date"
                        placeholder="Please input date"
                        id="request_date"
                        name="birth_place"
                        class="form-control"
                        v-model="eticket.request_date"
                        maxlength="20"
                    />
                  </div>

                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-4 col-form-label">Due Date</label>
                  <div class="col-sm-8">
                    <input
                        type="date"
                        placeholder="Please input date"
                        id="due_date"
                        name="birth_place"
                        class="form-control"
                        v-model="eticket.due_date"
                        maxlength="20"
                    />
                  </div>

                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-4 col-form-label">Parent Issue</label>
                  <div class="col-sm-8">
                    <select
                        type="text"
                        class="form-select"
                        v-model="eticket.parent_issue"
                        required
                    >
                      <option disabled value="">Choose...</option>
                      <option v-for="item in ticket" :key="item.id" :value="item.id">{{ item.ticket }}
                      </option>
                    </select>
                  </div>

                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-4 col-form-label">Categories</label>
                  <div class="col-sm-8">
                    <select
                        type="text"
                        class="form-select"
                        v-model="eticket.e_ticket_category_id"
                    >
                      <option disabled value="">Choose...</option>
                      <option v-for="item in ticketCategories" :key="item.id" :value="item.id">{{ item.category_name }}
                      </option>
                    </select>
                  </div>

                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-4 col-form-label">Priority</label>
                  <div class="col-sm-8">
                    <select
                        type="text"
                        class="form-select"
                        v-model="eticket.e_ticket_priority_id"
                    >
                      <option disabled value="">Choose...</option>
                      <option v-for="item in ticketPriority" :key="item.id" :value="item.id">{{ item.priority_name }}
                      </option>
                    </select>
                  </div>

                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-4 col-form-label">Issue</label>
                  <div class="col-sm-8">
                    <select
                        type="text"
                        class="form-select"
                        v-model="eticket.issue_type_id"
                    >
                      <option disabled value="">Choose...</option>
                      <option v-for="item in ticketIssueType" :key="item.id" :value="item.id">{{ item.issue_type_name }}
                      </option>
                    </select>
                  </div>

                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-4 col-form-label">Milestone</label>
                  <div class="col-sm-8">
                    <select
                        type="text"
                        class="form-select"
                        v-model="eticket.e_ticket_milestone_id"
                    >
                      <option disabled value="">Choose...</option>
                      <option v-for="item in ticketMilestone" :key="item.id" :value="item.id">{{ item.milestone_name }}
                      </option>
                    </select>
                  </div>

                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-4 col-form-label">Status</label>
                  <div class="col-sm-8">
                    <select class="form-select" v-model="eticket.status" required>
                      <option value="null" disabled>Choose...</option>
                      <option value="BACKLOG">BACKLOG</option>
                      <option value="TODO">TODO</option>
                      <option value="INPROGRESS">INPROGRESS</option>
                      <option value="TESTING">TESTING</option>
                      <option value="DONE">DONE</option>
                      <option value="BLOCKED">BLOCKED</option>
                      <option value="PENDING">PENDING</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row text-right mt-3">
                <div class="col-lg-12 d-flex justify-content-end">
                  <button
                      class="btn btn-primary"
                      @click.prevent="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <Comment :project_id="eticket.id" v-if="eticket.id"/>
  </div>
</template>

<script>
import RequestBlogPost from "../../../payloads/request/RequestBlogPost";
import BlogPostService from "../../../services/blogPost.service";
import Utils from "../../../helpers/Utils";
import FormHeader from "../../navigation/FormHeader";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import router from "../../../router";
import EticketCategoriesService from "@/services/eticketcategories.service";
import RequestEticket from "@/payloads/request/RequestEticket";
import EticketPriorityService from "@/services/eticketpriority.service";
import EticketService from "@/services/eticket.service";
import UserService from "@/services/user.service";
import EticketissuetypeService from "@/services/eticketissuetype.service";
import Comment from "./Comment"
import Pages from "@/helpers/ETicket";
import EticketmilestoneService from "@/services/eticketmilestone.service";

export default {
  components: {FormHeader, Comment},
  data() {
    return {
      post: new RequestBlogPost(),
      eticket: new RequestEticket(),
      ticket: [],
      user: [],
      ticketCategories: [],
      ticketPriority: [],
      ticketIssueType: [],
      ticketMilestone: [],
      status: Utils.status(),
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        height: 400,
        // The configuration of the editor.
      },
    };
  },
  created() {
    this.getListUser();
    this.getTicket();
    this.getTicketCategories();
    this.getTicketPriority();
    this.getTicketIssueType();
    this.getTicketMilestone();
  },
  mounted() {
    this.eticket.request_date = new Date().toISOString().substr(0, 10);
    this.eticket.due_date = new Date().toISOString().substr(0, 10);
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      EticketService.postCreate(this.eticket).then((response) => {
        if (response.code === 200) {
          this.eticket = new RequestEticket();
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "ETickets has been created",
          });
          router.push(Pages.ETICKET_MYTICKETS);
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    getListUser() {
      let loading = this.$loading.show();
      UserService.getAllUsers().then((response) => {
        if (response.code === 200) {
          this.user = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Users" + response.message, "error");
        }
      });
    },
    getTicket() {
      let loading = this.$loading.show();
      EticketService.getAll().then((response) => {
        if (response.code === 200) {
          this.ticket = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Ticket" + response.message, "error");
        }
      });
    },
    getTicketCategories() {
      let loading = this.$loading.show();
      EticketCategoriesService.getAll().then((response) => {
        if (response.code === 200) {
          this.ticketCategories = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Categories" + response.message, "error");
        }
      });
    },
    getTicketPriority() {
      let loading = this.$loading.show();
      EticketPriorityService.getAll().then((response) => {
        if (response.code === 200) {
          this.ticketPriority = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Priority" + response.message, "error");
        }
      });
    },
    getTicketIssueType() {
      let loading = this.$loading.show();
      EticketissuetypeService.getAll().then((response) => {
        if (response.code === 200) {
          this.ticketIssueType = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Issue Type" + response.message, "error");
        }
      });
    },
    getTicketMilestone() {
      let loading = this.$loading.show();
      EticketmilestoneService.getAll().then((response) => {
        if (response.code === 200) {
          this.ticketMilestone = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Milestone" + response.message, "error");
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
        this.eticket.attachments = e.target.result;
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
  min-height: 300px;
}
</style>
