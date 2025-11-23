import { useEffect, useState } from "react";
import { useAuthStore, useUIStore } from "../../../stores";
import "ldrs/react/Quantum.css";
import { usePopupClose } from "../../../hooks/usePopupClose";
import DefaultUser from "../../../assets/default-user.svg";

const ProfilePopup = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { user } = useAuthStore();
  const setShowProfilePopup = useUIStore((s) => s.setShowProfilePopup);
  usePopupClose(() => setShowProfilePopup(false));

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50"
      onClick={() => setShowProfilePopup(false)}
    >
      <div
        className={`flex flex-col justify-center bg-neutral-400 dark:bg-neutral-800 rounded-3xl p-8 w-180 h-80 transform transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"} selection:bg-zinc-50/15 border-2 border-zinc-50/10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-6">
          {/* Image */}
          <div className="w-25 h-25 rounded-full bg-yellow-100 dark:bg-zinc-900/30 flex items-center justify-center border-2 border-zinc-400">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                className="w-23 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <img
                src={DefaultUser}
                alt="Default Avatar"
                className="w-23 rounded-full object-cover"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center font-display gap-1">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <h2 className="text-md">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
