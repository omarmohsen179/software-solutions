import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import notify from "devextreme/ui/notify";
import { ApiBaseUrl } from "../services/config";

import {
  GetFromLocalStorage,
  RemoveFromLocalStorage,
  StoreToLocalStorage,
} from "../services/localStorageService";

// Calling API
export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (arg, { dispatch, getState }) => {
    return axios({
      url: `${ApiBaseUrl}api/auth/register`,
      method: "POST",
      data: arg,
    })
      .then(({ data }) => {
        if (arg.rememberMe) {
          StoreToLocalStorage("user-auth", data);
        }

        return data;
      })
      .catch((error) => {
        dispatch(userRegister.rejected(error.response?.data ?? error));
      });
  }
);

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (arg, { dispatch, getState }) => {
    return axios({
      url: `${ApiBaseUrl}api/auth/Login`,
      method: "POST",
      data: arg,
    })
      .then(({ data }) => {
        if (arg.rememberMe) {
          StoreToLocalStorage("user-auth", data);
        }

        return { ...data };
      })
      .catch((error) => {
        dispatch(userLogin.rejected(error.response?.data ?? error));
      });
  }
);

export const userLoginLocalStorage = createAsyncThunk(
  "auth/userLoginLocalStorage",
  async (arg, { dispatch, getState }) => {
    return arg;
  }
);

export const loadingState = createAsyncThunk(
  "auth/loadingState",
  async (arg, { dispatch, getState }) => {
    return arg;
  }
);

// Create Slice
const AuthReducer = createSlice({
  name: "auth",
  initialState: {
    user: GetFromLocalStorage("auth_user"),
    loading: false,
  },
  reducers: {
    // auth/signOut
    signOut(state, { payload }) {
      state.user = {};

      RemoveFromLocalStorage("auth_user");
    },
  },
  extraReducers: {
    // auth/register
    [userRegister.pending](state, action) {
      state.loading = true;
    },
    [userRegister.fulfilled](state, { payload }) {
      if (payload) {
        state.user = payload;
        if (payload.Token)
          axios.defaults.headers.Authorization = `bearer ${payload.Token}`;
        if (payload.Username)
          notify(
            `${payload.Username} registered successfully`,
            "success",
            3000
          );
      }

      state.loading = false;
    },
    [userRegister.rejected](state, action) {
      notify(action.error?.message ?? "Error occured ..", "error", 3000);
      state.loading = false;
    },

    // auth/userLogin
    [userLogin.pending](state, action) {
      state.loading = true;
    },
    [userLogin.fulfilled](state, { payload }) {
      if (payload) {
        state.user = payload;
        console.log(payload);
        if (payload?.Username) {
          notify(`${payload.Username} Logged in successfully`, "success", 3000);
        }
        if (payload?.Token)
          axios.defaults.headers.Authorization = `bearer ${payload.Token}`;
      }
      state.loading = false;
    },
    [userLogin.rejected](state, action) {
      notify(action.error?.message ?? "Error occured ..", "error", 3000);
      state.loading = false;
    },
    [userLoginLocalStorage.pending](state, action) {
      state.loading = true;
    },
    [userLoginLocalStorage.fulfilled](state, { payload }) {
      state.user = payload;
      if (payload?.Token)
        axios.defaults.headers.Authorization = `bearer ${payload.Token}`;
      state.loading = false;
    },
    [userLoginLocalStorage.rejected](state, action) {
      notify(action.error?.message ?? "Error occured ..", "error", 3000);
      state.loading = false;
    },
    [loadingState.pending](state, action) {},
    [loadingState.fulfilled](state, { payload }) {
      state.loading = payload;
    },
    [loadingState.rejected](state, action) {},
  },
});

// Export Selectors
export const auth = AuthReducer.reducer;

export const { signOut } = AuthReducer.actions;

export const user_selector = (state) => {
  return state.auth.user;
};

export const auth_loading = (state) => {
  return state.auth.loading;
};
