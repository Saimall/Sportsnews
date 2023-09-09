/* eslint-disable react-refresh/only-export-components */

import { initialState, ArticlesState, ArticlesActions } from "./interfaces";

import React, { createContext, useContext, useReducer } from "react";

import { reducer } from "./reducer";

const ArticlesStateContext = createContext<ArticlesState | undefined>(
  undefined,
);
type ArticlesDispatch = React.Dispatch<ArticlesActions>;
const ArticlesDispatchContext = createContext<ArticlesDispatch | undefined>(
  undefined,
);

export const useArticlesState = () => useContext(ArticlesStateContext);
export const useArticlesDispatch = () => useContext(ArticlesDispatchContext);
export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [stateArticle, dispatchArticle] = useReducer(reducer, initialState);

  return (
    <ArticlesStateContext.Provider value={stateArticle}>
      <ArticlesDispatchContext.Provider value={dispatchArticle}>
        {children}
      </ArticlesDispatchContext.Provider>
    </ArticlesStateContext.Provider>
  );
};
