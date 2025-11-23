import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/api";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: true,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      checkAuth: async () => {
        try {
          const res = await api.get("/auth/get-profile");

          set({
            user: res.data.user,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          console.log("checkAuth error:", error);
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
          });
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout");
        } catch {
          // ignore failures
        } finally {
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
