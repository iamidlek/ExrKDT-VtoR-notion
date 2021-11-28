import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./redux/store";
import NotFound from "./pages/NotFound";

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/">
          <App />
        </Route>
        {/* State에 첫번째 워크스페이스가 잡히면 이동하게 만들 예정 */}
        {/* <Redirect from="/" to="/workspace" /> */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
