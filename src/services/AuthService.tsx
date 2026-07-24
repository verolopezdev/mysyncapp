import { db } from "../db";

class AuthService {
  login() {
    return db.cloud.login();
  }

  logout() {
    return db.cloud.logout();
  }

  get currentUser$() {
    return db.cloud.currentUser;
  }
}

export const authService = new AuthService();