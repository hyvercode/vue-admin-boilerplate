<template>
  <div class="container bar">
    <h5 class="mt-3">Warehouse Selling, <span style="font-size: 14px">{{ date }}</span></h5>
    <div class="row mb-4">
      <div class="col-4" v-for="(item,index) in data" :key="index">
        <div class="row mt-2">
          <div class="col-4 text-left">
            <h5>{{ item.warehouse_name }}</h5>
            <h6>{{ item.total_sale }} / {{ item.total_assets }}
              ({{ ((item.total_sale / item.total_assets) * 100).toFixed(2) }} %)</h6>
          </div>
          <div class="col-8 text-left">
            <b-progress :max="item.total_assets">
              <b-progress-bar :value="item.total_sale"
                              :label="`${((item.total_sale / item.total_assets) * 100).toFixed(2)}%`"></b-progress-bar>
            </b-progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProgressBar",
  props: {
    data: Array,
    date: String
  }
}
</script>

<style scoped>
.bar .row h5 {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 10px;
  color: #858585
}

.bar .row h6 {
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 10px;
  color: #858585;
}
</style>