<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-3 border" style="min-width: 300px;"  @click="onClick(task)">
    <div class="row">
      <div class="col-10">
        <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ task.subject }}</p>
      </div>
      <div class="col-2">
        <img  v-if="task.avatar"
            style="border-radius: 50%;width: 30px;height: 30px;margin-left: 5px;"
            :src="task.avatar"
            alt="avatar"
        >
        <avatar v-else :username="task.issue_type_name" :size="size"></avatar>
      </div>
    </div>
    <div class="d-flex mt-4 justify-content-between items-center">
      <span class="text-sm text-gray-600">{{ task.request_date }}</span>
      <badge v-if="task.issue_type_name" :color="badgeColor">{{ task.issue_type_name }}</badge>
    </div>
  </div>
</template>
<script>
import Badge from "./Badge.vue";
import avatar from 'vue-avatar'

export default {
  components: {
    Badge,avatar
  },
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    return{
      size:30
    }
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
      return mappings[this.task.issue_type_name] || mappings.default;
    }
  },
  methods:{
    /**
     * On Click
     */
    onClick(props) {
      // alert('Click');
      this.$emit("onClick", props)
    },
  }
};
</script>
