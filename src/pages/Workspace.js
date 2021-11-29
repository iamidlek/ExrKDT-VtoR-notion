import { useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./Workspace.module.scss";
import { updateWorkspace } from "../redux/workspace/action";
import { useDispatch } from "react-redux";
export default function Workspace() {
  const { id, title, poster, content } = useSelector(
    (state) => state.workspace.workspace
  );
  const dispatch = useDispatch();
  const titleEl = useRef();
  const contentEl = useRef();
  const inputPoster = useRef();
  const fileConvert = (event) => {
    const { files } = event.target; //Array-like
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // base64
      reader.addEventListener("load", (e) => {
        const poster64 = e.target.result;
        dispatch(updateWorkspace({ id, poster: poster64 }));
      });
    }
  };
  const triggerInput = () => {
    inputPoster.current.dispatchEvent(new MouseEvent("click"));
  };
  const changeApply = () => {
    const title = titleEl.current.innerHTML;
    const content = contentEl.current.innerHTML;
    dispatch(updateWorkspace({ id, title, content }));
  };
  const deletePoster = (e) => {
    e.stopPropagation();
    dispatch(updateWorkspace({ id, poster: "-1" }));
  };
  return (
    <section key={id}>
      <div className={styles["inner"]}>
        <div className={styles["poster"]} onClick={triggerInput}>
          {poster && <img src={poster} alt="poster" />}
          <input ref={inputPoster} type="file" onChange={fileConvert} />
          {poster && (
            <div className={styles["delete-poster"]} onClick={deletePoster}>
              <span className={`material-icons ${styles["material-icons"]}`}>
                close
              </span>
            </div>
          )}
        </div>
        <div
          ref={titleEl}
          className={styles["title"]}
          placeholder="제목 없음"
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: title }}
          onBlur={changeApply}
        ></div>
        <div
          ref={contentEl}
          className={styles["content"]}
          placeholder="내용을 입력하세요!"
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: content }}
          onBlur={changeApply}
        ></div>
      </div>
    </section>
  );
}
