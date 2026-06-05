import { useCallback, useRef, useState } from "react";
import { Status, Todo } from "../types/todo";

// Touch: hold this long without moving to start dragging (so scrolling still works).
const LONG_PRESS_MS = 180;
// Mouse: start dragging once the pointer moves this far.
const MOVE_THRESHOLD = 8;

interface Preview {
  title: string;
  x: number;
  y: number;
}

export default function useKanbanDnD(
  onStatusChange: (id: number, status: Status) => void
) {
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [hoveredStatus, setHoveredStatus] = useState<Status | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);

  // keep the latest callback without re-binding listeners
  const onStatusChangeRef = useRef(onStatusChange);
  onStatusChangeRef.current = onStatusChange;

  const stateRef = useRef({
    todo: null as Todo | null,
    startX: 0,
    startY: 0,
    active: false,
    timer: undefined as number | undefined,
  });

  // store the exact listener instances so we can remove them later
  const handlersRef = useRef<{
    move?: (e: PointerEvent) => void;
    up?: (e: PointerEvent) => void;
    cancel?: (e: PointerEvent) => void;
    touch?: (e: TouchEvent) => void;
  }>({});

  const cleanup = useCallback(() => {
    const h = handlersRef.current;
    if (h.move) window.removeEventListener("pointermove", h.move);
    if (h.up) window.removeEventListener("pointerup", h.up);
    if (h.cancel) window.removeEventListener("pointercancel", h.cancel);
    if (h.touch) window.removeEventListener("touchmove", h.touch);
    handlersRef.current = {};

    const s = stateRef.current;
    if (s.timer) window.clearTimeout(s.timer);
    s.todo = null;
    s.active = false;
    s.timer = undefined;

    setDraggingId(null);
    setHoveredStatus(null);
    setPreview(null);
  }, []);

  const statusAt = (x: number, y: number): Status | null => {
    const el = document.elementFromPoint(x, y);
    const colEl = el?.closest("[data-status]") as HTMLElement | null;
    return (colEl?.dataset.status as Status) ?? null;
  };

  const activate = useCallback((x: number, y: number) => {
    const s = stateRef.current;
    if (!s.todo) return;
    s.active = true;
    s.timer = undefined;
    setDraggingId(s.todo.id);
    setPreview({ title: s.todo.title, x, y });
    setHoveredStatus(statusAt(x, y));
  }, []);

  const onCardPointerDown = useCallback(
    (e: React.PointerEvent, todo: Todo) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;

      const s = stateRef.current;
      s.todo = todo;
      s.startX = e.clientX;
      s.startY = e.clientY;
      s.active = false;

      const move = (ev: PointerEvent) => {
        const st = stateRef.current;
        if (!st.todo) return;

        if (!st.active) {
          const dist = Math.hypot(ev.clientX - st.startX, ev.clientY - st.startY);
          if (ev.pointerType === "touch") {
            // moved before the long-press fired => the user is scrolling
            if (dist > MOVE_THRESHOLD) cleanup();
          } else if (dist > MOVE_THRESHOLD) {
            activate(ev.clientX, ev.clientY);
          }
          return;
        }

        setPreview({ title: st.todo.title, x: ev.clientX, y: ev.clientY });
        setHoveredStatus(statusAt(ev.clientX, ev.clientY));
      };

      const up = (ev: PointerEvent) => {
        const st = stateRef.current;
        if (st.active && st.todo) {
          const status = statusAt(ev.clientX, ev.clientY);
          if (status && status !== st.todo.status) {
            onStatusChangeRef.current(st.todo.id, status);
          }
        }
        cleanup();
      };

      const cancel = () => cleanup();

      // block page scrolling only while an active drag is in progress
      const touch = (ev: TouchEvent) => {
        if (stateRef.current.active) ev.preventDefault();
      };

      handlersRef.current = { move, up, cancel, touch };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", cancel);
      window.addEventListener("touchmove", touch, { passive: false });

      if (e.pointerType === "touch") {
        s.timer = window.setTimeout(
          () => activate(s.startX, s.startY),
          LONG_PRESS_MS
        );
      }
    },
    [activate, cleanup]
  );

  return { draggingId, hoveredStatus, preview, onCardPointerDown };
}
