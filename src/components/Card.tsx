import { useLayoutEffect, useRef, useState } from "react";
import { Todo } from "../types/todo";
import { Check, X, Pencil, Trash2, GripVertical } from "lucide-react";

interface CardProps {
  todo: Todo;
  isDragging: boolean;
  onDeleteClick: (id: number) => void;
  onTitleChange: (id: number, newTitle: string) => void;
  onPointerDown: (e: React.PointerEvent, todo: Todo) => void;
}

const Card = ({
  todo,
  isDragging,
  onDeleteClick,
  onTitleChange,
  onPointerDown,
}: CardProps) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // grow the textarea height to fit its content as the user types
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [newTitle, editing]);

  const handleSave = () => {
    // only change the title if input is not empty
    if (newTitle.trim() !== "") {
      onTitleChange(todo.id, newTitle.trim());
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

  const handlePointerDown = (e: React.PointerEvent) => {
    // don't start a drag when editing or tapping the action buttons
    if (editing) return;
    if ((e.target as HTMLElement).closest("button")) return;
    onPointerDown(e, todo);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      className={`group flex select-none items-start gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-grab active:cursor-grabbing dark:border-slate-700 dark:bg-slate-900 ${
        isDragging ? "scale-95 opacity-40" : ""
      }`}
    >
      <GripVertical
        size={18}
        className="mt-0.5 shrink-0 text-gray-300 group-hover:text-gray-400 dark:text-slate-600 dark:group-hover:text-slate-500"
      />

      {editing ? (
        <textarea
          ref={textareaRef}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSave();
            }
            if (e.key === "Escape") handleCancel();
          }}
          rows={1}
          className="min-w-0 flex-grow resize-none break-words border-b border-gray-300 bg-transparent text-sm text-gray-800 focus:outline-none dark:border-slate-600 dark:text-slate-100"
          autoFocus
        />
      ) : (
        <span className="min-w-0 flex-grow whitespace-pre-wrap break-words text-left text-sm text-gray-800 dark:text-slate-100">
          {todo.title}
        </span>
      )}

      {editing ? (
        <div className="flex shrink-0 gap-1">
          <button onClick={handleCancel} aria-label="Cancel">
            <X size={18} className="text-red-700 hover:text-red-500" />
          </button>
          <button onClick={handleSave} aria-label="Save">
            <Check size={18} className="text-green-700 hover:text-green-500" />
          </button>
        </div>
      ) : (
        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button onClick={handleEdit} aria-label="Edit">
            <Pencil
              size={18}
              className="text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
            />
          </button>
          <button onClick={() => onDeleteClick(todo.id)} aria-label="Delete">
            <Trash2
              size={18}
              className="text-gray-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
