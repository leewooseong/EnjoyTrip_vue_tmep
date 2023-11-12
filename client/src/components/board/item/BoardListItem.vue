<script setup lang="ts">
type ItemProps = {
  articleNo: number
  subject: string
  userId: string
  userName: string
  hit: number
  registerDate: string
}
defineProps<{ article: ItemProps }>()
</script>

<template>
  <tr class="text-center">
    <th scope="row">{{ article.articleNo }}</th>
    <td class="text-start">
      <RouterLink :to="`/qna/view/${article.articleNo}`" class="article-title link-dark">
        {{ article.subject }}</RouterLink
      >
    </td>
    <td>{{ article.userName }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.registerDate }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
