/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouterProvider } from "react-router-dom";
import { useContext } from "react";
import {ThemeContext} from "./context/theme";

import { ArticlesProvider } from "./context/articles/context";
import { MatchesProvider } from "./context/livescores/context";
import "./App.css";
import router from "./routes";

const App = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`h-screen w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}>
      <ArticlesProvider>
        <MatchesProvider>
      <RouterProvider router={router} />
        </MatchesProvider>
      </ArticlesProvider>
    </div>
  )
};
export default App;
