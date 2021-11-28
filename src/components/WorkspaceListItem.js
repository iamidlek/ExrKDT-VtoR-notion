import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./WorkspaceListItem.module.scss";
import { withRouter } from "react-router-dom";

function WorkspaceListItem({ item, depth = 1, history }) {
  const [showChildren, setShowChildren] = useState(false);
  const hasChildren = item.children && item.children.length;
  const handleshowChildren = (e) => {
    e.stopPropagation();
    setShowChildren((curr) => !curr);
  };
  const pathId = useSelector((state) => state.router.location.pathname).replace(
    "/workspace/",
    ""
  );

  return (
    <div>
      <li>
        <div
          style={{ paddingLeft: `${14 * depth}px` }}
          className={`${styles["title"]} ${
            pathId === item.id && styles["active"]
          }`}
          onClick={() => {
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
              // @click.stop="createWorkspace"
            >
              add
            </span>
            <span
              className={`material-icons ${styles["material-icons"]}`}
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

export default withRouter(WorkspaceListItem);
