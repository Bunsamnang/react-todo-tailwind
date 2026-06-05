import { Moon, Sun } from "lucide-react";
import Form from "./components/Form";
import KanbanBoard from "./components/KanbanBoard";
import useTodo from "./hooks/useTodo";
import useTheme from "./hooks/useTheme";

function App() {
  const {
    todos,
    handleStatusChange,
    handleTitleChange,
    handleDelete,
    handleSubmit,
  } = useTodo();

  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen bg-teal-50 py-10 transition-colors duration-300 dark:bg-slate-950">
      <div className="relative mx-auto mb-6 max-w-6xl px-4">
        <h1 className="text-center text-2xl font-bold text-teal-900 sm:text-3xl dark:text-white">
          Kanban Board
        </h1>

        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-teal-900/10 p-2 text-teal-900 transition-colors hover:bg-teal-900/20 dark:bg-white/15 dark:text-white dark:hover:bg-white/25"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <Form onSubmit={handleSubmit} />

      <div className="mt-10">
        <KanbanBoard
          todos={todos}
          onDeleteClick={handleDelete}
          onTitleChange={handleTitleChange}
          onStatusChange={handleStatusChange}
        />
      </div>
    </main>
  );
}

export default App;
