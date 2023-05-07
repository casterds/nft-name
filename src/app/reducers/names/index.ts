import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../constants";
import { RootState } from "../../store";

interface Named {
  _id: string;
  nfts: {
    [tokenId: string]: {
      imageUrl: string;
      name: string;
      timestamp: number;
    };
  };
}

const initialState: {
  names: Named[];
  state: STATUS;
} = {
  names: [],
  state: STATUS.UNFETCHED,
};

const names = createSlice({
  name: "names",
  initialState,
  reducers: {
    fetchNames: (state) => {
      return {
        ...state,
        state: STATUS.LOADING,
      };
    },
    setNames: (state, action) => {
      return {
        state: STATUS.FETCHED,
        names: action.payload,
      };
    },
  },
});

export const { setNames, fetchNames } = names.actions;

export const selectNames = (state: RootState) => state.names;

export default names.reducer;
