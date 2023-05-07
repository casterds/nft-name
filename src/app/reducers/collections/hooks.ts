import { useDispatch, useSelector } from "react-redux";
import { fetchCollections, selectCollections, setCollections } from ".";
import { STATUS } from "../constants";
import { AppDispatch } from "../../store";
import { useCallback, useEffect } from "react";
import { axiosInstance } from "../../config";

export function useCollections() {
  const collections = useSelector(selectCollections);
  const dispatch = useDispatch<AppDispatch>();

  const dispatchFetchCollections = useCallback(() => {
    if (collections.state === STATUS.UNFETCHED) {
      dispatch(fetchCollections());
      axiosInstance
        .get("/api/nftr/fetch-contract-addresses")
        .then(({ data: { data, success } }) => {
          if (success) {
            dispatch(setCollections(data));
          }
        });
    }
  }, [collections, dispatch]);

  return {collections, dispatchFetchCollections};
}
