<template>
  <div class="stepped-area-chart mt-4">
      <GChart
          :settings="{ packages: ['corechart'] }"
          type="SteppedAreaChart"
          :data="chartData"
          :options="chartOptions"
          :events="chartEvents"
      />
    </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "SteppedAreaChart",
  components: {
    GChart
  },
  data() {
    return {
      chartData: [
        ["code", "Selling", "Stock"],
        ["01", 100, 50],
        ["02", 150, 350],
        ["03", 200, 450],
        ["04", 100, 700],
        ["05", 100, 700],
        ["06", 100, 700],
        ["07", 100, 200],
        ["08", 100, 700],
        ["09", 100, 700],
        ["10", 100, 700],
        ["11", 100, 700],
        ["12", 100, 700],
        ["13", 1000, 300]
      ],
      chartOptions: {
        animation: {
          startup: true
        },
        chartArea: {
          backgroundColor: "#eee",
          height: "150",
          width: "90%"
        },
        title: "Selling",
        vAxis: {
          title: "Stock",
          slantedTextAngle: -90,
          viewWindowMode: "maximized"
        },
        isStacked: true,
        backgroundColor: "#fff",
        legend: { position: "bottom" },
        connectSteps: false,
        selectionMode: "multiple",
        aggregationTarget: "series",
        enableInteractivity: true
      },
      chartEvents: {
        click: id => {
          console.log(id);
        }
      }
    };
  },
  methods: {}
};
</script>
