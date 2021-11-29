import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { readWorkspace } from "../redux/workspace/action";
import styles from "./PathHeader.module.scss";

export default function PathHeader() {
  let history = useHistory();
  const dispatch = useDispatch();

  const path = useSelector((state) => state.path);
  const moveWS = (id) => {
    dispatch(readWorkspace(id));
    history.push(`/workspace/${id}`);
  };
  return (
    <header>
      <div className={styles["titles"]}>
        {path.map(({ id, title }, index) => (
          <React.Fragment key={id}>
            {index ? <div className={styles["division"]}>/</div> : ""}
            <button className={styles["title"]} onClick={() => moveWS(id)}>
              {title || "제목 없음"}
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className={styles["actions"]}>
        <button>공유</button>
        <button>업데이트</button>
        <button>즐겨찾기</button>
        <button>기타</button>
      </div>
    </header>
  );
}
