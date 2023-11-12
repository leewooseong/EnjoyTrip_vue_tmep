<script setup lang="ts">
import { ref } from 'vue'

type Option = { value: string; text: string }

// props 선언
// - key와 타입을 선언
defineProps({ selectOption: Array<Option> })

// 커스텀 이벤트 선언
// 사용할 커스텀 이벤트 목록을 정의
const emit = defineEmits(['onKeySelect'])

// 선택된 요소에 대한 정보
const selectedKey = ref('subject')

// select에서 선택했을 시 emit으로 커스텀 이벤트 트리거
// -> BoardList 컴포넌트에서 해당 이벤트를 받아서 처리한다.
// -> 이벤트 객체로는 넘겨준 argument가 넘어가 해당 핸들러에서는 이 정보를 활용하여 처리한다.
const onSelect = () => {
  console.log(selectedKey.value + '선택!!!')
  emit('onKeySelect', selectedKey.value)
}
</script>

<template>
  <select
    v-model="selectedKey"
    class="form-select form-select-sm ms-5 me-1 w-50"
    @change="onSelect"
  >
    <option
      v-for="option in selectOption"
      :key="option.value"
      :value="option.value"
      :disabled="option.value === ''"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<style scoped></style>
