import WorkspaceListItem from "./WorkspaceListItem";
export default function LeftNavBar() {
  return (
    <div>
      <nav>
        <div class="header">
          <div class="user-profile"></div>
          Yhole's Notion
        </div>
        <ul>
          <WorkspaceListItem />
          {/* <WorkspaceItem
        v-for="workspace in workspaces"
        :key="workspace.id"
        :workspace="workspace" /> */}
        </ul>
        <div class="actions">
          <div class="action">
            <span class="material-icons">add</span> 새로운 페이지
          </div>
        </div>
        <div
          class="resize-handle"
          text="너비 자동 조절 라이브러리 사용할것"
        ></div>
      </nav>
    </div>
  );
}
