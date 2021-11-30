import styles from "./LeftNavBar.module.scss";
import { useSelector } from "react-redux";
import WorkspaceListItem from "./WorkspaceListItem";
import { useEffect, useRef, useState } from "react";
import { createWorkspace } from "../redux/workspace/action";
import { useDispatch } from "react-redux";
import interact from "interactjs";

export default function LeftNavBar() {
  const workspaces = useSelector((state) => state.workspaceTree.workspaceList);
  const [navWidth, setNavWidth] = useState(240);
  const nav = useRef(null);
  const resizeHandle = useRef(null);

  const dispatch = useDispatch();
  const addNewWS = () => {
    dispatch(createWorkspace());
  };

  const navInit = (nav, handle) => {
    interact(nav)
      .resizable({
        edges: {
          right: handle,
        },
      })
      .on("resizemove", (event) => {
        setNavWidth(event.rect.width);
      });
  };

  useEffect(() => {
    navInit(nav.current, resizeHandle.current);
  });
  return (
    <nav style={{ width: `${navWidth}px` }} ref={nav}>
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
        ref={resizeHandle}
        className={styles["resize-handle"]}
        onDoubleClick={() => setNavWidth(240)}
      ></div>
    </nav>
  );
}
