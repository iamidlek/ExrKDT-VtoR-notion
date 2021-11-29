import styles from "./App.module.scss";
import { Switch, Route, useHistory } from "react-router";
import NotFound from "./pages/NotFound";
import LeftNavBar from "./components/LeftNavBar";
import PathHeader from "./components/PathHeader";
import Workspace from "./pages/Workspace";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readWorkspace,
  readWorkspaceList,
  headerPath,
} from "./redux/workspace/action";

function App() {
  const dispatch = useDispatch();
  let history = useHistory();
  const wslist = useSelector((state) => state.workspaceTree);
  const router = useSelector((state) => state.router);

  useEffect(() => {
    dispatch(readWorkspaceList());
  }, []);
  useEffect(() => {
    if (
      history.location.pathname === "/ExrKDT-VtoR-notion/" &&
      wslist.workspaceList.length
    ) {
      dispatch(readWorkspace(wslist.workspaceList[0].id));
      history.push(
        `/ExrKDT-VtoR-notion/workspace/${wslist.workspaceList[0].id}`
      );
    }
  }, [wslist]);
  useEffect(() => {
    dispatch(
      headerPath(
        router.location.pathname.replace("/ExrKDT-VtoR-notion/workspace/", "")
      )
    );
    // path 재계산 및 반영이 필요하다
  }, [router]);
  return (
    <div className={styles["app__inner"]}>
      <LeftNavBar />
      <div className={styles["app__page"]}>
        <PathHeader />
        <div className={styles["page__container"]}>
          <Switch>
            <Route
              path="/ExrKDT-VtoR-notion/workspace/:id"
              component={Workspace}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
