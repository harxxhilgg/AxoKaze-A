import { useEffect, useState } from "react";
import { useAuthStore, useUIStore } from "../../../stores";
import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";
import { usePopupClose } from "../../../hooks/usePopupClose";
import toast from "react-hot-toast";
import DefaultUser from "../../../assets/default-user.svg";
import { Trash, Upload } from "lucide-react";

interface UpdateProfileProps {
  isEditable: boolean;
}

const UpdateProfilePopup = ({ isEditable = false }: UpdateProfileProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(isEditable);
  const { user } = useAuthStore();
  const { setShowUpdateProfilePopup } = useUIStore();
  usePopupClose(() => setShowUpdateProfilePopup(false), !loading);

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

      setShowUpdateProfilePopup(false);
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
      onClick={() => !loading && setShowUpdateProfilePopup(false)}
    >
      <div
        className={`flex flex-col bg-neutral-400 dark:bg-neutral-800 rounded-3xl p-8 w-180 h-80 transform transition-all duration-300 cursor-default ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"} selection:bg-zinc-50/15 border-2 border-zinc-50/10`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* floating edit profile button */}
        <button
          onClick={() => {
            setEditing((prev) => !prev);
          }}
          className="absolute right-3.5 top-3.5 font-display h-8 w-30 rounded-lg cursor-pointer text-sm transition text-zinc-900/90 dark:text-zinc-50/90 bg-zinc-400 dark:bg-zinc-600/20 hover:bg-zinc-400/50 hover:dark:bg-zinc-600/30 active:scale-95 focus:outline-2 focus:outline-offset-0 border border-zinc-400 dark:border-zinc-600 focus:outline-zinc-50/50"
        >
          Edit Profile
        </button>

        {/* editable container */}
        <div className="flex flex-row mx-auto mt-6 items-center gap-10">
          <div>
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                className="w-24 rounded-full object-cover"
              />
            ) : (
              <img
                src={DefaultUser}
                alt="Default Avatar"
                className="w-25 rounded-full object-cover"
              />
            )}
          </div>

          {/* profile icon buttons */}
          <div className="flex flex-row gap-4">
            <button
              onClick={() => {
                // TODO upload profile icon route
                toast.success("update profile icon");
              }}
              className="flex flex-row font-display border-2 border-zinc-800 dark:border-zinc-300 h-10 w-44 items-center justify-center gap-3 rounded-lg cursor-pointer active:scale-95 transition opacity-70 hover:opacity-100"
              title="Change profile picture"
            >
              <Upload size={18} color="white" />
              <p className="text-zinc-800 dark:text-zinc-200 text-sm">
                Change profile
              </p>
            </button>

            <button
              onClick={() => {
                // TODO delete profile icon
                toast.error("delete profile icon");
              }}
              className="flex flex-row font-display border-2 border-zinc-800 dark:border-red-500 h-10 w-10 items-center justify-center gap-4 rounded-lg cursor-pointer active:scale-95 transition opacity-70 hover:opacity-100"
              title="Delete profile picture"
            >
              <Trash size={18} color="red" />
            </button>
          </div>
        </div>

        {/* form - change username */}
        <div></div>

        {/* Action Buttons  */}
        <div
          className={`flex mx-auto py-auto gap-8 transition-all duration-200 bg-pink-300 ${editing ? "opacity-100 h-14" : "opacity-0 h-0"}`}
        >
          <button
            className="flex justify-center items-center font-display font-semibold bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 h-10 w-40 cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-zinc-50 disabled:cursor-not-allowed disabled:active:scale-100"
            onClick={() => {
              setEditing((prev) => !prev);
            }}
          >
            <p className="text-sm">Cancel</p>
          </button>

          <button
            className="flex justify-center items-center font-display font-semibold bg-blue-800 dark:bg-blue-500 text-zinc-200 dark:text-zinc-800 h-10 w-40 cursor-pointer rounded-lg transition text-sm border border-zinc-700 active:scale-95 hover:bg-zinc-200 hover:dark:bg-zinc-800 hover:text-zinc-800 hover:dark:text-zinc-200 focus:outline-2 focus:outline-offset-0 focus:outline-blue-500 disabled:cursor-not-allowed disabled:active:scale-100"
            onClick={onLogout}
            disabled={loading}
          >
            {loading ? (
              <Quantum size={24} color="currentColor" />
            ) : (
              <p className="text-sm">Update Profile</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePopup;
