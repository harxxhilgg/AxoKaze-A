import type { User } from "../../../../types";

interface OverviewProps {
  user: User | null;
}

const Overview = ({ user }: OverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-satoshi text-zinc-500 dark:text-zinc-400">
            Total Overview
          </h3>
          <p className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 mt-2">
            12
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-satoshi text-zinc-500 dark:text-zinc-400">
            Active Tasks
          </h3>
          <p className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 mt-2">
            24
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-satoshi text-zinc-500 dark:text-zinc-400">
            Team Members
          </h3>
          <p className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 mt-2">
            8
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-satoshi text-zinc-500 dark:text-zinc-400">
            Completion Rate
          </h3>
          <p className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 mt-2">
            87%
          </p>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-display font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Welcome back, {user?.name}! 👋
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 font-satoshi">
          You have 5 new notifications and 3 pending tasks that need your
          attention.
        </p>
      </div>
    </div>
  );
};

export default Overview;
