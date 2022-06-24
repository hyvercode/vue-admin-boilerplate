<template>
  <div class="container-fluid">
    <h2>Task "{{task.task_name}}" "{{task.status}}"</h2>
    <br>
    <!--    <form-header title="Project Header"/>-->
      <div class="row">
        <div class="col-6">
          <div class="row">
            <h5 style="font-weight: bold">Task Detail</h5>
            <hr>
            <div class="col-12 mb-3">
              <div class="row">
                <div class="col-6">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Task</label>
                    <div class="col-sm-9">
                      <input
                          type="text"
                          class="form-control"
                          placeholder="Please input text"
                          disabled
                          v-model="task.task_number"
                      />
                    </div>

                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Subject</label>
                    <div class="col-sm-9">
                      <input
                          type="text"
                          class="form-control"
                          placeholder="Please input text"
                          disabled
                          v-model="task.task_name"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="row">
                <div class="col-6">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Start Date</label>
                    <div class="col-sm-9">
                      <input
                          type="text"
                          class="form-control"
                          placeholder="Please input text"
                          disabled
                          v-model="task.start_date"
                      />
                    </div>

                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Due Date</label>
                    <div class="col-sm-9">
                      <input
                          type="text"
                          class="form-control"
                          placeholder="Please input text"
                          disabled
                          v-model="task.due_date"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="row">
                <div class="col-6">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Priority</label>
                    <div class="col-sm-9">
                      <input
                          type="text"
                          class="form-control"
                          placeholder="Please input text"
                          disabled
                          v-model="task.task_priority_name"
                      />
                    </div>

                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Type</label>
                    <div class="col-sm-9">
                      <input
                          type="text"
                          class="form-control"
                          placeholder="Please input text"
                          disabled
                          v-model="task.task_type_name"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="row">
                <div class="col-6">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Category</label>
                    <div class="col-sm-9">
                      <input
                          type="text"
                          class="form-control"
                          placeholder="Please input text"
                          disabled
                          v-model="task.task_category_name"
                      />
                    </div>

                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Project</label>
                    <div class="col-sm-9">
                      <input
                          type="text"
                          class="form-control"
                          placeholder="Please input text"
                          disabled
                          v-model="task.title"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="row">
                <div class="col-6">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Millestone</label>
                    <div class="col-sm-9">
                      <input
                          type="text"
                          class="form-control"
                          placeholder="Please input text"
                          disabled
                          v-model="task.milestone"
                      />
                    </div>

                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Attachment</label>
                    <div class="col-sm-9">
                      <a :href="task.attachments" target="_blank"><span
                          class="text-info"><i class="material-icons mt-2">attachment</i></span></a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <h5 style="font-weight: bold">Task Description</h5>
            <hr>
            <div class="col-12 mb-3">
              <h6>{{ task.body }}</h6>
            </div>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-5">
          <div class="row">
            <h5 style="font-weight: bold">Participant</h5>
            <hr>
            <div class="col-12 mb-3">
              <div class="row">
                <div class="col-6">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Assignee</label>
                    <div class="col-sm-9">
                      <label class="form-label mt-2" disabled>{{task.assignee_first_name}} {{task.assignee_last_name}}</label>
                    </div>

                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">CC</label>
                    <div class="col-sm-9">
                      <label class="form-label mt-2" disabled>{{task.assignee_cc_first_name}} {{task.assignee_cc_last_name}}</label>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <h5 style="font-weight: bold">Comment</h5>
            <hr>
            <div class="row">
              <div class="panel panel-default widget scroll-comment">
                <div class="panel-heading">
                </div>
                <div class="panel-body">
                  <ul class="list-group">
                    <li class="list-group-item" v-for="item in comment" :key="item.id">
                      <div class="row">
                        <div class="col-xs-2 col-md-1">
                          <img :src="item.avatar" class="img-circle img-responsive" alt=""/></div>
                        <div class="col-xs-10 col-md-11">
                          <div>
                            <a href="http://bootsnipp.com/BhaumikPatel/snippets/4ldn">{{ item.task_name }}</a>
                            <div class="mic-info">
                              By: <a href="#">{{ item.first_name }} {{ item.last_name }}</a> on {{ item.created_at }}
                            </div>
                          </div>
                          <div class="comment-text" v-html="item.body">
                          </div>
                          <div class="action">
                            <a :href="item.attachments" target="_blank"><i class="material-icons mt-2">attachment</i><span
                                class="text-info"></span></a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <form @submit.prevent="submit($event)">
            <div class="col-12 mb-3">
              <div class="form-group">
                <label for="Name">Comment Section</label>
                <ckeditor
                    :editor="editor"
                    v-model="comments.body"
                    :config="editorConfig"
                ></ckeditor>
              </div>
            </div>
              <div class="col-5 mb-3">
                <div class="form-group">
                  <label for="Name">Attachment</label>
                  <input class="form-control btn btn-light btn-sm" type="file" accept="image/*"
                         @change="onFileChange" />
                  <br>
                  <br>
                  <img alt="No Image" v-if="comments.attachments" :src="comments.attachments"
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
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Utils from "@/helpers/Utils";
import ProjectTaskService from "@/services/projecttask.service";
import ProjecttaskcommentService from "@/services/projecttaskcomment.service";
import RequestProjectTaskComment from "@/payloads/request/RequestProjectTaskComment";

export default {
  name: "Index",
  data() {
    return {
      task: {},
      comment: {},
      comments: new RequestProjectTaskComment(),
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: Utils.editorConfig(),
      task_id: null
    }
  },
  mounted() {
    this.getTaskDetail();
  },
  methods:{
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      this.comments.task_id = this.task_id;
      ProjecttaskcommentService.postCreate(this.comments).then((response) => {
        if (response.code === 200) {
          loading.hide();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Comment has been create",
          });
          this.editor = [];
          this.getTaskComment(this.task_id);
          // router.push(Pages.ETICKETS);
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    getTaskDetail() {
      let loading = this.$loading.show();
      ProjectTaskService.getShow(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          this.task = response.data;
          this.task_id = this.task.id
          this.getTaskComment(this.task.id);
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Task " + response.message, "error");
        }
      });
    },
    getTaskComment(id) {
      let loading = this.$loading.show();
      ProjecttaskcommentService.getAllById(id).then((response) => {
        if (response.code === 200) {
          this.comment = response.data;
          loading.hide();
        } else {
          loading.hide();
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
        this.comments.attachments = e.target.result;
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
  margin-left: 5px;
  margin-right: 5px;
}

.span-left {
  word-break: break-word;
  margin-left: 5px;
  margin-right: 5px;
}

.ck-editor__editable {
  min-height: 300px;
}

.widget .panel-body {
  padding: 0px;
}

.widget .list-group {
  margin-bottom: 0;
}

.widget .panel-title {
  display: inline
}

.widget .label-info {
  float: right;
}

.widget li.list-group-item {
  border-radius: 0;
  border: 0;
  border-top: 1px solid #ddd;
}

.widget li.list-group-item:hover {
  background-color: rgba(86, 61, 124, .1);
}

.widget .mic-info {
  color: #666666;
  font-size: 11px;
}

.widget .action {
  margin-top: 5px;
}

.widget .comment-text {
  font-size: 12px;
}

.widget .btn-block {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
</style>
