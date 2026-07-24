import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

export function useTodos() {
  return useLiveQuery(
    () => db.todos.orderBy("createdAt").reverse().toArray(),
    [],
    []
  );
}