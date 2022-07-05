<template xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
  <div class="container-fluid">
    <h2>Create Project</h2>
    <br>
    <!--    <form-header title="Project Header"/>-->
    <form @submit.prevent="submit($event)">
      <div class="row">
        <div class="col-7">
          <div class="row">
            <h5 style="font-weight: bold">Project Header</h5>
            <hr>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="Name" class="col-sm-2 col-form-label">Code</label>
                <div class="col-sm-10">
                  <input
                      type="text"
                      class="form-control"
                      v-model="project.code"
                      placeholder="Please input text"
                      required
                  />
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="Name" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                  <input
                      type="text"
                      class="form-control"
                      v-model="project.title"
                      placeholder="Please input text"
                      required
                  />
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Year</label>
                <div class="col-sm-10">
                  <Calendar v-model="project.year" view="year" dateFormat="yy"/>
                </div>

              </div>
            </div>
            <h5 style="font-weight: bold">Project Details</h5>
            <hr>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Project Manager</label>
                <div class="col-sm-10">
                  <select
                      type="text"
                      class="form-select"
                      v-model="project.project_manager_id"
                      required
                  >
                    <option disabled value="">Choose...</option>
                    <option v-for="item in user" :key="item.id" :value="item.id">{{ item.first_name }} {{
                        item.last_name
                      }}
                    </option>
                  </select>
                </div>

              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Project Pic</label>
                <div class="col-sm-10">
                  <select
                      type="text"
                      class="form-select"
                      v-model="project.project_pic_id"
                      required
                  >
                    <option disabled value="">Choose...</option>
                    <option v-for="item in user" :key="item.id" :value="item.id">{{ item.first_name }} {{
                        item.last_name
                      }}
                    </option>
                  </select>
                </div>

              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Project Start Date</label>
                <div class="col-sm-10">
                  <input
                      type="date"
                      placeholder="Please input date"
                      id="request_date"
                      name="birth_place"
                      class="form-control"
                      v-model="project.project_start_date"
                      maxlength="20"
                  />
                </div>

              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Project Due Date</label>
                <div class="col-sm-10">
                  <input
                      type="date"
                      placeholder="Please input date"
                      id="request_date"
                      name="birth_place"
                      class="form-control"
                      v-model="project.project_due_date"
                      maxlength="20"
                  />
                </div>

              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="Name" class="col-sm-2 col-form-label">Project Progress</label>
                <div class="col-sm-10">
                  <input
                      type="text"
                      class="form-control"
                      v-model="project.project_progress"
                      placeholder="Please input text"
                      required
                  />
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Project Status</label>
                <div class="col-sm-10">
                  <select class="form-select" v-model="project.project_status" required>
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
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="Name" class="col-sm-2 col-form-label">Milestone</label>
                <div class="col-sm-10">
                  <input
                      type="text"
                      class="form-control"
                      v-model="project.milestone"
                      placeholder="Please input text"
                      required
                  />
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Status</label>
              <div class="col-sm-10">
                <select class="form-select" v-model="project.status" required>
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
            <h5 style="font-weight: bold">Project Description</h5>
            <hr>
            <div class="col-12 mb-3">
              <div class="form-group">
                <label for="Name">Description</label>
                <ckeditor
                    :editor="editor"
                    v-model="project.descriptions"
                    :config="editorConfig"
                ></ckeditor>
              </div>
            </div>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-4">
          <div class="row">
            <h5 style="font-weight: bold">Project Client</h5>
            <hr>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="inputEmail3" class="col-sm-4 col-form-label">Client</label>
                <div class="col-sm-8">
                  <select
                      type="text"
                      class="form-select"
                      v-model="project.client_id"
                      required
                  >
                    <option disabled value="">Choose...</option>
                    <option v-for="item in user" :key="item.id" :value="item.id">{{ item.contact_name }}
                    </option>
                  </select>
                </div>

              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="Name" class="col-sm-4 col-form-label">Contact Person</label>
                <div class="col-sm-8">
                  <input
                      type="text"
                      class="form-control"
                      v-model="project.client_contact_person"
                      placeholder="Please input text"
                      required
                  />
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="Name" class="col-sm-4 col-form-label">Contact Number</label>
                <div class="col-sm-8">
                  <input
                      type="text"
                      class="form-control"
                      v-model="project.client_contact_number"
                      placeholder="Please input text"
                      required
                  />
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="Name" class="col-sm-4 col-form-label">Contact Mail</label>
                <div class="col-sm-8">
                  <input
                      type="text"
                      class="form-control"
                      v-model="project.client_contact_mail"
                      placeholder="Please input text"
                      required
                  />
                </div>
              </div>
            </div>
            <h5 style="font-weight: bold">Project Info</h5>
            <hr>
            <div class="col-3 mb-3">
              <div class="form-group">
                <label for="Name" class="col-sm-4 col-form-label">Attachment</label>
                <label class="label">
                  <input
                      type="file"
                      accept="image/*"
                      @change="onFileChange"
                  />
                  <span>Browse</span>
                </label>
                <br>
                <br>
                <img alt="No Image" v-if="project.project_picture" :src="project.project_picture"
                     class="avatar-xl mx-auto bg-gray-100" style="height: 80px; width: 150px">
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
    </form>
  </div>
</template>

<script>
import RequestBlogPost from "../../../payloads/request/RequestBlogPost";
import RequestProject from "@/payloads/request/RequestProject";
import ProjectService from "@/services/project.service";
import BlogPostService from "../../../services/blogPost.service";
import Utils from "../../../helpers/Utils";
import FormHeader from "../../navigation/FormHeader";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import router from "../../../router";
import EticketCategoriesService from "@/services/eticketcategories.service";
import RequestEticket from "@/payloads/request/RequestEticket";
import EticketPriorityService from "@/services/eticketpriority.service";
import UserService from "@/services/user.service";
import EticketissuetypeService from "@/services/eticketissuetype.service";
import Pages from "@/helpers/Project";
import EticketmilestoneService from "@/services/eticketmilestone.service";
import Calendar from "primevue/calendar";
import ContactService from "@/services/contact.service";

export default {
  components: {
    FormHeader,
    Calendar
  },
  data() {
    return {
      post: new RequestBlogPost(),
      eticket: new RequestEticket(),
      project: new RequestProject(),
      ticket: [],
      user: [],
      ticketCategories: [],
      ticketPriority: [],
      ticketIssueType: [],
      ticketMilestone: [],
      status: Utils.status(),
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: Utils.editorConfig()
    };
  },
  created() {
    this.getListUser();
    this.getTicketCategories();
    this.getTicketPriority();
    this.getTicketIssueType();
    this.getTicketMilestone();
  },
  mounted() {
    this.project.project_start_date = new Date().toISOString().substr(0, 10);
    this.project.project_due_date = new Date().toISOString().substr(0, 10);
    this.project.year = new Date().toISOString().substr(0, 4);
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      ProjectService.postCreate(this.project).then((response) => {
        if (response.code === 200) {
          this.project = new RequestProject();
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Project has been created",
          });
          router.push(Pages.PROJECT);
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    getListUser() {
      let loading = this.$loading.show();
      ContactService.getAll().then((response) => {
        if (response.code === 200) {
          this.user = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Client Contact" + response.message, "error");
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
        this.project.project_picture = e.target.result;
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
