import axios from "axios";
import {
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../constants";
import { createBrowserHistory } from "history";


const history = createBrowserHistory();

const register = (name, username, email, password, role) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_START,
    payload: { name, username, email, password },
  });
  try {
    const { data } = await axios.post("/api/users/register", {
      name,
      username,
      email,
      password,
      role
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

const login = (email: string, password: string) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_START, payload: { email, password } });
  console.log(email, password);
  try {
    const { data } = await axios.post("/api/users/signin", {
      email,
      password,
    });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('AceessTokenData', JSON.stringify(data));
    history.push(data.role)
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAIL, payload: err.message });
  }
};

export { register, login };
