<template xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
  <div class="container-fluid">
    <h2>Create Task</h2>
    <br>
    <!--    <form-header title="Project Header"/>-->
    <form @submit.prevent="submit($event)">
      <div class="row">
        <div class="col-6">
          <h5 style="font-weight: bold">Task Header</h5>
          <hr>
          <div class="col-12 mb-3">
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Project</label>
              <div class="col-sm-10">
                <select
                    type="text"
                    class="form-select"
                    v-model="projectTask.project_id"
                    required
                >
                  <option disabled value="">Choose...</option>
                  <option v-for="item in projectList" :key="item.id" :value="item.id">{{ item.title }} {{
                      item.last_name
                    }}
                  </option>
                </select>
              </div>

            </div>
          </div>
          <div class="col-12 mb-3">
            <div class="form-group row">
              <label for="Name" class="col-sm-2 col-form-label">Task Number</label>
              <div class="col-sm-10">
                <input
                    type="text"
                    class="form-control"
                    v-model="projectTask.task_number"
                    placeholder="Please input text"
                    required
                />
              </div>
            </div>
          </div>
          <div class="col-12 mb-3">
            <div class="form-group row">
              <label for="Name" class="col-sm-2 col-form-label">Task Name</label>
              <div class="col-sm-10">
                <input
                    type="text"
                    class="form-control"
                    v-model="projectTask.task_name"
                    placeholder="Please input text"
                    required
                />
              </div>
            </div>
          </div>
          <div class="col-12 mb-3">
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Start Date</label>
              <div class="col-sm-10">
                <input
                    type="date"
                    placeholder="Please input date"
                    id="request_date"
                    name="birth_place"
                    class="form-control"
                    v-model="projectTask.start_date"
                    maxlength="20"
                />
              </div>

            </div>
          </div>
          <div class="col-12 mb-3">
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Due Date</label>
              <div class="col-sm-10">
                <input
                    type="date"
                    placeholder="Please input date"
                    id="request_date"
                    name="birth_place"
                    class="form-control"
                    v-model="projectTask.due_date"
                    maxlength="20"
                />
              </div>

            </div>
          </div>
          <h5 style="font-weight: bold">Task Participant</h5>
          <hr>
          <div class="col-12 mb-3">
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Reviewer</label>
              <div class="col-sm-10">
                <select
                    type="text"
                    class="form-select"
                    v-model="projectTask.reviewer_id"
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
              <label for="inputEmail3" class="col-sm-2 col-form-label">Assignee</label>
              <div class="col-sm-10">
                <select
                    type="text"
                    class="form-select"
                    v-model="projectTask.assignee_id"
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
              <label for="inputEmail3" class="col-sm-2 col-form-label">CC</label>
              <div class="col-sm-10">
                <select
                    type="text"
                    class="form-select"
                    v-model="projectTask.assignee_cc_id"
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
        </div>
        <div class="col-6">
          <div class="row">
            <h5 style="font-weight: bold">Task Details</h5>
            <hr>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="Name" class="col-sm-2 col-form-label">Type</label>
                <div class="col-sm-10">
                  <select
                      type="text"
                      class="form-select"
                      v-model="projectTask.task_type_id"
                      required
                  >
                    <option disabled value="">Choose...</option>
                    <option v-for="item in taskType" :key="item.id" :value="item.id">{{ item.task_type_name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="Name" class="col-sm-2 col-form-label">Priority</label>
                <div class="col-sm-10">
                  <select
                      type="text"
                      class="form-select"
                      v-model="projectTask.task_priority_id"
                      required
                  >
                    <option disabled value="">Choose...</option>
                    <option v-for="item in taskPriority" :key="item.id" :value="item.id">{{ item.task_priority_name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="Name" class="col-sm-2 col-form-label">Category</label>
                <div class="col-sm-10">
                  <select
                      type="text"
                      class="form-select"
                      v-model="projectTask.task_category_id"
                      required
                  >
                    <option disabled value="">Choose...</option>
                    <option v-for="item in taskCategory" :key="item.id" :value="item.id">{{ item.task_category_name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="form-group row">
                <label for="Name" class="col-sm-2 col-form-label">Parent Task</label>
                <div class="col-sm-10">
                  <select
                      type="text"
                      class="form-select"
                      v-model="projectTask.parent_task_id"
                      required
                  >
                    <option disabled value="">Choose...</option>
                    <option v-for="item in taskList" :key="item.id" :value="item.id">{{ item.task_name }}
                    </option>
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
                      v-model="projectTask.milestone"
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
                  <select class="form-select" v-model="projectTask.status" required>
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
                    v-model="projectTask.body"
                    :config="editorConfig"
                ></ckeditor>
              </div>
            </div>
            <div class="col-7
             mb-3">
              <div class="form-group">
                <label for="Name">Attachment</label>
                <input class="form-control btn btn-light btn-sm" type="file" accept="image/*"
                       @change="onFileChange" />
                <br>
                <br>
                <img alt="No Image" v-if="projectTask.attachments" :src="projectTask.attachments"
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
import RequestProject from "@/payloads/request/RequestProject";
import ProjectService from "@/services/project.service";
import BlogPostService from "../../../services/blogPost.service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import router from "../../../router";
import EticketCategoriesService from "@/services/eticketcategories.service";
import EticketPriorityService from "@/services/eticketpriority.service";
import UserService from "@/services/user.service";
import EticketissuetypeService from "@/services/eticketissuetype.service";
import Pages from "@/helpers/Project";
import EticketmilestoneService from "@/services/eticketmilestone.service";
import Utils from "@/helpers/Utils";
import RequestProjectTask from "@/payloads/request/RequestProjectTask";
import ProjecttaskService from "@/services/projecttask.service";
import ProjectpriorityService from "@/services/projecttaskpriority.service";
import ProjecttaskcategoryService from "@/services/projecttaskcategory.service";
import ProjecttasktypeService from "@/services/projecttasktype.service";

export default {
  components: {
  },
  data() {
    return {
      project: new RequestProject(),
      projectTask: new RequestProjectTask(),
      ticket: [],
      user: [],
      taskCategory: [],
      taskPriority: [],
      taskType: [],
      taskList: [],
      projectList: [],
      ticketMilestone: [],
      status: Utils.status(),
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: Utils.editorConfig()
    };
  },
  created() {
    this.getListUser();
    this.getTaskCategories();
    this.getTaskPriority();
    this.getTaskType();
    this.getTicketMilestone();
    this.getTaskList();
    this.getProjectList();
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
      ProjecttaskService.postCreate(this.projectTask).then((response) => {
        if (response.code === 200) {
          this.projectTask = new RequestProjectTask();
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Task has been created",
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
    getTaskCategories() {
      let loading = this.$loading.show();
      ProjecttaskcategoryService.getAll().then((response) => {
        if (response.code === 200) {
          this.taskCategory = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Categories" + response.message, "error");
        }
      });
    },
    getTaskPriority() {
      let loading = this.$loading.show();
      ProjectpriorityService.getAll().then((response) => {
        if (response.code === 200) {
          this.taskPriority = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Priority" + response.message, "error");
        }
      });
    },
    getTaskType() {
      let loading = this.$loading.show();
      ProjecttasktypeService.getAll().then((response) => {
        if (response.code === 200) {
          this.taskType = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Issue Type" + response.message, "error");
        }
      });
    },
    getTaskList() {
      let loading = this.$loading.show();
      ProjecttaskService.getAll().then((response) => {
        if (response.code === 200) {
          this.taskList = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Issue Type" + response.message, "error");
        }
      });
    },
    getProjectList() {
      let loading = this.$loading.show();
      ProjectService.getAll().then((response) => {
        if (response.code === 200) {
          this.projectList = response.data;
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
