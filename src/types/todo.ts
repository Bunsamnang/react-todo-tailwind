export type Status = "todo" | "in-progress" | "in-review" | "done";

export interface Todo {
  id: number;
  title: string;
  status: Status;
}

export interface Column {
  status: Status;
  title: string;
  // header bar color + readable text (light / dark)
  headerClass: string;
  // column body background (light / dark)
  bodyClass: string;
  // highlight ring shown while dragging a card over the column
  ringClass: string;
}

export const COLUMNS: Column[] = [
  {
    status: "todo",
    title: "Todo",
    headerClass: "bg-rose-300 text-rose-950 dark:bg-rose-500 dark:text-rose-50",
    bodyClass: "bg-rose-50 dark:bg-slate-800/60",
    ringClass: "ring-rose-400",
  },
  {
    status: "in-progress",
    title: "In Progress",
    headerClass:
      "bg-amber-300 text-amber-950 dark:bg-amber-500 dark:text-amber-50",
    bodyClass: "bg-amber-50 dark:bg-slate-800/60",
    ringClass: "ring-amber-400",
  },
  {
    status: "in-review",
    title: "In Review",
    headerClass:
      "bg-emerald-300 text-emerald-950 dark:bg-emerald-500 dark:text-emerald-50",
    bodyClass: "bg-emerald-50 dark:bg-slate-800/60",
    ringClass: "ring-emerald-400",
  },
  {
    status: "done",
    title: "Done",
    headerClass: "bg-sky-300 text-sky-950 dark:bg-sky-500 dark:text-sky-50",
    bodyClass: "bg-sky-50 dark:bg-slate-800/60",
    ringClass: "ring-sky-400",
  },
];
