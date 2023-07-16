import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "app/store";
import { withRedirect } from "common/HOK";

import { TodoLists } from "pages/todoLists/TodoLists";
import { Login } from "pages/login/Login";
import { Layout } from "components";
import Error from "pages/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "", Component: withRedirect(TodoLists) },
      { path: "login", Component: Login },
      { path: "todo-lists", Component: withRedirect(TodoLists) },
      { path: "error", Component: Error },
      { path: "*", Component: Error },
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
