import { BehaviorSubject } from "rxjs";
import { UserSession } from "../models/UserSession";
import { authService } from "./AuthService";

const anonymous: UserSession = {
  isAuthenticated: false,
  isPremium: false,
};

class UserService {
  private sessionSubject = new BehaviorSubject<UserSession>(anonymous);

  session$ = this.sessionSubject.asObservable();

  constructor() {
    authService.currentUser$.subscribe(user => {
      if (!user) {
        this.sessionSubject.next(anonymous);
        return;
      }

      this.sessionSubject.next({
        isAuthenticated: true,

        // Temporary until billing
        isPremium: true,

        email: user.email,
      });
    });
  }

  get session() {
    return this.sessionSubject.value;
  }
}

export const userService = new UserService();