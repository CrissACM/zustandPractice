import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { AuthStatus } from "../../interfaces/auth-status.interface";
import type { User } from "../../interfaces/user.interface";
import { AuthService } from "../../services/auth.service";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "unauthorized",
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);

      set({ status: "authorized", token, user });
    } catch (error) {
      console.log(error);

      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },
  // login: (token: string, user: User) => set({ status: "authenticated", token, user }),

  // logout: () => set({ status: "unauthenticated", token: undefined, user: undefined }),

  // error: () => set({ status: "error", token: undefined, user: undefined }),

  // pending: () => set({ status: "pending", token: undefined, user: undefined }),
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-storage" })),
);
