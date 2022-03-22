<template>
  <div class="pie-chart mt-4">
    <GChart
        type="PieChart"
        :settings="{ packages: ['corechart'] }"
        :data="chartData"
        :options="chartOptions.chart"
    />
  </div>
</template>

<script>
import {GChart} from "vue-google-charts";

export default {
  name: "PieChart",
  components: {
    GChart
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7]
      ],
      chartOptions: {
        chart: {
          title: "My Daily Activities",
          pieHole: 0.4
        }
      }
    };
  }
};
</script>