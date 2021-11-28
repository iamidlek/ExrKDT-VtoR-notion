export default function WorkspaceListItem() {
  return (
    <div>
      <li>
        <div
          // :style="{ paddingLeft: `${14 * depth}px` }"
          // :class="{ active: $route.params.id === workspace.id }"
          class="title"
          // @click="$router.push({
          // name: 'Workspace',
          // params: {
          // id: workspace.id
          // }})"
        >
          <span
            // :class="{ active: showChildren }"
            class="material-icons"
            // @click.stop="showChildren = !showChildren"
          >
            play_arrow
          </span>
          <span class="text">{/* {{ workspace.title || '제목 없음' }} */}</span>
          <div class="actions">
            <span
              class="material-icons"
              // @click.stop="createWorkspace"
            >
              add
            </span>
            <span
              class="material-icons"
              // @click.stop="deleteWorkspace"
            >
              delete
            </span>
          </div>
        </div>
        <div
          // v-if="!hasChildren && showChildren"
          // :style="{ paddingLeft: `${14 * depth + 22}px` }"
          class="no-children"
        >
          하위 페이지가 없습니다.
        </div>
        <ul
        // v-if="hasChildren && showChildren"
        >
          {/* <WorkspaceItem
        v-for="ws in workspace.children"
        :key="ws.id"
        :workspace="ws"
        :depth="depth + 1" /> */}
        </ul>
      </li>
    </div>
  );
}
