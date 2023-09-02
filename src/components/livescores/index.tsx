import { useEffect } from "react";
import { useMatchesDispatch } from "../../context/livescores/context";
import { getmatches } from "../../context/livescores/action";
import DisplayLiveMatches from "./DisplayLiveMatches";

const LiveScorePage = () => {
    const dispatchMatches = useMatchesDispatch();
  
    useEffect(() => {
      getmatches(dispatchMatches);
    }, [dispatchMatches]);
   
    return (
      <div>
        <div className="font-bold text-2xl py-6 px-10">Live Games</div>
        <div className="flex px-4 py-2 shadow-lg">
          <div className="grid gap-4 grid-cols-2 mt-5">
            <DisplayLiveMatches />
          </div>
        </div>
      </div>
    );
  }
  
  export default LiveScorePage;
  