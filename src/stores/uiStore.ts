import { create } from "zustand";

interface UIState {
  showLogoutPopup: boolean;
  setShowLogoutPopup: (show: boolean) => void;
  showUserContextMenu: boolean;
  setShowUserContextMenu: (show: boolean) => void;
  showUpdateProfilePopup: boolean;
  setShowUpdateProfilePopup: (show: boolean) => void;
  showProfilePopup: boolean;
  setShowProfilePopup: (show: boolean) => void;
  showF1YearDropdown: boolean;
  setShowF1YearDropdown: (show: boolean) => void;
  showRaceDetailsPopup: boolean;
  setShowRaceDetailsPopup: (show: boolean) => void;
  showDriverStandingsPopup: boolean;
  setShowDriverStandingsPopup: (show: boolean) => void;
  showConstructorStandingsPopup: boolean;
  setShowConstructorStandingsPopup: (show: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  showLogoutPopup: false,
  setShowLogoutPopup: (show) => set({ showLogoutPopup: show }),
  showUserContextMenu: false,
  setShowUserContextMenu: (show) => set({ showUserContextMenu: show }),
  showUpdateProfilePopup: false,
  setShowUpdateProfilePopup: (show) => set({ showUpdateProfilePopup: show }),
  showProfilePopup: false,
  setShowProfilePopup: (show) => set({ showProfilePopup: show }),
  showF1YearDropdown: false,
  setShowF1YearDropdown: (show) => set({ showF1YearDropdown: show }),
  showRaceDetailsPopup: false,
  setShowRaceDetailsPopup: (show) => set({ showRaceDetailsPopup: show }),
  showDriverStandingsPopup: false,
  setShowDriverStandingsPopup: (show) =>
    set({ showDriverStandingsPopup: show }),
  showConstructorStandingsPopup: false,
  setShowConstructorStandingsPopup: (show) =>
    set({ showConstructorStandingsPopup: show }),
}));
