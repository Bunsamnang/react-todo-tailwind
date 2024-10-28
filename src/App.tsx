import Form from "./components/Form";
import TodoList from "./components/TodoList";
import TodoSummary from "./components/TodoSummary";
import useTodo from "./hooks/useTodo";

function App() {
  const {
    todos,
    handleCompleteChange,
    handleTitleChange,
    handleDelete,
    handleDeleteCompleted,
    handleSubmit,
  } = useTodo();

  console.log(todos);

  return (
    <>
      <main className="py-10 text-center">
        <h1 className="py-5 px-5  font-bold text-3xl">Todos</h1>
        <Form onSubmit={handleSubmit} />
        <div
          className={`max-w-xl mx-auto ${
            todos.length !== 0 ? "bg-slate-100" : ""
          } rounded-md p-3`}
        >
          <TodoList
            todos={todos}
            onCompletedChange={handleCompleteChange}
            onDeleteClick={handleDelete}
            onTitleChange={handleTitleChange}
          />
        </div>

        <TodoSummary todos={todos} onDeleteCompleted={handleDeleteCompleted} />
      </main>
    </>
  );
}

export default App;
