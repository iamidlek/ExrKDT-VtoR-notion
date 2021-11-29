import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./WorkspaceListItem.module.scss";
import { useHistory } from "react-router-dom";
import { readWorkspace } from "../redux/workspace/action";
import { createWorkspace, deleteWorkspace } from "../redux/workspace/action";

function WorkspaceListItem({ item, depth = 1 }) {
  const dispatch = useDispatch();
  const [showChildren, setShowChildren] = useState(false);
  const hasChildren = item.children && item.children.length;
  const handleshowChildren = (e) => {
    e.stopPropagation();
    setShowChildren((curr) => !curr);
  };
  const addChildWS = (e) => {
    e.stopPropagation();
    dispatch(createWorkspace(item.id));
    setShowChildren(true);
  };
  const pathId = useSelector((state) => state.router.location.pathname).replace(
    "/workspace/",
    ""
  );
  const deleteWS = (e) => {
    e.stopPropagation();
    dispatch(deleteWorkspace({ id: item.id, currId: pathId }));
  };
  let history = useHistory(); // withRouter의 재귀 컴포넌트에 적용이 어려운 점을 훅으로 대체

  return (
    <div>
      <li>
        <div
          style={{ paddingLeft: `${14 * depth}px` }}
          className={`${styles["title"]} ${
            pathId === item.id && styles["active"]
          }`}
          onClick={() => {
            dispatch(readWorkspace(item.id));
            history.push(`/workspace/${item.id}`);
          }}
        >
          <span
            className={`material-icons ${showChildren && styles["active"]} ${
              styles["material-icons"]
            }`}
            onClick={handleshowChildren}
          >
            play_arrow
          </span>
          <span className={styles["text"]}>{item.title || "제목 없음"}</span>
          <div className={styles["actions"]}>
            <span
              className={`material-icons ${styles["material-icons"]}`}
              onClick={addChildWS}
            >
              add
            </span>
            <span
              className={`material-icons ${styles["material-icons"]}`}
              onClick={deleteWS}
              // @click.stop="deleteWorkspace"
            >
              delete
            </span>
          </div>
        </div>
        {!hasChildren && showChildren && (
          <div
            style={{ paddingLeft: `${14 * depth + 22}px` }}
            className={styles["no-children"]}
          >
            하위 페이지가 없습니다.
          </div>
        )}
        <ul>
          {hasChildren &&
            showChildren &&
            item.children.map((ws) => (
              <WorkspaceListItem key={ws.id} item={ws} depth={depth + 1} />
            ))}
        </ul>
      </li>
    </div>
  );
}

export default WorkspaceListItem;
