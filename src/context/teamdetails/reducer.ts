import { TeamsActions, TeamsState, initialState } from "./interfaces";

export const reducer = (
  state: TeamsState = initialState,
  action: TeamsActions,
): TeamsState => {
  switch (action.type) {
    case "FETCH_TEAMS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };

    case "FETCH_TEAMS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        teams: action.payload,
      };

    case "FETCH_TEAMS_FAILURE":
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
