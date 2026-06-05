import { COLUMNS, Status, Todo } from "../types/todo";
import useKanbanDnD from "../hooks/useKanbanDnD";
import Column from "./Column";

interface KanbanBoardProps {
  todos: Todo[];
  onDeleteClick: (id: number) => void;
  onTitleChange: (id: number, newTitle: string) => void;
  onStatusChange: (id: number, status: Status) => void;
}

const KanbanBoard = ({
  todos,
  onDeleteClick,
  onTitleChange,
  onStatusChange,
}: KanbanBoardProps) => {
  const { draggingId, hoveredStatus, preview, onCardPointerDown } =
    useKanbanDnD(onStatusChange);

  return (
    <>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 pb-4 sm:grid-cols-3">
        {COLUMNS.map((column) => (
          <Column
            key={column.status}
            column={column}
            todos={todos.filter((todo) => todo.status === column.status)}
            isOver={hoveredStatus === column.status}
            draggingId={draggingId}
            onDeleteClick={onDeleteClick}
            onTitleChange={onTitleChange}
            onCardPointerDown={onCardPointerDown}
          />
        ))}
      </div>

      {/* floating card that follows the pointer/finger while dragging */}
      {preview && (
        <div
          className="pointer-events-none fixed z-50 w-60 -translate-x-1/2 -translate-y-1/2 rotate-2 rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-800 opacity-90 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          style={{ left: preview.x, top: preview.y }}
        >
          <span className="block whitespace-pre-wrap break-words">
            {preview.title}
          </span>
        </div>
      )}
    </>
  );
};

export default KanbanBoard;
