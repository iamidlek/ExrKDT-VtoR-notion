import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./redux/store";

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
