import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./compoenets/page/Home.jsx";
import DailyCleaning from "./compoenets/page/DailyCleaning.jsx";
import MonthlyCleaning from "./compoenets/page/MonthlyCleaning.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/daily",
    element: <DailyCleaning />,
  },
  {
    path: "/month",
    element: <MonthlyCleaning />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
