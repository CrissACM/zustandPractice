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
  checkAuthStatus: () => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);

      set({ status: "authorized", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });

      throw "unauthorized";
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: "authorized", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-storage" })),
);
