<template>
  <div class="app">
    <div class="container py-4">
      <!-- 헤더 -->
      <header class="pb-4 mb-4 border-bottom">
        <router-link to="/" class="text-dark text-decoration-none">
          <b class="fs-4">Memo Application</b>
        </router-link>
      </header>

      <!-- 메인 컨텐츠 -->
      <main>
        <!-- 라우터 뷰 -->
        <router-view />
      </main>

      <!-- 푸터 -->
      <footer class="pt-4 mt-4 border-top">&copy; 2025. Memo Application. All rights reserved.</footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app .container {
  max-width: 576px;   // 최대 가로 크기 제한
}
</style>