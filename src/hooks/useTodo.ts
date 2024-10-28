import { useEffect, useState } from "react";
import { Todo } from "../types/todo";

export default function useTodo() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos: Todo[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );
    return savedTodos;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleCompleteChange = (id: number, completed: boolean) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: completed } : todo
    );

    setTodos(newTodos);

    console.log(completed);
  };

  const handleTitleChange = (id: number, newTitle: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );

    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };

  const handleDeleteCompleted = () => {
    const inCompletedTodos = todos.filter((todo) => todo.completed !== true);

    setTodos(inCompletedTodos);
  };

  const handleSubmit = (title: string) => {
    setTodos((prev) => {
      return [
        {
          id: prev.length + 1,
          title: title,
          completed: false,
        },
        ...prev,
      ];
    });
  };
  return {
    todos,
    handleCompleteChange,
    handleTitleChange,
    handleDelete,
    handleDeleteCompleted,
    handleSubmit,
  };
}
