import { db } from "../db";
import { Todo } from "../models/Todo";

class TodoRepository {
  async getAll(): Promise<Todo[]> {
    return db.todos.orderBy("createdAt").reverse().toArray();
  }

  async add(title: string) {
    const now = new Date();

    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    await db.todos.add(todo);
  }

  async toggle(id: string) {
    const todo = await db.todos.get(id);

    if (!todo) return;

    await db.todos.update(id, {
      completed: !todo.completed,
      updatedAt: new Date(),
    });
  }

  async remove(id: string) {
    await db.todos.delete(id);
  }
}

export const todoRepository = new TodoRepository();