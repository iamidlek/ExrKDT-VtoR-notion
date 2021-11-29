import {
  REQ_START,
  REQ_START_WS,
  MAKE_PATH,
  REQ_FAIL,
  REQ_FAIL_WS,
  READ_WS_LIST,
  READ_WS,
  UPDATE_WS,
} from "./types";

const wsInitial = {
  loading: false,
  error: null,
  workspace: {
    id: "",
    poster: "",
    title: "",
    content: "",
  },
};

export const workspaceReducer = (state = wsInitial, action) => {
  switch (action.type) {
    case REQ_START_WS:
      return {
        ...state,
        loading: true,
      };
    case READ_WS:
      const { id, poster, title, content } = action.payload;
      return {
        ...state,
        loading: false,
        workspace: {
          id,
          poster,
          title,
          content,
        },
      };
    case UPDATE_WS:
      return {
        ...state,
        loading: false,
        workspace: action.payload,
      };
    case REQ_FAIL_WS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
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
    case "HARD_PUSH":
      return {
        ...state,
        loading: false,
        workspaceList: [...state.workspaceList, action.newWorkspace],
      };
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
  switch (action.type) {
    case MAKE_PATH:
      return [...action.payload];
    default:
      return state;
  }
};
