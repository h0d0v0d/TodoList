import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
  withCredentials: true,
});

export const tasksAPI = {
  getTasks(todoListID: string) {
    return instance.get<GetTasksResponse>(`${todoListID}/tasks`);
  },
  createTask({ todoListId, title }: CreateTaskArgs) {
    return instance.post<CreateOrUpdateTaskResponse>(`${todoListId}/tasks`, {
      title,
    });
  },
  updateTaskTitle({ todoListId, taskId, title }: UpdateTaskTitleArgs) {
    return instance.put<CreateOrUpdateTaskResponse>(
      `${todoListId}/tasks/${taskId}`,
      { title }
    );
  },
  updateTaskStatus(args: UpdateTaskStatusArgs) {
    const { todoListId, taskId, title, status } = args;
    return instance.put<CreateOrUpdateTaskResponse>(
      `${todoListId}/tasks/${taskId}`,
      { title, status }
    );
  },
  deleteTask({ todoListId, taskId }: DeleteTaskArgs) {
    return instance.delete<DeleteTaskResponse>(`${todoListId}/tasks/${taskId}`);
  },
};

export type TaskType = {
  addedDate: Date;
  deadline: Date | null;
  description: string | null;
  id: string;
  order: number;
  priority: number;
  startDate: Date | null;
  status: number;
  title: string;
  todoListId: string;
};

// Get Tasks
type GetTasksResponse = {
  items: TaskType[];
  totalCount: number;
  error: string;
};

// Create Task
type CreateTaskArgs = {
  todoListId: string;
  title: string;
};

type CreateOrUpdateTaskResponse = {
  data: {
    item: TaskType;
  };
  resultCode: number;
  messages: string[];
};

// Update Task Title
type UpdateTaskTitleArgs = {
  todoListId: string;
  taskId: string;
  title: string;
};

// Update Task Status
export type UpdateTaskStatusArgs = {
  todoListId: string;
  taskId: string;
  title: string;
  status: number;
};

// DeleteTask
type DeleteTaskArgs = {
  todoListId: string;
  taskId: string;
};

type DeleteTaskResponse = {
  resultCode: number;
  messages: string[];
  data: {};
};
