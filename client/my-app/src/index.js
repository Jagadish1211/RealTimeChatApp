import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error";

import Login from "./Containers/Login/login";
import Signup from "./Containers/Signup/signup";
import ChatWindow from "./Containers/ChatWindow/chatWindow";
import Home from "./Containers/Home/home";


const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/chat",
        element: <ChatWindow />,
      },
    ],
  },
]);
root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);
