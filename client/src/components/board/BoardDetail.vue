<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { deleteArticleItem, getArticleItem } from '@/services/apis/board.ts'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
// 데이터 받아와서 수정하는 방식으로 수정 필요
// const article = ref({
//   articleNo: 100,
//   subject: '안녕하세요 뷰테스트 중입니다.',
//   content:
//     '뷰테스트 중입니다. 컴포넌트 연습하고 있으며, 앞으로 props와 custom event를 처리 할 예정입니다.',
//   userId: 'ssafy',
//   userName: '김싸피',
//   hit: 123,
//   registerDate: '25.01.01'
// })

const article = ref({
  articleId: 0,
  title: '',
  content: '',
  userId: '',
  userNick: '',
  hit: 0,
  UpdateDate: ''
})

const onDeleteArticle = async () => {
  const apiRes = await deleteArticleItem(article.value.articleId)

  if (apiRes) {
    router.push('/qna/list')
  }
}

const setArticleInfo = async () => {
  const route = useRoute()
  const articleId = route.params.articleno as string
  const data = await getArticleItem(parseInt(articleId))
  article.value = data
}

onMounted(() => {
  setArticleInfo()
})
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글보기</mark>
        </h2>
      </div>
      <div class="col-lg-10">
        <div class="row my-2">
          <h2 class="text-secondary px-5">{{ article.articleId }}. {{ article.title }}</h2>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img
                class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
              />
              <p>
                <span class="fw-bold">안효인</span> <br />
                <span class="text-secondary fw-light">
                  {{ article.UpdateDate }}1 조회 : {{ article.hit }}
                </span>
              </p>
            </div>
          </div>
          <div class="col-md-4 align-self-center text-end">댓글 : 17</div>
          <div class="divider mb-3"></div>
          <div class="text-secondary">
            {{ article.content }}
          </div>
          <div class="divider mt-3 mb-3"></div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-primary mb-3">
              <RouterLink to="/qna/list">글목록</RouterLink>
            </button>
            <button type="button" class="btn btn-outline-success mb-3 ms-1">
              <RouterLink :to="`/qna/modify/${article.articleId}`">글수정</RouterLink>
            </button>
            <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="onDeleteArticle">
              글삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
