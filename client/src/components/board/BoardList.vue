<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VSelect from '@/components/common/VSelect.vue'
import BoardListItem from '@/components/board/item/BoardListItem.vue'
import PageNavigation from '@/components/common/PageNavigation.vue'

import { isLoggedIn } from '@/utils/auth.js'
import { getArticleList } from '@/services/apis/board.ts'
import router from '@/router'

// select에 저장되는 배열
const selectOption = ref([
  { text: '글번호', value: 'article_no' },
  { text: '제목', value: 'subject' },
  { text: '작성자', value: 'user_id' }
])

const articleList = ref<any[]>([])
const articles = ref(articleList)
const currentPage = ref(1) // 요청할 페이지 정보(=이동할 페이지)
const totalPage = ref(35) // 총 페이지 정보
// API 요청시 사용되는 정보들
const param = ref({
  pgno: currentPage.value, // 이동할 페이지 정보
  spp: import.meta.env.VITE_ARTICLE_LIST_SIZE, // 한 페이지에 표시할 게시글 수
  key: 'article_no', // 검색 조건
  word: '' // 검색어
})

onMounted(() => {
  setArticleListInfo()
})

const setArticleListInfo = async () => {
  const data = await getArticleList({
    pageToMove: param.value.pgno,
    shownArticleNum: param.value.spp,
    searchCategory: param.value.key,
    searchWord: ''
  })
  console.log(data)
  articleList.value = data
}

// 검색 부분의 Select가 변경되면 해당 이벤트 핸들러가 실행된다.
// -> 이 핸들러를 실행하여 API 요청에 쓰이는 key property를 셋팅할 수 있다.
const changeKey = (val: string) => {
  console.log('BoarList에서 선택한 조건 : ' + val)
  param.value.key = val
}

const onPageChange = (val: number) => {
  console.log(val + '번 페이지로 이동 준비 끝!!!')
  param.value.pgno = val
  currentPage.value = val
  setArticleListInfo()
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글목록</mark>
        </h2>
      </div>
      <div class="col-lg-10">
        <div class="row align-self-center mb-2">
          <div class="col-md-2 text-start">
            <button type="button" class="btn btn-outline-primary btn-sm">
              <RouterLink to="/qna/write">글쓰기</RouterLink>
            </button>
          </div>
          <div class="col-md-5 offset-5">
            <form class="d-flex">
              <!-- <select class="form-select form-select-sm ms-5 me-1 w-50" aria-label="검색조건">
                <option selected>검색조건</option>
                <option value="articleno">글번호</option>
                <option value="subject">제목</option>
                <option value="userid">작성자</option>
              </select> -->
              <!-- 
                Select를 컴포넌트로 분리
                - 게시판 외에도 이를 사용하기 위해서
                - selectOption을 통해서 해당 select에 표시되는 내용을 교체할 수 있도록 작성
                - 
              -->
              <VSelect :selectOption="selectOption" @onKeySelect="changeKey" />
              <div class="input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  v-model="param.word"
                  placeholder="검색어..."
                />
                <button class="btn btn-dark" type="button" @click="setArticleListInfo">검색</button>
              </div>
            </form>
          </div>
        </div>
        <table class="table table-hover">
          <thead>
            <tr class="text-center">
              <th scope="col">글번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">조회수</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            <!-- for문을 도는데 for문으로 받아오는 item 정보를 props로 넘겨주는 것 -->
            <BoardListItem
              v-for="article in articles"
              :key="article.articleNo"
              :article="article"
            ></BoardListItem>
          </tbody>
        </table>
      </div>
      <PageNavigation
        :current-page="currentPage"
        :total-page="totalPage"
        @pageChange="onPageChange"
      ></PageNavigation>
    </div>
  </div>
</template>

<style scoped></style>
