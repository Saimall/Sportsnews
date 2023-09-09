import { Suspense, useEffect } from "react";
import { useMatchesDispatch } from "../../context/livescores/context";
import { getmatches } from "../../context/livescores/action";

import ErrorBoundary from "../Errorboundary/ErrorBoundary";
import React from "react";
const DisplayLiveMatches = React.lazy(() => import("./DisplayLiveMatches"));
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
          <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <DisplayLiveMatches />
          </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default LiveScorePage;
