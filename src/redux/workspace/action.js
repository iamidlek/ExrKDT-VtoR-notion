import axios from "axios";
import {
  REQ_START,
  REQ_SUCCESS,
  REQ_FAIL,
  CREATE_WS,
  READ_WS_LIST,
  READ_WS,
  UPDATE_WS,
  DELETE_WS,
} from "./types";

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

export const createWorkspace = (payload) => async (dispatch) => {
  // (무조건 빈 워크스페이스가 생성됨)
  // 1. 생성 요청 (서버)
  // 2-1. 생성 끝난 nav리스트 받기 요청 (서버)
  // 2-2. 리스트 [] 등록하기 (store)
  // 3-1. 만들어진 빈 워크스페이스를 현재로 등록하기 (store)
  // 3-2. route를 만들어진 워크스페이스로 이동
  const { parentId } = payload;
  const currentWorkspace = await request({
    method: "POST",
    data: {
      title: "",
      parentId,
    },
  });
  return {
    type: CREATE_WS,
    payload: currentWorkspace,
  };
};
export const readWorkspace = () => {
  return {
    type: READ_WS,
  };
};
export const updateWorkspace = () => {
  return {
    type: UPDATE_WS,
  };
};
export const deleteWorkspace = () => {
  return {
    type: DELETE_WS,
  };
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
