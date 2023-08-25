import { createBrowserRouter, Navigate } from "react-router-dom";


import Home from "../components/Home";




const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/home" replace /> },
   
    {
      path: "/home",
      element: <Home />,
    },
  ]);
  export default router;