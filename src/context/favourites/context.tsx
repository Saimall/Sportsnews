/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { initialState, SportsState, SportsActions } from '../favourites/interfaces'


const SportsContext = createContext<SportsState | undefined>(undefined);
type SportsDispatch = React.Dispatch<SportsActions>;

const SportsDispatchContext = createContext<SportsDispatch | undefined>(
  undefined,
);

export const useSportsState = () => useContext(SportsContext);
export const useSportsDispatch = () => useContext(SportsDispatchContext);
export const SportsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  
  const [sportsState, sportsDispatch] = useReducer(reducer, initialState);

  return (
    <SportsContext.Provider value={sportsState}>
      <SportsDispatchContext.Provider value={sportsDispatch}>
        {children}
      </SportsDispatchContext.Provider>
    </SportsContext.Provider>
  );
}
