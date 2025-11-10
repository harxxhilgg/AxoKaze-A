import type { MenuTab } from "../../../pages/protected/Dashboard";
import type { User } from "../../../types";
import Analytics from "./Pages/Analytics";
import Overview from "./Pages/Overview";
import Projects from "./Pages/Projects";
import Settings from "./Pages/Settings";
import Tasks from "./Pages/Tasks";
import Team from "./Pages/Team";

interface MainContentProps {
  activeTab: MenuTab;
  user: User | null;
}

const MainContent = ({ activeTab, user }: MainContentProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview user={user} />;
      case "analytics":
        return <Analytics />;
      case "projects":
        return <Projects />;
      case "tasks":
        return <Tasks />;
      case "team":
        return <Team />;
      case "settings":
        return <Settings user={user} />;
      default:
        return <Overview user={user} />;
    }
  };

  return <div className="p-6 h-full">{renderContent()}</div>;
};

export default MainContent;
