import React, { useEffect, useState } from "react";
import { todoListAPI } from "../features/todoLists/todoLists.api";
import { tasksAPI } from "../features/tasks/tasks.api";

export default {
  title: "API",
};

const todoListId = "9046b9ff-83e6-437b-8ee3-dca7f4602c22";
const taskId = "f3d998da-dd79-46d5-a4a1-295e2b210a39";

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todoListAPI.getTodoLists().then((res) => {
      console.log(res);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todoListAPI
      .createTodoList({ title: "New todo" })
      .then((res) => console.log(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todoListAPI
      .deleteTodoList({ todoListId: "bee63409-3ba8-440d-a56c-f1e7e8719768" })
      .then((res) => console.log(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todoListAPI
      .changeTodoListTitle({
        todoListId: "07e2c145-3f94-4496-bf65-c0b470b385c7",
        title: "Its new namess",
      })
      .then((res) => console.log(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    tasksAPI.getTasks(todoListId).then((res) => console.log(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    tasksAPI
      .createTask({ todoListId: todoListId, title: "New task" })
      .then((res) => console.log(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    tasksAPI
      .changeTask({
        todoListId,
        taskId: "6a6bff4f-3a5a-490a-9563-8680d9b82cb2",
        title: "New tt",
      })
      .then((res) => console.log(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTaskStatus = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    tasksAPI
      .changeTask({ todoListId, taskId, title: "new Title", status: 1 })
      .then((res) => console.log(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    tasksAPI
      .deleteTask({
        todoListId,
        taskId: "1c3b7623-5d87-4701-92b5-7ce79aee2348",
      })
      .then((res) => console.log(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
