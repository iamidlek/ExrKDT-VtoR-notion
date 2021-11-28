export default function PathHeader() {
  return (
    <header>
      <div class="titles">
        <template
        // v-for="({ id, title }, index) in $store.state.workspace.currentWorkspacePath" :key="id"
        >
          <div
            // v-if="index > 0"
            class="division"
          >
            /
          </div>
          <button class="title">제목 없음</button>
        </template>
      </div>
      <div class="actions">
        <button>공유</button>
        <button>업데이트</button>
        <button>즐겨찾기</button>
        <button>기타</button>
      </div>
    </header>
  );
}
