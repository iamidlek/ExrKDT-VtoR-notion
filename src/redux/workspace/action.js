import axios from "axios";
import {
  REQ_START,
  REQ_START_WS,
  MAKE_PATH,
  REQ_FAIL,
  READ_WS_LIST,
  READ_WS,
  UPDATE_WS,
  REQ_FAIL_WS,
} from "./types";

import { history } from "../../redux/store";

export const readWorkspaceList = () => async (dispatch) => {
  dispatch({ type: REQ_START });
  try {
    const workspaces = await request({
      method: "GET",
    });
    dispatch({ type: READ_WS_LIST, payload: workspaces });
  } catch (error) {
    dispatch({ type: REQ_FAIL, payload: error });
  }
};

export const readWorkspace = (id) => async (dispatch) => {
  dispatch({ type: REQ_START_WS });
  try {
    const workspace = await request({
      method: "GET",
      workspaceId: id,
    });
    dispatch({ type: READ_WS, payload: workspace });
  } catch (error) {
    dispatch({ type: REQ_FAIL_WS, payload: error });
  }
};

export const createWorkspace = (parentId) => async (dispatch) => {
  try {
    const newWorkspace = await request({
      method: "POST",
      data: {
        title: "",
        parentId,
      },
    });
    if (!parentId) {
      dispatch({ type: "HARD_PUSH", newWorkspace });
    } else {
      dispatch(readWorkspaceList());
    }
    dispatch(readWorkspace(newWorkspace.id));
    history.push(`/workspace/${newWorkspace.id}`);
  } catch (error) {
    dispatch({ type: REQ_FAIL, payload: error });
  }
};
export const updateWorkspace = (payload) => async (dispatch) => {
  try {
    const { id, title, content, poster } = payload;
    const updatedWorkspace = await request({
      method: "PUT",
      workspaceId: id,
      data: {
        title,
        content,
        poster,
      },
    });
    dispatch({ type: UPDATE_WS, payload: updatedWorkspace });
    dispatch(readWorkspaceList());
  } catch (error) {
    dispatch({ type: REQ_FAIL_WS, payload: error });
  }
};
export const deleteWorkspace = (payload) => async (dispatch, getState) => {
  await request({
    method: "DELETE",
    workspaceId: payload.id,
  });
  dispatch(readWorkspaceList());
  if (payload.id === payload.currId) {
    const { id } = getState().workspaceTree.workspaceList[0];
    history.push(`/workspace/${id}`);
    dispatch(readWorkspace(id));
  }
};

export const headerPath = (currId) => (dispatch, getState) => {
  const workspaces = getState().workspaceTree.workspaceList;
  function _find(workspace, parents) {
    if (workspace.id === currId) {
      dispatch({ type: MAKE_PATH, payload: [...parents, workspace] });
      return;
    }
    if (workspace.children) {
      workspace.children.forEach((ws) => _find(ws, [...parents, workspace]));
    }
  }
  workspaces.forEach((workspace) => _find(workspace, []));
};

async function request(options) {
  const { workspaceId = "", method, data } = options;
  const { data: dataToReturn } = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${workspaceId}`,
    method,
    headers: {
      "content-type": "application/json",
      apikey: "FcKdtJs202110",
      username: "YooHyungChul",
    },
    data,
  });
  return dataToReturn;
}
