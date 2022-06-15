<template>
  <div id="app" class="div-scroll">
    <div class="d-flex justify-center">
      <div class="min-h-screen d-flex overflow-x-scroll py-4">
        <div
            v-for="(column,index) in columns"
            :key="index"
            class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded" style="margin-left: 10px;"
        >
          <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ column.title }}</p>
          <draggable
              :list="column.tasks"
              :animation="200"
              ghost-class="ghost-card"
              group="tasks">
            <task-card
                v-for="(task) in column.tasks"
                :key="task.id"
                :task="task"
                class="mt-3 cursor-move"
                @onClick="onClick(task)"
            ></task-card>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TaskCard from "../kanban/Task";

export default {
  name: "App",
  components: {
    TaskCard,
    draggable
  },
  props: {
    records: {
      type: Array,
      required: true,
      default: [
        {
          id: 1,
          status: "Backlog",
          subject: "Add discount code to checkout page",
          request_date: "Sep 14",
          issue_type_name: "Feature Request",
          avatar: "https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
        },
        {
          id: 1,
          status: "Done",
          subject: "Add discount code to checkout page",
          request_date: "Sep 14",
          issue_type_name: "Done",
          avatar: "https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
        },
        {
          id: 1,
          status: "In Progress",
          subject: "Add discount code to checkout page",
          request_date: "Sep 14",
          issue_type_name: "Design",
          avatar: "https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
        },
      ],
    }
  },
  computed: {
    columns() {
      return Object.keys(this.groupBy(this.records.sort(this.dynamicSort('status_code')))).map(index => {
        return {
          title: index,
          tasks: this.groupBy(this.records)[index]
        };
      });
    },
    draggingRows() {
      return this.columns();
    }
  },
  methods: {
    log: function (evt) {
      window.console.log(evt);
    },
    /**
     * On Dragable
     */
    onDragAble(evt) {
      this.$emit("onDragAble", this.draggingRows)
    },

    /**
     * On Click
     */
    onClick(props) {
      // alert('Click');
      this.$emit("onClick", props)
    },

    groupBy(array) {
      let groupedData = {};
      array.forEach(item => {
        if (!groupedData[item.status]) {
          groupedData[item.status] = [];
        }
        groupedData[item.status].push(item);
      })
      return groupedData;
    },
    dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      }
    }
  }
};
</script>

<style scoped>
.column-width {
  /*min-width: 320px;*/
  /*width: 320px;*/
}

.div-scroll {
  overflow-x: scroll;
  scrollbar-width: none;
}

.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
</style>
