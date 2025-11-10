import {
  BarChart3,
  CheckSquare,
  FolderOpen,
  Home,
  Settings,
  Users,
} from "lucide-react";
import type { MenuTab } from "../../../pages/protected/Dashboard";

interface SidebarProps {
  activeTab: MenuTab;
  onTabChange: (tab: MenuTab) => void;
}

const menuItems = [
  {
    id: "overview" as MenuTab,
    label: "Overview",
    icon: Home,
  },
  {
    id: "analytics" as MenuTab,
    label: "Analytics",
    icon: BarChart3,
  },
  {
    id: "projects" as MenuTab,
    label: "Projects",
    icon: FolderOpen,
  },
  {
    id: "tasks" as MenuTab,
    label: "Tasks",
    icon: CheckSquare,
  },
  {
    id: "team" as MenuTab,
    label: "Team",
    icon: Users,
  },
  {
    id: "settings" as MenuTab,
    label: "Settings",
    icon: Settings,
  },
];

const appVersion = import.meta.env.VITE_APP_VERSION;

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-50">
          AxoKaze.
        </h1>
      </div>

      <div className="relative h-3 border-y border-y-[--pattern-fg] bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed border-zinc-500 dark:border-zinc-800"></div>

      {/* Navigation menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-display text-sm transition-all duration-200 cursor-pointer active:scale-95
                    ${
                      isActive
                        ? "bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="relative h-1 border-y border-y-[--pattern-fg] bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed border-zinc-500 dark:border-zinc-800"></div>
      <div className="p-4">
        <div className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
          Version {appVersion}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
