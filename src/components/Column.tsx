import { Column as ColumnType, Todo } from "../types/todo";
import Card from "./Card";

interface ColumnProps {
  column: ColumnType;
  todos: Todo[];
  isOver: boolean;
  draggingId: number | null;
  onDeleteClick: (id: number) => void;
  onTitleChange: (id: number, newTitle: string) => void;
  onCardPointerDown: (e: React.PointerEvent, todo: Todo) => void;
}

const Column = ({
  column,
  todos,
  isOver,
  draggingId,
  onDeleteClick,
  onTitleChange,
  onCardPointerDown,
}: ColumnProps) => {
  return (
    <div
      data-status={column.status}
      className={`flex w-full flex-col overflow-hidden rounded-xl shadow-sm transition-all duration-200 ${
        column.bodyClass
      } ${
        isOver
          ? `ring-2 ring-offset-2 ring-offset-transparent ${column.ringClass} scale-[1.02]`
          : "ring-0"
      }`}
    >
      <div
        className={`flex items-center justify-between px-4 py-3 ${column.headerClass}`}
      >
        <h2 className="text-base font-bold tracking-wide">{column.title}</h2>
        <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs font-semibold dark:bg-white/20">
          {todos.length}
        </span>
      </div>

      <div className="flex min-h-[120px] flex-1 flex-col gap-2 p-3">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            todo={todo}
            isDragging={draggingId === todo.id}
            onDeleteClick={onDeleteClick}
            onTitleChange={onTitleChange}
            onPointerDown={onCardPointerDown}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
