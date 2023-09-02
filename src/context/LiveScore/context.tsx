/* eslint-disable react-refresh/only-export-components */



import React, { createContext, useContext, useReducer } from "react";

import { reducer } from "./reducer";

import {  initialState, MatchesState, MatchesActions } from "./interfaces";

const MatchStateContext = createContext<MatchesState | undefined>(undefined);
type MatchesDispatch = React.Dispatch<MatchesActions>;
const MatchesDispatchContext = createContext<MatchesDispatch | undefined>(undefined);


export const useMatchesState = () => useContext(MatchStateContext);
export const useMatchesDispatch = () => useContext(MatchesDispatchContext);
export const MatchesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [stateArticle, dispatchArticle] = useReducer(reducer, initialState);

  return (
    <MatchStateContext.Provider value={stateArticle}>
      <MatchesDispatchContext.Provider value={dispatchArticle}>
        {children}
      </MatchesDispatchContext.Provider>
    </MatchStateContext.Provider>
  );
};