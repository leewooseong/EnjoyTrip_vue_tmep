<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { getSiDoData, getGunGuData, getSearchedData } from '@/services/apis/map.ts'

// const openApiKey = import.meta.env.VITE_PUBLIC_API_DECODING_KEY
const openApiKey = import.meta.env.VITE_PUBLIC_API_ENCODING_KEY

const emit = defineEmits(['doSearch'])

// vue state variables & functions
const siDoData = ref<any[]>([])
const gunGuData = ref<any[]>([])
const selectedSiDo = ref(0)
const selectedGunGu = ref(0)

const areaSiDoURL =
  'https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=' +
  openApiKey +
  '&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json'

const setSiDoData = async () => {
  siDoData.value = await getSiDoData(areaSiDoURL)
}

onMounted(() => {
  setSiDoData()
})

let areaGunGuURL: any

const setGunGuData = async () => {
  gunGuData.value = await getGunGuData(areaGunGuURL)
}

watch(selectedSiDo, async (newSiDo, oldValue) => {
  areaGunGuURL = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${openApiKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&areaCode=${newSiDo}`
  await setGunGuData()
})

// event handler functions
const onSearch = async (event: Event) => {
  event.preventDefault()
  const formData = new FormData(event.target as HTMLFormElement)
  const searchInputData = {
    siDoCode: formData.get('si-do') as string,
    gunGuCode: formData.get('gun-gu') as string,
    category: formData.get('attraction-category') as string,
    searchWord: formData.get('search-word') as string
  }

  const searchedData = await getSearchedData(searchInputData)
  emit('doSearch', searchedData)
}
</script>

<template>
  <form class="d-flex my-3" @submit="onSearch" role="search">
    <!-- api로 데이터를 받아서 뿌려주기 -->
    <select name="si-do" id="search-si-do" class="form-select me-2" v-model="selectedSiDo">
      <option value="0">시,도 선택</option>
      <option v-for="siDo in siDoData" :key="siDo.rNum" :value="siDo.code">
        {{ siDo.name }}
      </option>
    </select>
    <select name="gun-gu" id="search-gun-gu" class="form-select me-2" v-model="selectedGunGu">
      <option value="0">군,구 선택</option>
      <option v-for="gnuGu in gunGuData" :key="gnuGu.rNum" :value="gnuGu.code">
        {{ gnuGu.name }}
      </option>
    </select>
    <select name="attraction-category" id="search-content-id" class="form-select me-2">
      <option value="0" selected>관광지 유형</option>
      <option value="12">관광지</option>
      <option value="14">문화시설</option>
      <option value="15">축제공연행사</option>
      <option value="25">여행코스</option>
      <option value="28">레포츠</option>
      <option value="32">숙박</option>
      <option value="38">쇼핑</option>
      <option value="39">음식점</option>
    </select>
    <input
      name="search-word"
      id="search-keyword"
      class="form-control me-2"
      type="search"
      placeholder="검색어"
      aria-label="검색어"
    />
    <button id="btn-search" class="btn btn-outline-success" type="submit">검색</button>
  </form>
</template>

<style scoped></style>
