import Dexie, { Table } from "dexie";
import dexieCloud from "dexie-cloud-addon";
import { Todo } from "./models/Todo";

export class AppDB extends Dexie {
  todos!: Table<Todo, string>;

  constructor() {
    super("MySyncApp", {
      addons: [dexieCloud],
    });

    this.version(1).stores({
      todos: "id, completed, createdAt",
    });

    this.cloud.configure({
      databaseUrl: "https://zg16mnpoq.dexie.cloud",

      // Very important for freemium
      requireAuth: false,
    });
  }
}

export const db = new AppDB();