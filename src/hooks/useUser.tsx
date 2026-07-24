import { useEffect, useState } from "react";
import { userService } from "../services/UserService";
import { UserSession } from "../models/UserSession";

export function useUser() {
  const [session, setSession] = useState(userService.session);

  useEffect(() => {
    const sub = userService.session$.subscribe(setSession);

    return () => sub.unsubscribe();
  }, []);

  return session;
}