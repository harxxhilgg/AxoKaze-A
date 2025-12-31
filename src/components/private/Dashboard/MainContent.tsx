import type { MenuTab } from "../../../pages/protected/Dashboard";
import type { User } from "../../../types";
import Overview from "./Pages/Overview";
import Profile from "./Pages/Profile";
import Pokedex from "./Pages/Pokedex";
import Weather from "./Pages/Weather";
import F1 from "./Pages/F1";

interface MainContentProps {
  activeTab: MenuTab;
  user: User | null;
}

const MainContent = ({ activeTab, user }: MainContentProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview user={user} />;
      case "pokedex":
        return <Pokedex />;
      case "f1":
        return <F1 />;
      case "weather":
        return <Weather />;
      case "profile":
        return <Profile user={user} />;
      default:
        return <Overview user={user} />;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default MainContent;
