import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createBrowserHistory } from "history";
import { combineReducers } from "redux";
import {
  workspaceReducer,
  workspaceListReducer,
  pathReducer,
} from "./workspace/reducer";
import { connectRouter, routerMiddleware } from "connected-react-router";

const env = process.env.NODE_ENV;

// history
export const history = createBrowserHistory();

const middlewares = [thunk, routerMiddleware(history)];

// 개발 환경에서만 추가할 middleware
if (env === "development") {
  middlewares.push(logger);
}

const createRootReducer = (history) =>
  combineReducers({
    workspaceReducer,
    workspaceListReducer,
    pathReducer,
    router: connectRouter(history),
    // routing: routerReducer,
  });
let store;

if (env === "development") {
  store = createStore(
    createRootReducer(history),
    composeWithDevTools(applyMiddleware(...middlewares))
  );
} else {
  store = createStore(
    createRootReducer(history),
    applyMiddleware(...middlewares)
  );
}

export default store;
