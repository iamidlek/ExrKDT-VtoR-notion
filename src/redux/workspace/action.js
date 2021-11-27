import {
  CREATE_WS,
  READ_WS_LIST,
  READ_WS,
  UPDATE_WS,
  DELETE_WS,
} from "./types";

export const createWorkspace = () => {
  return {
    type: CREATE_WS,
  };
};
export const readWorkspaceList = () => {
  return {
    type: READ_WS_LIST,
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
