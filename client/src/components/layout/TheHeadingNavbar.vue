<script setup lang="ts">
import router from '@/router'
import { onMounted, ref } from 'vue'
import { isAuthenticatedUser } from '/src/utils/auth.js'
import { RouterLink } from 'vue-router'
import { logoutAPI } from '@/services/apis/auth'

const isLoggedIn = ref(false)

const getLoggedState = async () => {
  if (await isAuthenticatedUser()) {
    isLoggedIn.value = true
    return
  }
  isLoggedIn.value = false
}

onMounted(() => {
  getLoggedState()
})

const onDoJoin = () => {
  router.push('/join')
}

// 로그아웃 처리를 api로 했으나 그 후에 어떻게 하기로 했는지 기억이 정확히 나지 않는다..
// cookie를 httpOnly 처리해줄 경우 클라이언트에서 js를 통해 cookie에 접근할 수 없기 때문에 서버에서 cookie를 만료시켜 주는 방식으로 수행되어야 할 것 같다.
// 현재는 로그아웃을 진행하여도 cookie가 제거 되지 않는다.
const onLoginoutClick = async () => {
  if (isLoggedIn.value) {
    const apiRes = await logoutAPI()
    if (apiRes === 'success') {
      isLoggedIn.value = false
      console.log('로그아웃 성공')
    }
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">
        <img src="@/assets/ssafy_logo.png" class="rounded mx-auto d-block" alt="..." />
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">강의실</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">커뮤니티</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              HELP DESK
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">공지사항</a></li>
              <li><a class="dropdown-item" href="#">FAQ</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">학사규정</a></li>
            </ul>
          </li> -->
          <li class="nav-item">
            <RouterLink to="/map" class="nav-link">관광지 검색</RouterLink>
            <!-- <a class="nav-link" href="#">마이캠퍼스</a> -->
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="#">게시판</a> -->
            <RouterLink to="/qna/list" class="nav-link">게시판</RouterLink>
          </li>
        </ul>
        <!-- <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="검색..."
            aria-label="Search"
          />
        </form> -->
        <div class="d-flex">
          <button
            class="btn btn-outline-secondary me-3"
            type="button"
            @click="onDoJoin"
            v-if="isLoggedIn"
          >
            회원정보 수정
          </button>
          <button class="btn btn-outline-secondary me-3" type="button" @click="onDoJoin" v-else>
            회원가입
          </button>
          <button
            class="btn btn-outline-success"
            type="button"
            @click="onLoginoutClick"
            v-if="isLoggedIn"
          >
            로그아웃
          </button>
          <button class="btn btn-outline-success" type="button" @click="onLoginoutClick" v-else>
            로그인
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
