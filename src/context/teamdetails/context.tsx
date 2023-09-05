/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { initialState, TeamsState, TeamsActions } from './interfaces';


const TeamsContext = createContext<TeamsState | undefined>(undefined);
type TeamsDispatch = React.Dispatch<TeamsActions>;

const TeamsDispatchContext = createContext<TeamsDispatch | undefined>(
  undefined,
);

export const useTeamsState = () => useContext(TeamsContext);
export const useTeamsDispatch = () => useContext(TeamsDispatchContext);

export const TeamsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [teamsState, teamsDispatch] = useReducer(reducer, initialState);

  return (
    <TeamsContext.Provider value={teamsState}>
      <TeamsDispatchContext.Provider value={teamsDispatch}>
        {children}
      </TeamsDispatchContext.Provider>
    </TeamsContext.Provider>
  );
}
