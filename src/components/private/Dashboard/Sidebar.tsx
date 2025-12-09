import { CloudSun, Gpu, Home } from "lucide-react";
import type { MenuTab } from "../../../pages/protected/Dashboard";
import type { User } from "../../../types";
import DefaultUser from "../../../assets/default-user.svg";
// import JigglyPuff from "../../../assets/jiggly_puff.svg";
import { SiF1 } from "react-icons/si";
import { MdOutlineCatchingPokemon } from "react-icons/md";

interface SidebarProps {
  activeTab: MenuTab;
  onTabChange: (tab: MenuTab) => void;
  user: User | null;
}

// const JigglyPuffIcon = () => {
//   return <img src={JigglyPuff} className="w-5" alt="Jiggly Puff" />;
// };

const menuItems = [
  {
    id: "overview" as MenuTab,
    label: "Overview",
    icon: Home,
  },
  {
    id: "pokedex" as MenuTab,
    label: "Pokédex",
    icon: MdOutlineCatchingPokemon,
  },
  {
    id: "f1" as MenuTab,
    label: "Formula 1",
    icon: SiF1,
  },
  {
    id: "weather" as MenuTab,
    label: "Weather",
    icon: CloudSun,
  },
  {
    id: "crypto" as MenuTab,
    label: "Crypto",
    icon: Gpu,
  },
];

const appVersion = import.meta.env.VITE_APP_VERSION;

const Sidebar = ({ activeTab, onTabChange, user }: SidebarProps) => {
  const isProfileActive = activeTab === "profile";

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 select-none">
        <h1 className="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-50">
          AxoKaze.
        </h1>
      </div>

      {/* <div className="relative h-3 border-y border-y-[--pattern-fg] bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed border-zinc-500 dark:border-zinc-800"></div> */}

      {/* Navigation menu */}
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 h-10 rounded-lg font-display text-sm transition-all duration-200 cursor-pointer active:scale-95
                    ${
                      isActive
                        ? "bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4">
        <button
          onClick={() => {
            onTabChange("profile");
          }}
          onContextMenu={() => {
            // e.preventDefault();
            // TODO: ADD CONTEXT MENU - 1. UPDATE PROFILE, 2. LOGOUT, ...
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-display text-sm transition-all duration-200 cursor-pointer active:scale-95 border border-dashed border-zinc-900 dark:border-zinc-50/20
            ${
              isProfileActive
                ? "text-zinc-900 dark:text-zinc-100 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
        >
          <div className="border border-zinc-700 rounded-full flex items-center justify-center overflow-hidden">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                className="w-10 h-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
                alt="Profile"
              />
            ) : (
              <img
                src={DefaultUser}
                alt="Default Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
          </div>
          <span className="text-[14px]">{user?.name}</span>
        </button>
      </div>

      {/* Bottom section */}
      {/* <div className="relative h-1 border-y border-y-[--pattern-fg] bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed border-zinc-500 dark:border-zinc-800"></div> */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="text-sm text-zinc-400 dark:text-zinc-500 text-center font-display font-semibold">
          v{appVersion}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
