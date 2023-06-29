import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./app/store";

import { TodoListsL } from "./pages/TodoLists/TodoLists";
import { Login } from "./pages/login/Login";
import { Layout } from "./components/Layout/Layout";
import { withRedirect } from "./HOC/withRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "/", Component: withRedirect(TodoListsL) },
      { path: "/login", Component: withRedirect(Login) },
      { path: "/todo-lists", Component: withRedirect(TodoListsL) },
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
