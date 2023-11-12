<script setup lang="ts">
import MapSearchBar from '@/components/map/MapSearchbar.vue'
import MapContent from '@/components/map/MapContent.vue'
import MapSearchResults from '@/components/map/MapSearchResults.vue'

import { ref } from 'vue'

// refs
const selectedAttraction = ref()
const searchedData = ref()

const onDoSearch = (searchedResultData: any) => {
  searchedData.value = searchedResultData
}

const onChangeAttraction = (newAttraction: any) => {
  selectedAttraction.value = newAttraction
}
</script>

<template>
  <main>
    <!-- 중앙 content start -->
    <div class="container map-view">
      <div style="height: 70px"></div>
      <div class="row">
        <!-- 중앙 center content end -->
        <div class="col-md-9 mx-auto mb-3">
          <div class="alert alert-primary mt-3 text-center fw-bold" role="alert">
            전국 관광지 정보
          </div>

          <!-- Map Searchbar Component -->
          <MapSearchBar @do-search="onDoSearch" />
          <!-- Map Content Component -->
          <MapContent :markerInfo="searchedData" :selectedAttraction="selectedAttraction" />
          <!-- Map SearchResults Component -->
          <MapSearchResults :markerInfo="searchedData" @attraction-changed="onChangeAttraction" />
        </div>
      </div>
      <!-- 중앙 content end -->
    </div>
  </main>
</template>
