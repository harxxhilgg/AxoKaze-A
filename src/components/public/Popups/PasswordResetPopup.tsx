import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordResetPopup = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const onGoLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs backdrop-brightness-50 flex items-center justify-center z-50 cursor-pointer">
      <div
        className={`flex flex-col justify-center bg-neutral-400 dark:bg-neutral-800 rounded-3xl p-8 w-180 h-80 transform transition-all duration-300 cursor-default ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"} selection:bg-zinc-50/15 border-2 border-zinc-50/10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-6">
          {/* SVG */}
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center border-2 border-green-600">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold font-display text-gray-800 dark:text-white mb-3">
            Password Reset Successful
          </h2>
          <p className="font-display text-gray-600 dark:text-gray-300">
            Your password has been successfully reset. You can now log in with
            your new password.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex mx-auto gap-8">
          <button
            className="flex justify-center items-center font-display font-semibold bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 h-10 w-80 cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-zinc-50 disabled:cursor-not-allowed disabled:active:scale-100"
            onClick={onGoLogin}
          >
            <p className="text-md">Login</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPopup;
