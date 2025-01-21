import type { StateCreator } from "zustand";
import type { AuthStatus } from "../../interfaces/auth-status.interface";
import type { User } from "../../interfaces/user.interface";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
}

export const storeApi: StateCreator<AuthState> = (set) => ({
  status: "unauthorized",
  token: undefined,
  user: undefined,

  // login: (token: string, user: User) => set({ status: "authenticated", token, user }),

  // logout: () => set({ status: "unauthenticated", token: undefined, user: undefined }),

  // error: () => set({ status: "error", token: undefined, user: undefined }),

  // pending: () => set({ status: "pending", token: undefined, user: undefined }),
});
