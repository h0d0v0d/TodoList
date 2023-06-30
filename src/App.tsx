import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./app/store";
import { withRedirect } from "./HOC/withRedirect";

import { TodoLists } from "./pages/TodoLists/TodoLists";
import { Login } from "./pages/login/Login";
import { Layout } from "./components/Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "/", Component: withRedirect(TodoLists) },
      { path: "/login", Component: Login },
      { path: "/todo-lists", Component: withRedirect(TodoLists) },
    ],
  },
]);

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
