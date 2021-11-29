import styles from "./LeftNavBar.module.scss";
import { useSelector } from "react-redux";
import WorkspaceListItem from "./WorkspaceListItem";
import { useState } from "react";
import { createWorkspace } from "../redux/workspace/action";
import { useDispatch } from "react-redux";

export default function LeftNavBar() {
  const workspaces = useSelector((state) => state.workspaceTree.workspaceList);
  const [navWidth, setNavWidth] = useState(240);

  const dispatch = useDispatch();
  const addNewWS = () => {
    dispatch(createWorkspace());
  };
  return (
    <nav style={{ width: `${navWidth}px` }}>
      <div className={styles["header"]}>
        <div className={styles["user-profile"]}></div>
        Yhole's Notion
      </div>
      <ul>
        {workspaces.map((item) => (
          <WorkspaceListItem key={item.id} item={item} />
        ))}
      </ul>
      <div className={styles["actions"]}>
        <div className={styles["action"]} onClick={addNewWS}>
          <span className={`material-icons ${styles["material-icons"]}`}>
            add
          </span>
          새로운 페이지
        </div>
      </div>
      <div
        className={styles["resize-handle"]}
        text="너비 자동 조절 라이브러리 사용할것"
      ></div>
    </nav>
  );
}
