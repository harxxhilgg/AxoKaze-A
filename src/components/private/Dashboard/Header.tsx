import { Bell } from "lucide-react";
import type { MenuTab } from "../../../pages/protected/Dashboard";
import { useUIStore } from "../../../stores";
import type { User } from "../../../types";
import UserContextMenu from "./Menus/UserContextMenu";

interface HeaderProps {
  activeTab: MenuTab;
  user: User | null;
}

const tabLabels: Record<MenuTab, string> = {
  overview: "Overview",
  analytics: "Analytics",
  projects: "Projects",
  tasks: "Tasks",
  team: "Team",
  settings: "Settings",
};

const Header = ({ activeTab, user }: HeaderProps) => {
  const { showUserContextMenu, setShowUserContextMenu } = useUIStore();

  return (
    <div className="flex items-center justify-between h-21 px-6">
      {/* left side - current tab */}
      <div>
        <h1 className="text-xl font-display font-semibold text-zinc-900 dark:text-zinc-100">
          {tabLabels[activeTab]}
        </h1>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Welcome back, {user?.name || "User"}
        </p>
      </div>

      {/* right side - notifications & avatar */}
      <div className="flex items-center gap-1">
        {/* notification button */}
        <button
          className="relative flex items-center justify-center w-14 h-14 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-50/15 duration-200 transition-colors cursor-pointer active:scale-95"
          title="Notifications"
        >
          <Bell size={22} className="text-zinc-600 dark:text-zinc-400" />
          {/* notification badge */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* user avatar & info */}
        <div className="relative group">
          <button
            onClick={() => setShowUserContextMenu(true)}
            className="flex items-center justify-center w-14 h-14 rounded-lg gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-50/15 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-800 dark:bg-zinc-200 flex items-center justify-center">
              <span className="text-sm font-display font-semibold text-zinc-200 dark:text-zinc-800">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
          </button>

          {/* show this span on hover */}
          <span className="absolute -left-1/2 -translate-x-1/2 mt-3 hidden group-hover:flex items-center justify-center bg-zinc-800 dark:bg-zinc-50 text-white dark:text-zinc-900 px-2 py-2 rounded-xl shadow-lg transition-opacity duration-200 opacity-0 group-hover:opacity-100 whitespace-nowrap">
            <div className="flex flex-col font-display">
              <p className="text-sm">{user?.name}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          </span>

          {/* context Menu */}
          {showUserContextMenu && <UserContextMenu user={user} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
