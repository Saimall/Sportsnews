/* eslint-disable @typescript-eslint/no-explicit-any */

import { API_ENDPOINT } from "../../config/constant";

export const getarticles = async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_ARTICLES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_ARTICLES_SUCCESS", payload: data });
  } catch (error) {
    console.log("error while fetching the data", error);
    dispatch({
      type: "FETCH_ARTICLES_FAILURE",
      payload: "Error in loading data",
    });
  }
};
