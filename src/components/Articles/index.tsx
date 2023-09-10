import React, { Suspense } from "react";
import ErrorBoundary from "../Errorboundary/ErrorBoundary";
const ArticlesItems = React.lazy(() => import("./Articles"));
//rendering the articles
const Articles = () => {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ArticlesItems />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Articles;
