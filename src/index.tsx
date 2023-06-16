import * as React from "react";
import CreateDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import Main, { loader as mainLoader } from "./routes/main";
import Login, { loader as loginLoader } from "./routes/login";
import Quiz, { loader as quizLoader } from "./routes/quiz";
import CreateQuiz, { loader as createquizLoader } from "./routes/createquiz";
import Score from "./routes/score";
import Loading, { loader as loadingLoader } from "./routes/loading";

import "./index.css";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Main />,
        loader: mainLoader,
        children: [
          {
            index: true,
            element: <CreateQuiz />,
            loader: createquizLoader,
          },
          {
            path: "loading",
            element: <Loading />,
            loader: loadingLoader,
          },
          {
            path: "quiz",
            element: <Quiz />,
            loader: quizLoader,
          },
          {
            path: "score",
            element: <Score />,
          },
        ],
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
  <CookiesProvider>
    <RouterProvider router={router} />
  </CookiesProvider>
);
