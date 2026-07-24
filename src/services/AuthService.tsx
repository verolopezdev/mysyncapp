import { db } from "../db";

class AuthService {
  async login() {
    await db.cloud.login();
  }

  async logout() {
    await db.cloud.logout();
  }

  get currentUser() {
    return db.cloud.currentUser;
  }
}

export const authService = new AuthService();