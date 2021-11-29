import axios from "axios";
import {
  REQ_START,
  REQ_START_WS,
  REQ_SUCCESS,
  REQ_FAIL,
  CREATE_WS,
  READ_WS_LIST,
  READ_WS,
  UPDATE_WS,
  DELETE_WS,
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
export const updateWorkspace = () => {
  return {
    type: UPDATE_WS,
  };
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
