import {
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../constants";

const initialState = {
  loading: null,
  userInfo: {},
  error: null,
};

function userRegistraterReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REGISTER_START:
      return { ...state, loading: true };

    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

function userLoginReducer(state = { initialState }, action) {
  switch (action.type) {
    case USER_LOGIN_START:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export { userRegistraterReducer, userLoginReducer };
