
interface Team {
    id: number,
    name: string
  }
  export interface Props {
      id : number
  }
    
  export interface TeamScores {
    [key : string]: string,
  }
  
  export interface State  {
    id: number;
    isRunning: boolean;
    name: string;
    location: string;
    startsAt: string;
    endsAt: string;
    score: TeamScores,
    teams: Team[];
    sportName: string;
    playingTeam: number;
    story: string;
  }

  interface Match {
    id: number;
    name: string;
    location: string;
    sportName: string;
    endAt: string;
}
    
export interface MatchesState {
    matches: Match[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}

export const initialState: MatchesState = {
    matches: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
};

export type MatchesActions =
    | { type: "FETCH_MATCHES_REQUEST" }
    | { type: "FETCH_MATCHES_SUCCESS"; payload: Match[] }
    | { type: "FETCH_MATCHES_FAILURE"; payload: string }
