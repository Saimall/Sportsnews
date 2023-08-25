/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouterProvider } from "react-router-dom";
import { useContext } from "react";
import {ThemeContext} from "./context/theme";


import "./App.css";
import router from "./routes";

const App = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`h-screen w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}>
      <RouterProvider router={router} />
    </div>
  )
};
export default App;
