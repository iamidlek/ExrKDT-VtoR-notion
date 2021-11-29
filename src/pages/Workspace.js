import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./Workspace.module.scss";

export default function Workspace() {
  const { id, title, poster, content } = useSelector(
    (state) => state.workspace.workspace
  );
  // const titleEl = useRef();
  // const contentEl = useRef();

  return (
    <section key={id}>
      <div className={styles["inner"]}>
        <div
          className={styles["poster"]}
          // @click="triggerInput"
        >
          {poster && <img src={poster} alt="poster" />}
          <input
            // ref="inputPoster"
            type="file"
            // @change="selectFile"
          />
          {poster && (
            <div
              className={styles["delete-poster"]}
              // @click.stop="deletePoster"
            >
              <span className={`material-icons ${styles["material-icons"]}`}>
                close
              </span>
            </div>
          )}
        </div>
        <div
          // ref={titleEl}
          className={styles["title"]}
          placeholder="제목 없음"
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: title }}
          // @keydown.prevent.enter="$refs.content.focus()"
          // @blur="onInput"
        ></div>
        <div
          // ref={contentEl}
          className={styles["content"]}
          placeholder="내용을 입력하세요!"
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: content }}
          // @blur="onInput"
        ></div>
      </div>
    </section>
  );
}
