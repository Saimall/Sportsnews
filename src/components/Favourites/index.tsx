// import { Link } from "react-router-dom";

import React, { Suspense } from "react";
import ErrorBoundary from "../Errorboundary/ErrorBoundary";
const Favourites = React.lazy(() => import("./Favourites"));
const Favouritesdisplay = () => {
  return (
    <div className="m-2 bg-gray-200">
      <div className="m-2">
      <ErrorBoundary>
      <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
        <Favourites />
        </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Favouritesdisplay;
