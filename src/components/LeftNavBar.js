import { useSelector } from "react-redux";
import WorkspaceListItem from "./WorkspaceListItem";

export default function LeftNavBar() {
  const workspaces = useSelector((state) => state.workspaceTree.workspaceList);
  return (
    <div>
      <nav>
        <div className="header">
          <div className="user-profile"></div>
          Yhole's Notion
        </div>
        <ul>
          {workspaces.map((item) => (
            <WorkspaceListItem key={item.id} item={item} />
          ))}
        </ul>
        <div className="actions">
          <div className="action">
            <span className="material-icons">add</span> 새로운 페이지
          </div>
        </div>
        <div
          className="resize-handle"
          text="너비 자동 조절 라이브러리 사용할것"
        ></div>
      </nav>
    </div>
  );
}
