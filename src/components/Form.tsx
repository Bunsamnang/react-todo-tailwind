import React, { useState } from "react";

interface Form {
  onSubmit: (title: string) => void;
}

const Form = ({ onSubmit }: Form) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    onSubmit(input);
    setInput("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInput(value);
  };

  return (
    <form
      action=""
      className="max-w-xl mx-auto mb-8 flex justify-between gap-2 px-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="h-10 w-80 flex-1 rounded-md p-2 text-gray-800 shadow-md outline-none placeholder:text-gray-400 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
        value={input}
        placeholder="Enter task"
        onChange={handleChange}
      />
      <button className="rounded-md bg-slate-800 px-5 py-2 font-bold text-white transition-colors hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white">
        Add
      </button>
    </form>
  );
};

export default Form;
