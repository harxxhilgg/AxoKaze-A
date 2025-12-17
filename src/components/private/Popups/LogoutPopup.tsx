import { useEffect, useState } from "react";
import { useAuthStore, useUIStore } from "../../../stores";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import { usePopupClose } from "../../../hooks/usePopupClose";
import toast from "react-hot-toast";

const LogoutPopup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const logout = useAuthStore((s) => s.logout);
  const setShowLogoutPopup = useUIStore((s) => s.setShowLogoutPopup);
  usePopupClose(() => setShowLogoutPopup(false), !loading);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const onLogout = async () => {
    try {
      setLoading(true);

      // ---------------

      await new Promise((resolve) => setTimeout(resolve, 2000)); //! remove in prod

      // ---------------

      await logout();

      setShowLogoutPopup(false);
      toast.success("Logged out successfully.");
    } catch (e) {
      console.error("Error logging out: ", e);
      toast.error("Error logging out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 cursor-pointer"
      onClick={() => !loading && setShowLogoutPopup(false)}
    >
      <div
        className={`flex flex-col justify-center bg-neutral-400 dark:bg-neutral-800 rounded-3xl p-8 w-180 h-80 transform transition-all duration-300 cursor-default ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"} selection:bg-zinc-50/15 border-2 border-zinc-50/10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-6">
          {/* SVG */}
          <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center border-2 border-yellow-600">
            <svg
              className="w-20 h-20 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v5m0 3h.01"
              />
            </svg>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold font-display text-gray-800 dark:text-white mb-3">
            Confirm Logout
          </h2>
          <p className="font-display text-gray-600 dark:text-gray-300">
            Are you sure you want to log out of your account?
          </p>
        </div>

        {/* Action Button */}
        <div className="flex mx-auto gap-8">
          <button
            className="flex justify-center items-center font-display font-semibold bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 h-10 w-40 cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-zinc-50 disabled:cursor-not-allowed disabled:active:scale-100"
            onClick={() => setShowLogoutPopup(false)}
          >
            <p className="text-sm">Cancel</p>
          </button>

          <button
            className="flex justify-center items-center font-display font-semibold bg-red-800 dark:bg-red-500 text-zinc-200 dark:text-zinc-800 h-10 w-40 cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-red-500 disabled:cursor-not-allowed disabled:active:scale-100"
            onClick={onLogout}
            disabled={loading}
          >
            {loading ? (
              <Quantum size={24} color="currentColor" />
            ) : (
              <p className="text-sm">Logout</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
