import { useEffect, useState } from "react";
import { Status, Todo } from "../types/todo";

// Support data saved by the previous (completed: boolean) version of the app.
interface LegacyTodo {
  id: number;
  title: string;
  completed?: boolean;
  status?: Status;
}

function loadTodos(): Todo[] {
  const saved: LegacyTodo[] = JSON.parse(localStorage.getItem("todos") || "[]");

  return saved.map((todo) => {
    // the removed "In Review" column now folds back into "In Progress"
    const status =
      todo.status === ("in-review" as Status)
        ? "in-progress"
        : todo.status ?? (todo.completed ? "done" : "todo");

    return { id: todo.id, title: todo.title, status };
  });
}

export default function useTodo() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleStatusChange = (id: number, status: Status) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };

  const handleTitleChange = (id: number, newTitle: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (title: string) => {
    setTodos((prev) => [
      {
        id: Date.now(),
        title,
        status: "todo",
      },
      ...prev,
    ]);
  };

  return {
    todos,
    handleStatusChange,
    handleTitleChange,
    handleDelete,
    handleSubmit,
  };
}
