<template>
  <div class="time-line-chart mt-4">
    <GChart
        ref="gChart"
        :settings="{ packages: ['timeline'] }"
        type="Timeline"
        :data="chartData"
        :options="chartOptions"
        class="googleChart"
        @ready="onChartReady"
    />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "TimelineChart",
  components: {
    GChart,
  },
  data() {
    return {
      chartData: [
        [
          { type: "string", label: "Task Name" },
          { type: "date", label: "Start Date" },
          { type: "date", label: "End Date" },
        ],
        ["now", new Date(), new Date()],
        [
          "test1",
          new Date("2021-07-06T06:29:35.161Z"),

          new Date("2021-07-07T10:29:35.161Z"),
        ],
        [
          "test2",
          new Date("2021-07-07T00:29:35.161Z"),
          new Date("2021-07-08T08:29:35.161Z"),
        ],
        [
          "test3",
          new Date("2021-07-08T12:29:35.161Z"),
          new Date("2021-07-08T16:29:35.161Z"),
        ],
      ],
      chartOptions: {
        height: 230,
        timeline: {
          showRowLabels: true,
          colorByRowLabel: true,
          groupByRowLabel: false,
        },
        avoidOverlappingGridLines: false,
      },
    };
  },
  methods: {
    nowLine() {
      const gchartQuery = document.getElementsByClassName("googleChart");
      console.log(gchartQuery[0].getElementsByTagName("rect"));
      console.log(gchartQuery[0].getElementsByTagName("rect")[0]);

      const timelineQuery = document.querySelectorAll(".googleChart rect");
      console.log(timelineQuery);

      console.log(this.$refs.gChart.$el);
    },
    onChartReady() {
      this.nowLine();
    },
  },
};
</script>
