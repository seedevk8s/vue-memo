<script setup>
import { reactive } from "vue";
import { StorageService } from "@/services/StorageService";

// 📌 스토리지 서비스 인스턴스를 생성 (스토리지 이름: "나의 메모")
const storageService = new StorageService("나의 메모");

// 📌 반응형 상태 객체 생성 (memos 배열 초기화)
const state = reactive({
  memos: []
});

// 📌 커스텀 생성 훅: 컴포넌트 생성 시 초기 데이터를 설정하기 위한 즉시 실행 함수 (IIAFE)
/*
  - async function onCreated(): 비동기 함수 정의
  - state.memos = storageService.getItems(): 스토리지에서 메모 데이터를 가져와 반응형 변수에 저장
  - ()(); : 함수를 즉시 실행 (Immediately Invoked Async Function Expression)
  - 현재 getItems()가 동기 함수이지만, 향후 비동기로 바뀌더라도 유연하게 대처 가능
*/
(async function onCreated() {
  state.memos = storageService.getItems(); // 스토리지에서 항목을 불러와 반응형 변수에 설정
})();
</script>


<template>
  <div class="memo-list">
    <!-- 메모 리스트 반복 출력 -->
    <router-link
        :to="`/memos/${m.id}`"
        class="item"
        v-for="m in state.memos"
    >
      <!--
        :to는 Vue의 바인딩 문법입니다.
        to="..."는 문자열 그대로지만,
        :to="..."는 JS 표현식으로 경로를 계산합니다.
        이 경우는 `/memos/` + m.id 값을 연결해 동적 경로를 생성합니다.
        예: m.id가 3이면 "/memos/3"으로 이동합니다.
      -->
      <div class="d-flex pt-3">
        <div class="pb-3 mb-0 w-100">
          <div class="d-flex justify-content-between">
            <!-- 메모 제목 표시 -->
            <b>{{ m.title }}</b>
            <div>
              <!-- 삭제 버튼 (기능은 추후 구현 예정) -->
              <span role="button">삭제</span>
            </div>
          </div>
          <!-- 메모 내용 표시 -->
          <p class="mt-2">{{ m.content }}</p>
        </div>
      </div>
    </router-link>

    <!-- 메모 추가 페이지로 이동하는 고정 링크 -->
    <router-link to="/memos/add" class="add btn btn-light">
      + 추가하기
    </router-link>
  </div>
</template>


<style lang="scss">
.memo-list {
  .item {
    background: #f8f9fa;
    border: 1px solid #eee;
    display: block;
    color: #000;
    text-decoration: none;
    padding: 20px 30px;
    margin: 15px 0;

    // 🔸 &:hover는 .item에 마우스를 올렸을 때의 스타일을 정의합니다.
    // 🔸 여기서 &는 부모 선택자인 '.item'을 참조하므로, 최종적으로 '.item:hover'가 됩니다.
    &:hover {
      border-color: #aaa; // 마우스 오버 시 테두리 색상 변경
    }
  }

  .add {
    display: block;
    padding: 25px;
    border: 1px solid #eee;
  }
}
</style>

