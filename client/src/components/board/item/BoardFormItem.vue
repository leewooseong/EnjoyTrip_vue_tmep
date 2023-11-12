<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getArticleItem, updateArticleItem, writeArticleItem } from '@/services/apis/board.ts'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({ type: String })
const router = useRouter()

// const isUseId = ref(false)
const article = ref({
  articleId: 0,
  title: '',
  content: '',
  userId: '',
  userNick: '',
  hit: 0,
  UpdateDate: ''
})

const onModifyArticle = async () => {
  const apiRes = await updateArticleItem(article.value.articleId)
  if (apiRes) {
    router.push('/qna/list')
  }
}

const onWriteArticle = async () => {
  const apiRes = await writeArticleItem({
    title: article.value.title,
    content: article.value.content
  })
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
  if (props.type === 'modify') {
    setArticleInfo()
    // isUseId.value = true
  }
})
</script>

<template>
  <form>
    <!-- <div class="mb-3">
      <label for="userid" class="form-label">작성자 ID : </label>
      <input
        type="text"
        class="form-control"
        v-model="article.userId"
        :disabled="isUseId"
        placeholder="작성자ID..."
      />
    </div> -->
    <div class="mb-3">
      <label for="title" class="form-label">제목 : </label>
      <input type="text" class="form-control" v-model="article.title" placeholder="제목..." />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용 : </label>
      <textarea class="form-control" v-model="article.content" rows="10"></textarea>
    </div>
    <div class="col-auto text-center">
      <button
        type="button"
        class="btn btn-outline-primary mb-3"
        @click="onWriteArticle"
        v-if="type === 'regist'"
      >
        글작성
      </button>
      <button type="button" class="btn btn-outline-success mb-3" @click="onModifyArticle" v-else>
        글수정
      </button>
      <button type="button" class="btn btn-outline-danger mb-3 ms-1">
        <RouterLink to="/qna/list">목록으로이동...</RouterLink>
      </button>
    </div>
  </form>
</template>

<style scoped></style>
