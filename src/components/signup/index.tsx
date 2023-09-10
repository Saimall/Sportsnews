import React, { Suspense } from "react";
import ErrorBoundary from "../Errorboundary/ErrorBoundary";
const SignupForm = React.lazy(() => import("./SignupForm"));
function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sign up
        </h1>
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <SignupForm />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default Signup;
