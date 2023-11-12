<!-- 페이지 네이션 코드 -->
<script setup lang="ts">
import { computed, watch } from 'vue'

const props = defineProps({ currentPage: Number, totalPage: Number })
const emit = defineEmits(['pageChange'])

const navigationSize = parseInt(import.meta.env.VITE_ARTICLE_NAVIGATION_SIZE)

// navigation의 시작 번호
const startPage = computed(() => {
  // (props.currentPage - 1) : -1 하는 이유는 props.currentPage이 10이고 navigationSize도 10일 경우 다음 섹션을 넘어가지 않고 현재 섹션에서 표현해줘야하기 때문에 -1을 수행한다.
  // (props.currentPage - 1) / navigationSize : 표현해야 하는 섹션이 몇 번째 섹션인지에 대해 알려준다.
  // * navigationSize : 섹션의 시작수가 몇으로 시작해야되는지에 관한 정보
  // + 1 : 시작 페이지이기 때문에 + 1을 수행한다.

  return (
    parseInt((((props.currentPage as number) - 1) / navigationSize).toString()) * navigationSize + 1
  )
})

// navigation의 끝 번호
const endPage = computed(() => {
  // + navigationSize : 마지막 페이지이기 때문에 + navigationSize를 수행한다.
  // 마지막 페이지가 전체 페이지를 넘어갈 경우 전체 페이지로 표시해준다.
  let lastPage =
    parseInt((((props.currentPage as number) - 1) / navigationSize).toString()) * navigationSize +
    navigationSize
  return (props.totalPage as number) < lastPage ? (props.totalPage as number) : lastPage
})

// 현재 navigation에서 마지막 페이지를 가지고 있는지
const isEndRange = computed(() => {
  // const value1 = ((props.currentPage as number) - 1) / navigationSize
  const currentPageRange = parseInt(((props.currentPage as number) / navigationSize).toString())
  const endPageRange = parseInt(((props.totalPage as number) / navigationSize).toString())
  return currentPageRange === endPageRange
})

// 표시할 페이지 범위
function range(start: number, end: number) {
  const list = []
  for (let i = start; i <= end; i++) list.push(i)
  return list
  //   return Array(end - start + 1)
  //     .fill()
  //     .map((val, i) => start + i);
}

function onPageChange(pg: Event) {
  console.log(pg + '로 이동!!!')
  emit('pageChange', pg)
}

console.log(props.currentPage, props.totalPage)
watch(
  () => props.currentPage,
  (newValue) => {
    console.log(props.currentPage, endPage.value, props.totalPage)
    console.log('computed Page', startPage.value)
  }
)
</script>

<template>
  <div class="row">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" @click="onPageChange(1)">최신</a>
      </li>
      <li class="page-item">
        <a class="page-link" @click="onPageChange(startPage == 1 ? 1 : startPage - 1)">이전</a>
      </li>
      <template v-for="pg in range(startPage, endPage)" :key="pg">
        <li :class="currentPage === pg ? 'page-item active' : 'page-item'">
          <a class="page-link" @click="onPageChange(pg)">{{ pg }}</a>
        </li>
      </template>
      <li class="page-item">
        <a class="page-link" @click="onPageChange(isEndRange ? totalPage : endPage + 1)">다음</a>
      </li>
      <li class="page-item"><a class="page-link" @click="onPageChange(totalPage)">마지막</a></li>
    </ul>
  </div>
</template>

<style scoped>
a {
  cursor: pointer;
}
</style>
