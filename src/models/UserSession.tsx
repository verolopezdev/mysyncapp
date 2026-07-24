// Define the session model

export interface UserSession {
  isAuthenticated: boolean;
  isPremium: boolean;
  email?: string;
}

/**
 * Initially:

Anonymous user

isAuthenticated = false
isPremium = false

After login (but before adding billing):

Authenticated

isAuthenticated = true
isPremium = true   // temporary

Later we'll replace that with a real subscription check.
 */