import type { MenuTab } from "../../../pages/protected/Dashboard";
import type { User } from "../../../types";
import Overview from "./Pages/Overview";
import Profile from "./Pages/Profile";
import Pokedex from "./Pages/Pokedex";
import Movies from "./Pages/Movies";
import Weather from "./Pages/Weather";
import Crypto from "./Pages/Crypto";

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
      case "movies":
        return <Movies />;
      case "weather":
        return <Weather />;
      case "crypto":
        return <Crypto />;
      case "profile":
        return <Profile user={user} />;
      default:
        return <Overview user={user} />;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default MainContent;
