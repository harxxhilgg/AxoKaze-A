import type { User } from "../../../../types";
import DefaultUser from "../../../../assets/default-user.svg";
// import { UserRoundPen } from "lucide-react";
// import { useUIStore } from "../../../../stores";

interface ProfileProps {
  user: User | null;
}

const Profile = ({ user }: ProfileProps) => {
  // const { setShowUpdateProfilePopup } = useUIStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col bg-white dark:bg-zinc-900 py-4 px-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
        {/* floating edit profile button */}
        {/* <div className="absolute right-7 top-31 group">
          <button
            onClick={() => {
              setShowUpdateProfilePopup(true);
            }}
            className="flex justify-center items-center rounded-lg h-10 w-10 hover:bg-zinc-500 hover:dark:bg-zinc-800 cursor-pointer active:scale-95 transition"
          >
            <UserRoundPen size={24} color="gray" />
          </button>

          <span className="absolute -left-1/2 -translate-x-1/2 mt-3 hidden group-hover:flex items-center justify-center bg-zinc-800 dark:bg-zinc-50 text-white dark:text-zinc-900 px-2 py-2 rounded-lg shadow-lg transition-opacity duration-200 opacity-0 group-hover:opacity-100 whitespace-nowrap">
            <div className="font-display text-sm">
              <p>Update Profile</p>
            </div>
          </span>
        </div> */}

        <h2 className="text-xl font-display font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          User Account
        </h2>

        <div className="space-y-4 font-display">
          <div>
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                className="w-25 rounded-full object-cover"
              />
            ) : (
              <img
                src={DefaultUser}
                alt="Default Avatar"
                className="w-25 rounded-full object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-satoshi text-zinc-600 dark:text-zinc-400 mb-2">
              Name
            </label>
            <p className="text-zinc-900 dark:text-zinc-100">{user?.name}</p>
          </div>

          <div>
            <label className="block text-sm font-satoshi text-zinc-600 dark:text-zinc-400 mb-2">
              Email
            </label>
            <p className="text-zinc-900 dark:text-zinc-100">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
