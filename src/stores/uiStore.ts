import { create } from "zustand";

interface UIState {
  showLogoutPopup: boolean;
  setShowLogoutPopup: (show: boolean) => void;
  showUserContextMenu: boolean;
  setShowUserContextMenu: (show: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  showLogoutPopup: false,
  setShowLogoutPopup: (show) => set({ showLogoutPopup: show }),
  showUserContextMenu: false,
  setShowUserContextMenu: (show) => set({ showUserContextMenu: show }),
}));
