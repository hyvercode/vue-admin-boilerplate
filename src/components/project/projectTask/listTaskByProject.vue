<template>
  <div class="container-fluid">
    <h2>List Task</h2>
    <br>
    <div class="row">
      <div class="col-3" v-for="item in listtask" :key="item.id">
        <div class="bg-white shadow rounded px-3 pt-3 pb-3 border" style="min-width: 300px;"  @click="onClickTask(item.id)">
          <div class="row">
            <div class="col-10">
              <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ item.task_number }}</p>
              <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ item.task_name }}</p>
            </div>
            <div class="col-2">
              <img
                    style="border-radius: 50%;width: 30px;height: 30px;margin-left: 5px;"
                    v-if="item.avatar"
                    :src="item.avatar"
                    alt="avatar"
              >
              <img
                  style="border-radius: 50%;width: 30px;height: 30px;margin-left: 5px;"
                  v-else
                  src="https://static.remove.bg/remove-bg-web/5c20d2ecc9ddb1b6c85540a333ec65e2c616dbbd/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
                  alt="avatar"
              >
            </div>
          </div>
          <div class="d-flex mt-4 justify-content-between items-center">
            <span class="text-sm text-gray-600">{{ format_date(item.created_at)}}</span>
            <badge :color="badgeColor">{{ item.status }}</badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import ProjectTaskService from "@/services/projecttask.service";
import moment from 'moment';
import RequestProjectTask from "@/payloads/request/RequestProjectTask";
import Badge from "@/components/hyver-vue/components/kanban/Badge";

export default {
  name: "ListTaskByProject",
  components: {
    Badge
  },
  data() {
    return {
      listtask: new RequestProjectTask(),
      records: [],
    };
  },
  computed: {
    badgeColor() {
      const mappings = {
        Design: "green",
        Feature: "grey",
        Backend: "success",
        QA: "purple",
        default: "primary",
        Backlog: "danger",
        Bugs:"red",
        Error:"warning"
      };
      return mappings[this.listtask.status] || mappings.default;
    }
  },
  mounted() {
    this.getTaskDetail();
  },
  methods: {
    format_date(value){
      if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
      }
    },

    async onClickTask(id) {
      await router.push(`/project/task/update/${id}`);
    },

    getTaskDetail() {
      let loading = this.$loading.show();
      ProjectTaskService.findAllTaskById(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          this.listtask = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Task " + response.message, "error");
        }
      });
    },

  },
};
</script>

<style scoped></style>
