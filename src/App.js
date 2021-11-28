import styles from "./App.module.scss";
import { Switch, Route } from "react-router";
import NotFound from "./pages/NotFound";
import LeftNavBar from "./components/LeftNavBar";
import PathHeader from "./components/PathHeader";
import Workspace from "./pages/Workspace";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { readWorkspaceList } from "./redux/workspace/action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readWorkspaceList());
  }, []);
  return (
    <div className={styles["app__inner"]}>
      <LeftNavBar />
      <div className={styles["app__page"]}>
        <PathHeader />
        <div className={styles["page__container"]}>
          <Switch>
            <Route path="/workspace" component={Workspace} />
            <Route path="/workspace/:id" component={Workspace} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
