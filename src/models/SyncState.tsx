export type SyncStatus =
  | "local-only"
  | "connecting"
  | "syncing"
  | "in-sync"
  | "offline"
  | "error";

export interface SyncState {
  status: SyncStatus;
  error?: string;
}