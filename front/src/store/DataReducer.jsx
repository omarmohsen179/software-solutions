import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl } from "../services/config";

import { characteristic, elements, seasonData } from "../services/SharedData";
import { RemoveFromLocalStorage } from "../services/localStorageService";

// Calling API
export const getData = createAsyncThunk(
  "data/getData",
  async (arg, { dispatch, getState }) => {
    return axios({
      url: `${ApiBaseUrl}api/auth/data`,
      method: "GET",
    })
      .then(({ data }) => {
        return {
          ...data,
          Characteristic: characteristic,
        };
      })
      .catch((error) => {
        // notify("Error in information. try again!", "error", 3000);
        dispatch(getData.rejected(error.response?.data ?? error));
      });
  }
);
export const getDataAll = createAsyncThunk(
  "data/getDataAll",
  async (arg, { dispatch, getState }) => {
    return axios({
      url: `${ApiBaseUrl}api/home/all`,
      method: "GET",
    })
      .then(({ data }) => {
        return {
          ...data,
        };
      })
      .catch((error) => {
        // notify("Error in information. try again!", "error", 3000);
        dispatch(getData.rejected(error.response?.data ?? error));
      });
  }
);
// Create Slice
const DataReducer = createSlice({
  name: "data",
  initialState: {
    lookups: null,
    data: null,
    //  date: new date(),
  },
  reducers: {},
  extraReducers: {
    // auth/register
    [getData.pending](state, action) {
      state.lookups = null;
    },
    [getData.fulfilled](state, { payload }) {
      state.lookups = payload;
      // state.date = new date();
    },
    [getData.rejected](state, action) {
      state.lookups = null;

      RemoveFromLocalStorage("auth_user");
    },
    [getDataAll.pending](state, action) {
      state.data = null;
    },
    [getDataAll.fulfilled](state, { payload }) {
      state.data = payload;
      // state.date = new date();
    },
    [getDataAll.rejected](state, action) {
      state.data = null;
    },
  },
});

// Export Selectors
export const data = DataReducer.reducer;

export const data_selector = (state) => {
  return state.data.lookups;
};
export const data_all_selector = (state) => {
  return state.data.data;
};
export const get_name = (data, args, i18n) => {
  try {
    const res = data?.find((e) => e.Id == args);
    if (i18n) {
      return i18n?.language === "ar"
        ? res[Object.keys(res).find((e) => e.includes("Name"))]
        : res[Object.keys(res).find((e) => e.includes("NameEn"))];
    }

    return res != null
      ? res[Object.keys(res).find((e) => e.includes("Name"))]
      : "";
  } catch (err) {
    return "";
  }
};
export const get_element_name = (data, type, Id) => {
  try {
    const res =
      type == 0
        ? data.Accessories?.find((e) => e.Id == Id)
        : type == 1
        ? data.Items?.find((e) => e.Id == Id)
        : data.Models?.find((e) => e.Id == Id);

    return res != null ? res.ElementName : "";
  } catch (err) {
    return "";
  }
};
