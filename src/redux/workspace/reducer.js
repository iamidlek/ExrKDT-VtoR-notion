import {
  CREATE_WS,
  READ_WS_LIST,
  READ_WS,
  UPDATE_WS,
  DELETE_WS,
} from "./types";

export const workspaceReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_WS:
      return state;
    case READ_WS:
      return state;
    case UPDATE_WS:
      return state;
    case DELETE_WS:
      return state;
    default:
      return state;
  }
};

export const workspaceListReducer = (state = [], action) => {
  switch (action.type) {
    case READ_WS_LIST:
      return {
        //받아온 list를 리턴
      };
    default:
      return state;
  }
};

export const pathReducer = (state = [], action) => {
  return state;
};
