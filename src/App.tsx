import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./app/store";

import { TodoListsL } from "./pages/TodoListsList/TodoListsL";
import { Login } from "./pages/login/Login";
import { Layout } from "./components/Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "/", Component: TodoListsL },
      { path: "/login", Component: Login },
      { path: "/todo-lists", Component: TodoListsL },
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
