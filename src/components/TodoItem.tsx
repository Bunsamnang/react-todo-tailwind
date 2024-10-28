import { useState } from "react";
import { Todo } from "./../types/todo";
import { Check, X, Pencil, Trash2 } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, completed: boolean) => void;
  id: number;
  onDeleteClick: (id: number) => void;
  onTitleChange: (id: number, newTitle: string) => void;
}

const TodoItem = ({
  todo,
  onCompletedChange,
  id,
  onDeleteClick,
  onTitleChange,
}: TodoItemProps) => {
  // add editing state to update ui
  const [editing, setEditing] = useState(false);

  const [newTitle, setNewTitle] = useState(todo.title);

  const handleSave = (id: number, newTitle: string) => {
    //only change the title if input is not empty
    if (newTitle.trim() !== "") {
      onTitleChange(id, newTitle);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(todo.title);
    setEditing(false);
  };

  const handleEdit = () => {
    // display the prev value
    setNewTitle(todo.title);
    setEditing(true);
  };

  return (
    <div className="flex items-center">
      <label
        htmlFor={`todo-item-${id}`}
        className="flex grow items-center border border-gray-400 rounded-md p-3 bg-white hover:bg-slate-50"
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
          className="scale-125 mr-3"
          id={`todo-item-${id}`}
        />

        {editing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-grow border-b border-gray-300 focus:outline-none"
            autoFocus
          />
        ) : (
          <span className={todo.completed ? "line-through text-gray-400" : ""}>
            {todo.title}
          </span>
        )}
      </label>

      {editing ? (
        <div className="p-2 space-x-2">
          <button onClick={() => handleCancel()}>
            <X size={20} className="text-red-700 hover:text-red-500" />
          </button>
          <button onClick={() => handleSave(todo.id, newTitle)}>
            <Check
              size={20}
              className="text-green-700 hover:text-green-500 font-bold"
            />
          </button>
        </div>
      ) : (
        <div className="p-2 space-x-2">
          <button onClick={() => handleEdit()}>
            <Pencil size={20} className="text-gray-700 hover:text-gray-500" />
          </button>
          <button onClick={() => onDeleteClick(todo.id)}>
            <Trash2 size={20} className="text-gray-700 hover:text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
