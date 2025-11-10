import { useState } from "react";
import { useAuthStore, useUIStore } from "../../stores";
import LogoutPopup from "../../components/private/Popups/LogoutPopup";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import Sidebar from "../../components/private/Dashboard/Sidebar";
import Header from "../../components/private/Dashboard/Header";
import MainContent from "../../components/private/Dashboard/MainContent";

export type MenuTab =
  | "overview"
  | "analytics"
  | "projects"
  | "tasks"
  | "team"
  | "settings";

const Dashboard = () => {
  const { user } = useAuthStore();
  useDocumentTitle("Dashboard - AxoKaze");
  // const [loading, setLoading] = useState<boolean>(false);
  const { showLogoutPopup } = useUIStore();
  const [activeTab, setActiveTab] = useState<MenuTab>("overview");

  return (
    <>
      {showLogoutPopup && <LogoutPopup />}

      <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 [--pattern-fg:var(--color-zinc-950)]/5 dark:[--pattern-fg:var(--color-zinc-50)]/10 selection:bg-zinc-50/15 transition-all">
        {/* main grid layout */}
        <div className="grid h-screen grid-cols-[250px_1rem_1fr] grid-rows-1">
          {/* sidebar */}
          <div className="bg-white dark:bg-zinc-950 relative z-10">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* vertical pattern stripe (right of sidebar) */}
          <div className="relative border-x border-x-[--pattern-fg] bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed border-zinc-500 dark:border-zinc-800"></div>

          {/* right content area */}
          <div className="flex flex-col overflow-hidden">
            {/* header */}
            <div className="bg-white dark:bg-zinc-950 relative z-10">
              <Header activeTab={activeTab} user={user} />
            </div>

            {/* horizontal pattern stripe (below header) */}
            <div className="relative h-3 border-y border-y-[--pattern-fg] bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed border-zinc-500 dark:border-zinc-800"></div>

            {/* main content */}
            <div className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-950">
              <MainContent activeTab={activeTab} user={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
