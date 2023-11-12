<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps({ markerInfo: Object })
const emit = defineEmits(['attractionChanged'])

// refs
const markerInfo = ref(props.markerInfo as any)
const isTableDisplay = computed(() => {
  if (markerInfo?.value?.length > 0) {
    return ''
  }
  return 'none'
})

watch(
  () => props.markerInfo,
  (newMarkerInfo) => {
    markerInfo.value = newMarkerInfo
  }
)

const onMoveCenter = (event: Event) => {
  const attractionTitle = (event.currentTarget as HTMLTableRowElement).dataset.attraction
  const attractionInfo = markerInfo.value.filter((marker: any) => marker.title === attractionTitle)
  emit('attractionChanged', attractionInfo[0])
}
</script>

<!-- 관광지 정보 검색 결과 리스트 -->
<template>
  <div class="row">
    <table class="table table-striped" :style="{ display: isTableDisplay }">
      <thead>
        <tr>
          <th>대표이미지</th>
          <th>관광지명</th>
          <th>주소</th>
          <th>위도</th>
          <th>경도</th>
        </tr>
      </thead>
      <tbody id="trip-list">
        <tr
          v-for="(markerItem, index) in markerInfo"
          :key="`marker-${index}`"
          @click="onMoveCenter"
          :data-attraction="markerItem.title"
        >
          <td><img :src="markerItem.firstimage" /></td>
          <td>{{ markerItem.title }}</td>
          <td>{{ markerItem.addr1 }} {{ markerItem.addr2 }}</td>
          <td>{{ markerItem.mapy }}</td>
          <td>{{ markerItem.mapx }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table img {
  width: 100px;
}
table tr {
  cursor: pointer;
}
</style>

<!-- v-for="(item, index) in markersInfo" -->
