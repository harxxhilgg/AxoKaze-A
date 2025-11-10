import type { User } from "../../../../types";

interface SettingsProps {
  user: User | null;
}

const Settings = ({ user }: SettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-display font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Account Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-satoshi text-zinc-600 dark:text-zinc-400 mb-2">
              User ID
            </label>
            <p className="text-zinc-900 dark:text-zinc-100">{user?.id}</p>
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

export default Settings;
