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

  console.log(input);

  return (
    <form
      action=""
      className="max-w-xl mx-auto mb-5 flex justify-between "
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="w-80 h-10 outline-none flex-1 shadow-md rounded-md p-2"
        value={input}
        placeholder="Enter task"
        onChange={handleChange}
      />
      <button className="bg-slate-800 py-2 px-5 text-white font-bold rounded-sm hover:bg-slate-700">
        Add
      </button>
    </form>
  );
};

export default Form;
