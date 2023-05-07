import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { STATUS } from "../constants";

export interface Collection {
    assets: number;
    imageUrl: string;
    name: string;
    openseaMetadata: {
        name: string;
    }
    _id: string;
  }

const initialState: { data: Collection[], state: STATUS} = {
    data: [],
    state: STATUS.UNFETCHED
}

const collections = createSlice({
    name: "collections",
    initialState,
    reducers: {
        setCollections: (state, action) => {
            return {
                data: action.payload,
                state: STATUS.FETCHED
            }
        },
        fetchCollections: (state) => {
            return {
                ...state,
                state: STATUS.LOADING
            }
        }
    }
})

export const {setCollections, fetchCollections} = collections.actions

export const selectCollections = (state: RootState) => state.collections

export default collections.reducer
