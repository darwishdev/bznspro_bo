<script setup lang="ts">
import Chart from 'primevue/chart';
import { ref, onMounted } from "vue";
import {
  chartDonught,
  chartBar,
  chartBarHor,
  chartBarStacked,
  chartLine,
  chartPolar
} from '@/api/DashboardMock'
const chartDataDonught = ref();
const chartDataBar = ref();
const chartDataBarHor = ref();
const chartDataBarStacked = ref();
const chartDataLine = ref();
const chartDataPolar = ref();
const loading = ref(true)
onMounted(() => {
  const documentStyle = getComputedStyle(document.body);
  chartDataDonught.value = chartDonught(documentStyle);
  chartDataBarHor.value = chartBarHor(documentStyle);
  chartDataBarStacked.value = chartBarStacked(documentStyle);
  chartDataLine.value = chartLine(documentStyle);
  chartDataPolar.value = chartPolar(documentStyle);
  chartDataBar.value = chartBar(documentStyle);
  loading.value = false
});



</script>

<template>
  <div class="dashboard">

    <div class="grid">
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Orders</span>
              <div class="text-900 font-medium text-xl">152</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
              style="width:2.5rem;height:2.5rem">
              <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">24 new </span>
          <span class="text-500">since last visit</span>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Revenue</span>
              <div class="text-900 font-medium text-xl">$2.100</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
              style="width:2.5rem;height:2.5rem">
              <i class="pi pi-map-marker text-orange-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">%52+ </span>
          <span class="text-500">since last week</span>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Customers</span>
              <div class="text-900 font-medium text-xl">28441</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-cyan-100 border-round"
              style="width:2.5rem;height:2.5rem">
              <i class="pi pi-inbox text-cyan-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">520 </span>
          <span class="text-500">newly registered</span>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <div class="surface-card shadow-2 p-3 border-round">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Comments</span>
              <div class="text-900 font-medium text-xl">152 Unread</div>
            </div>
            <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
              style="width:2.5rem;height:2.5rem">
              <i class="pi pi-comment text-purple-500 text-xl"></i>
            </div>
          </div>
          <span class="text-green-500 font-medium">85 </span>
          <span class="text-500">responded</span>
        </div>
      </div>
    </div>
    <div v-if="loading">
      loadig
    </div>
    <div class="grid" v-else>

      <div class="col-12 h-400 lg:col-6">
        <Chart class="bg-card" type="bar" :data="chartDataBarStacked.data" :options="chartDataBarStacked.options" />
      </div>

      <div class="col-12 h-400 lg:col-6">
        <Chart class="bg-card" type="bar" :data="chartDataBar.data" :options="chartDataBar.options" />
      </div>
    </div>
    <div class="grid" v-if="!loading">
      <div class="col-12 md:col-8">
        <Chart class="bg-card" type="bar" :data="chartDataBarHor.data" :options="chartDataBarHor.options" />
      </div>
      <div class="col-12 md:col-4">
        <Chart class="bg-card" type="doughnut" :data="chartDataDonught.data" :options="chartDataDonught.options" />
      </div>
    </div>
    <div class="grid" v-if="!loading">
      <div class="col-12 md:col-4">
        <Chart class="bg-card" type="polarArea" :data="chartDataPolar.data" :options="chartDataPolar.options" />
      </div>
      <div class="col-12 md:col-8">
        <Chart class="bg-card" type="line" :data="chartDataLine.data" :options="chartDataLine.options" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.dashboard {
  & .grid:not(:first-item) {
    min-height: 500px !important;
  }

  & .col-12 {
    padding: 20px;

    & .p-chart {
      min-height: 200px;
    }

    & .p-chart {
      height: 100% !important;
    }
  }


}
</style>