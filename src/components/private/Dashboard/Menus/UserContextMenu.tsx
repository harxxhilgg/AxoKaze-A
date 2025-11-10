import { useEffect, useRef, useState } from "react";
import { useUIStore } from "../../../../stores";
import { usePopupClose } from "../../../../hooks/usePopupClose";
import { LogOut, User } from "lucide-react";

interface UserContextMenuProps {
  user: {
    name: string;
    email: string;
  } | null;
}

const UserContextMenu = ({ user }: UserContextMenuProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { setShowUserContextMenu, setShowLogoutPopup } = useUIStore();

  usePopupClose(() => setShowUserContextMenu(false));

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleProfileClick = () => {
    console.log("Navigate to profile...");
    setShowUserContextMenu(false);
  };

  const handleLogoutClick = () => {
    setShowUserContextMenu(false);
    setShowLogoutPopup(true);
  };

  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      onClick: handleProfileClick,
    },
    {
      id: "logout",
      label: "Logout",
      icon: LogOut,
      onClick: handleLogoutClick,
      variant: "danger" as const,
    },
  ];

  return (
    <div className="fixed inset-0 z-40">
      {/* invisible backdrop */}
      <div
        className="absolute inset-0"
        onClick={() => setShowUserContextMenu(false)}
      >
        {/* context menu */}
        <div
          ref={menuRef}
          className={`absolute top-20 right-6 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 rounded-[14px] shadow-lg p-2 min-w-48 transform transition-all duration-200
            ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}  
          `}
        >
          {/* user info header */}
          <div className="px-3 py-2 font-display border-b border-zinc-200 dark:border-zinc-600 mb-2">
            <p className="text-md font-medium text-zinc-900 dark:text-zinc-100 truncate">
              {user?.name || "username"}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
              {user?.email || "email@example.com"}
            </p>
          </div>

          {/* menu items */}
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-display text-sm transition-all duration-200 cursor-pointer active:scale-95 ${
                    item.variant === "danger"
                      ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/80"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserContextMenu;
