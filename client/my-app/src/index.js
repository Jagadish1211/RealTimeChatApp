import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import ErrorPage from './error';

import Login from './Containers/Login/login';

const root = ReactDOM.createRoot(document.getElementById('root'));



const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/signup",
        }
      ]
    }
  ]
)
root.render(
  <React.StrictMode>
    <RouterProvider router= {router} />
  </React.StrictMode>
);

