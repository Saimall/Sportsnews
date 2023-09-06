import { createBrowserRouter, Navigate } from "react-router-dom";


import Home from "../components/Home";

import Signin from "../components/signin";

import Signup from "../components/signup";
import Signout from "../components/signout";



const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/home" replace /> },
   
    {
      path: "/home",
      element: <Home />,
    },

    {
      path: "/signin",
      element: <Signin />,
    },

    {
      path: "/signup",
      element: <Signup />,
    },

    {
      path: "/signout",
      element: <Signout />,
    },
  ]);
  export default router;