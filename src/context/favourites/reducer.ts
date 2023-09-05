import { SportsState, initialState, SportsActions } from "./interfaces";

export const reducer = (
    state: SportsState = initialState,
    action: SportsActions,
  ): SportsState => {
    switch (action.type) {
      case "FETCH_SPORTS_REQUEST":
        return {
          ...state,
          isLoading: true,
        };
  
      case "FETCH_SPORTS_SUCCESS":
        return {
          ...state,
          isLoading: false,
          sports: action.payload,
        };
  
      case "FETCH_SPORTS_FAILURE":
        return {
          ...state,
          isError: true,
          isLoading: false,
          errorMessage: action.payload,
        };
  
      default:
        return state;
    }
  };