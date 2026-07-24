import { db } from "../db";
import { useObservable } from "./useObservable";

export function useSync() {
  return useObservable(db.cloud.syncState);
}