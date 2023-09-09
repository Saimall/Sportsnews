/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./context/theme";

import { ArticlesProvider } from "./context/articles/context";
import { MatchesProvider } from "./context/livescores/context";
import { TeamsProvider } from "./context/teamdetails/context";
import { SportsProvider } from "./context/favourites/context";
import "./App.css";
import router from "./routes";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`h-screen w-full mx-auto py-2 ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <ArticlesProvider>
        <MatchesProvider>
          <SportsProvider>
            <TeamsProvider>
              <RouterProvider router={router} />
            </TeamsProvider>
          </SportsProvider>
        </MatchesProvider>
      </ArticlesProvider>
    </div>
  );
};
export default App;
