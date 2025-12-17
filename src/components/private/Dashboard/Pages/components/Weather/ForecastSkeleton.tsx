import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ForecastSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="rgba(156, 163, 175, 0.1)"
      highlightColor="rgba(209, 213, 219, 0.1)"
      direction="ltr"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Forecast Skeleton - 1 column */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <Skeleton width={150} height={24} className="mb-4" />
          <div className="space-y-3">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Skeleton width={20} height={20} />
                  <Skeleton width={100} height={16} />
                </div>
                <div className="flex items-center gap-4 flex-1 justify-end">
                  <Skeleton width={30} height={16} />
                  <Skeleton width={96} height={6} borderRadius={3} />
                  <Skeleton width={30} height={16} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Skeleton - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Temperature Chart Skeleton */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <Skeleton width={180} height={24} className="mb-2" />
            <Skeleton width={120} height={16} className="mb-4" />
            <Skeleton height={200} borderRadius={12} />
          </div>

          {/* Precipitation Chart Skeleton */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <Skeleton width={180} height={24} className="mb-2" />
            <Skeleton width={120} height={16} className="mb-4" />
            <Skeleton height={200} borderRadius={12} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ForecastSkeleton;
