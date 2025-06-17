import api from "../../api"; // Your axios or fetch instance
import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SAVE_PROFILE,
  GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_FAILURE
} from "./actionTypes";

import { toast } from "react-toastify";

import { auth, googleProvider, signInWithPopup } from "../../firebase";

// Normal email/password login
export const postLoginData = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await api.post('/auth/login', { email, password });

    localStorage.setItem('token', data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    toast.success(data.msg);
  } catch (error) {
    const msg = error.response?.data?.msg || error.message;
    dispatch({ type: LOGIN_FAILURE, payload: { msg } });
    toast.error(msg);
  }
};

// Google login
export const loginWithGoogle = () => async (dispatch) => {
  try {
    dispatch({ type: GOOGLE_LOGIN_REQUEST });

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const token = await user.getIdToken();

    // You can send this token to your backend if you want to create/update user in DB

    localStorage.setItem('token', token);

    dispatch({
      type: GOOGLE_LOGIN_SUCCESS,
      payload: {
        user: { email: user.email, name: user.displayName, uid: user.uid },
        token,
        msg: "Logged in with Google successfully",
      },
    });
    toast.success("Logged in with Google");
  } catch (error) {
    dispatch({
      type: GOOGLE_LOGIN_FAILURE,
      payload: { msg: error.message },
    });
    toast.error(error.message);
  }
};

// Save profile from token
export const saveProfile = (token) => async (dispatch) => {
  try {
    const { data } = await api.get('/profile', {
      headers: { Authorization: token }
    });
    dispatch({
      type: SAVE_PROFILE,
      payload: { user: data.user, token },
    });
  } catch (error) {
    // Optionally handle error
  }
};

// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
  document.location.href = '/';
};
