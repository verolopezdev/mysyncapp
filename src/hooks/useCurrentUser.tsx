import { db } from "../db";
import { useObservable } from "./useObservable";

export function useCurrentUser() {
  return useObservable(db.cloud.currentUser);
}