import { useDispatch, useSelector } from "react-redux";
import { fetchNames, selectNames, setNames } from ".";
import { useCallback } from "react";
import { axiosInstance } from "../../config";
import { STATUS } from "../constants";

export function useNames() {
  const { names, state } = useSelector(selectNames);
  const dispatch = useDispatch();
  const dispatchFetchNames = useCallback(() => {
    if (state === STATUS.UNFETCHED) {
        dispatch(fetchNames())
        axiosInstance
        .get("/api/nftr/fetch-names")
        .then(({ data: { data, success } }) => {
          if (success) {
            dispatch(setNames(data));
          }
        });
    }
      
  }, [dispatch, state]);

  return {
    names,
    state,
    dispatchFetchNames,
  };
}
