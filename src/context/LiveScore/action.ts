/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from '../../config/constant';

export const getlivescore = async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_LIVESCORE_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
    });
    const data = await response.json();
    dispatch({ type: "FETCH_LIVESCORE_SUCCESS", payload: data });
  } catch (error) {
    console.log('error while fetching the data', error);
    dispatch({ type: "FETCH_LIVESCORE_FAILURE", payload: 'Error in loading data' });
  }
};