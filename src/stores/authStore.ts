import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/api";
import type { User } from "../types";
import { usePokemonStore } from "./pokemonStore";
import { useF1Store } from "./f1Store";
import { useWeatherStore } from "./weatherStore";

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
    (set, get) => ({
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
        const wasAuthenticated = get().isAuthenticated;

        // ---------------

        await new Promise((resolve) => setTimeout(resolve, 2000)); //! remove in prod

        // ---------------

        // lazy check: if user was logged in before, trust localStorage
        if (wasAuthenticated) {
          set({ loading: false });

          // verify in background
          api
            .get("/auth/get-profile")
            .then((res) => {
              set({ user: res.data.user, isAuthenticated: true });
            })
            .catch(() => {
              set({ user: null, isAuthenticated: false });
            });

          return;
        }

        try {
          const res = await api.get("/auth/get-profile");

          set({
            user: res.data.user,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          console.error("checkAuth error:", error);
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

          // clear memory state
          usePokemonStore.getState().resetPokemonStore();
          useF1Store.getState().resetF1Store();
          useWeatherStore.getState().resetWeatherStore();

          // clear persisted data
          localStorage.removeItem("pokemon-store");
          localStorage.removeItem("f1-calendar-cache");
          localStorage.removeItem("weather-storage");
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // exclude loading from persistence - should always start true
      }),
    }
  )
);
