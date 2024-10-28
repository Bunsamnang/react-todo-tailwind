import { Todo } from "../types/todo";

interface TodoSummary {
  todos: Todo[];
  onDeleteCompleted: () => void;
}

const TodoSummary = ({ todos, onDeleteCompleted }: TodoSummary) => {
  const completedTodos = todos.filter((todo) => todo.completed === true);

  return (
    <div className="mt-3">
      {todos.length > 0 && (
        <p>
          {completedTodos.length}/{todos.length} todos completed
        </p>
      )}

      {completedTodos.length > 0 && (
        <button
          className="text-red-500 hover:underline font-medium mt-2"
          onClick={() => onDeleteCompleted()}
        >
          Delete all completed
        </button>
      )}
    </div>
  );
};

export default TodoSummary;
