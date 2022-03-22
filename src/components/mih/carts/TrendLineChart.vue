<template>
  <div class="trend-line-chart mt-4">
    <GChart
        :settings="{ packages: ['line'] }"
        :data="chartData"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Line(el)"
        @ready="onChartReady"
    />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "TrendLineChart",
  components: {
    GChart,
  },
  data() {
    return {
      chartsLib: null,
      chartData: [
        ["Datum", "RandomVisitorNrs"],
        [new Date("2015-01-01"), 3898],
        [new Date("2015-02-01"), 3187],
        [new Date("2015-03-01"), 4598],
        [new Date("2015-04-01"), 4830],
        [new Date("2015-05-01"), 6401],
        [new Date("2015-06-01"), 2944],
        [new Date("2015-07-01"), 2485],
        [new Date("2015-08-01"), 2696],
        [new Date("2015-09-01"), 2766],
        [new Date("2015-10-01"), 3670],
        [new Date("2015-11-01"), 3617],
        [new Date("2015-12-01"), 3863],
        [new Date("2016-01-01"), 3750],
        [new Date("2016-02-01"), 3758],
        [new Date("2016-03-01"), 4367],
        [new Date("2016-04-01"), 4038],
        [new Date("2016-05-01"), 5333],
        [new Date("2016-06-01"), 5604],
        [new Date("2016-07-01"), 7371],
        [new Date("2016-08-01"), 4002],
        [new Date("2016-09-01"), 4692],
        [new Date("2016-10-01"), 3887],
        [new Date("2016-11-01"), 3028],
        [new Date("2016-12-01"), 3533],
        [new Date("2017-01-01"), 3877],
        [new Date("2017-02-01"), 4178],
        [new Date("2017-03-01"), 4507],
        [new Date("2017-04-01"), 4540],
        [new Date("2017-05-01"), 5254],
        [new Date("2017-06-01"), 6531],
        [new Date("2017-07-01"), 9099],
        [new Date("2017-08-01"), 4000],
        [new Date("2017-09-01"), 4106],
        [new Date("2017-10-01"), 4002],
        [new Date("2017-11-01"), 4418],
        [new Date("2017-12-01"), 4931],
        [new Date("2018-01-01"), 4650],
        [new Date("2018-02-01"), 3750],
        [new Date("2018-03-01"), 6069],
        [new Date("2018-04-01"), 6704],
        [new Date("2018-05-01"), 6028],
        [new Date("2018-06-01"), 8078],
        [new Date("2018-07-01"), 10903],
        [new Date("2018-08-01"), 5888],
        [new Date("2018-09-01"), 5519],
        [new Date("2018-10-01"), 4555],
        [new Date("2018-11-01"), 3998],
        [new Date("2018-12-01"), 6998],
      ],
    };
  },
  computed: {
    chartOptions() {
      if (!this.chartsLib) return null;
      return this.chartsLib.charts.Line.convertOptions({
        vAxis: { format: "" },
        height: 500,
        colors: ["#d95f02"],
        legend: { position: "none" },
        trendlines: {
          1: {
            type: "linear",
            color: "green",
          },
        },
      });
    },
  },
  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google;
    },
  },
};
</script>
