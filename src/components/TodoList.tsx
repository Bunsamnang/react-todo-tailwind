import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoList {
  todos: Todo[];
  onCompletedChange: (id: number, completed: boolean) => void;
  onDeleteClick: (id: number) => void;
  onTitleChange: (id: number, newTitle: string) => void;
}

const TodoList = ({
  todos,
  onCompletedChange,
  onDeleteClick,
  onTitleChange,
}: TodoList) => {
  const sortedTodos = todos.sort((a, b) => {
    if (a.completed === b.completed) {
      return b.id - a.id;
    }

    return a.completed ? 1 : -1;
  });

  return (
    <div className="space-y-3">
      {sortedTodos.map((todo, index) => (
        <TodoItem
          todo={todo}
          key={index}
          id={index}
          onCompletedChange={onCompletedChange}
          onDeleteClick={onDeleteClick}
          onTitleChange={onTitleChange}
        />
      ))}
    </div>
  );
};

export default TodoList;
