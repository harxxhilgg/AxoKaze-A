import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WeatherSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="rgba(156, 163, 175, 0.1)"
      highlightColor="rgba(209, 213, 219, 0.1)"
      direction="ltr"
    >
      <div className="space-y-6">
        {/* Main Weather Display Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Skeleton width={96} height={96} borderRadius={12} />
            <div>
              <Skeleton width={150} height={60} className="mb-2" />
              <Skeleton width={120} height={24} />
            </div>
          </div>

          <div className="text-right">
            <Skeleton width={180} height={20} className="mb-2" />
            <Skeleton width={160} height={16} className="mb-1" />
            <Skeleton width={140} height={14} />
          </div>
        </div>

        {/* Weather Details Grid Skeleton - 8 cards */}
        <div className="grid grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <Skeleton width={16} height={16} />
                <Skeleton width={70} height={12} />
              </div>
              <Skeleton width={80} height={20} />
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default WeatherSkeleton;
