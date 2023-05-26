import * as React from "react";
import CreateDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, { loader as rootLoader } from "./routes/root";
import Login, { loader as loginLoader } from "./routes/login";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Root />,
        loader: rootLoader,
      },
      {
        path: "login",
        element: <Login />,
        loader: loginLoader,
      },
    ],
  },
]);

CreateDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
