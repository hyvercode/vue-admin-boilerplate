<template>
  <div class="chart-map mt-1">
    <GChart
        type="Map"
        :data="chartData"
        :options="chartOptions"
        :settings="{ packages: ['corechart', 'map'], mapsApiKey: 'AIzaSyAI_DjcJ3A0NUlruhW4zNch-BtKcuHnYCU' }"
        :events="chartEvents"
    />
  </div>
</template>

<script>
import {GChart} from 'vue-google-charts';
export default {
  name: "MapChart",
  components: {
    GChart,
  },
  props: {
    chartData: Array,
    title: String,
    zoonLevel:Number
  },
  data() {
    return {
      chartOptions: {
        chart: {
          title: this.title,
        },
        center:this.chartData[1],
        mapType: 'normal',
        zoomLevel: this.zoomLevel,
        showInfoWindow: true,
        useMapTypeControl: true,
        icons: {
          default: {
            normal: '/pin.png',
            selected: '/pin.png',
          }
        }
      },

      chartEvents: {
        'click': () => {
          alert('click')
        }
      }
    }
  }
}
</script>

<style>
.chart-map {
  margin-top: 35px;
  background-color: #FFFFFF;
  border-radius: 10px;
}
</style>