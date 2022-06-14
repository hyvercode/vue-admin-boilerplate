<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-3 border">
    <div class="row">
      <div class="col-10">
        <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ task.title }}</p>
      </div>
      <div class="col-2">
        <img
            style="border-radius: 50%;width: 30px;height: 30px;margin-left: 5px;"
            src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
            alt="Avatar"
        >
      </div>
    </div>
    <div class="d-flex mt-4 justify-content-between items-center">
      <span class="text-sm text-gray-600">{{ task.date }}</span>
      <badge v-if="task.type" :color="badgeColor">{{ task.type }}</badge>
    </div>
  </div>
</template>
<script>
import Badge from "./Badge.vue";

export default {
  components: {
    Badge
  },
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    badgeColor() {
      const mappings = {
        Design: "purple",
        "Feature Request": "primary",
        Backend: "blue",
        QA: "green",
        default: "primary",
        Backlog: "danger"
      };
      return mappings[this.task.type] || mappings.default;
    }
  }
};
</script>
