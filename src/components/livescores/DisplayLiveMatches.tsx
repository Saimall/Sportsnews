/* eslint-disable @typescript-eslint/no-explicit-any */
import Livematch from "./LiveMatch";
import {
  useMatchesState,
} from "../../context/livescores/context";

export default function DisplayLiveMatches() {
    const state: any = useMatchesState();
  
    const { matches, isLoading, isError, errorMessage } = state;
    console.log("Number of matches: ", matches.length);
  
    if (matches.length === 0 && isLoading) {
      return <span>Loading...</span>
    }
    
    if (isError) {
      return <span>{errorMessage}</span>;
    }
  
    return (
      <>
        <div className="flex px-4">
          {matches.map((match: any) => (
            <Livematch key={match.id} id={match.id} />
          ))}
        </div>
      </>
    );
  }
  