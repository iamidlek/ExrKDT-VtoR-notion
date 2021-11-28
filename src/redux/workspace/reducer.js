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

export const workspaceReducer = (state = {}, action) => {
  switch (action.type) {
    case READ_WS:
      return state;
    default:
      return state;
  }
};

const initial = {
  loading: false,
  error: null,
  workspaceList: [],
};

export const workspaceListReducer = (state = initial, action) => {
  switch (action.type) {
    case READ_WS_LIST:
      return {
        ...state,
        loading: false,
        workspaceList: action.payload,
      };
    case CREATE_WS:
      return [...state];
    case UPDATE_WS:
      return state;
    case DELETE_WS:
      return state;
    case REQ_START:
      return {
        ...state,
        loading: true,
      };
    case REQ_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const pathReducer = (state = [], action) => {
  return state;
};
