import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ChevronRight } from "lucide-react";

const PokemonSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="rgba(156, 163, 175, 0.1)"
      highlightColor="rgba(209, 213, 219, 0.1)"
      direction="ltr"
    >
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="relative text-center py-8">
          <Skeleton width={250} height={48} className="mb-2 mx-auto" />
          <Skeleton width={100} height={28} className="mb-6 mx-auto" />

          {/* Type badges skeleton */}
          <div className="flex justify-center gap-3 mb-8">
            <Skeleton width={90} height={36} borderRadius={20} />
            <Skeleton width={90} height={36} borderRadius={20} />
          </div>

          {/* Pokemon image skeleton */}
          <div className="flex justify-center">
            <Skeleton width={256} height={256} borderRadius={20} />
          </div>
        </div>

        {/* About and Stats Grid Skeleton */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* About Section Skeleton */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-200 dark:border-zinc-700">
            <Skeleton width={80} height={24} className="mb-6" />
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton width={60} height={20} />
                  <Skeleton width={120} height={20} />
                </div>
              ))}
              <div>
                <Skeleton width={80} height={20} className="mb-3" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton width={100} height={32} borderRadius={8} />
                  <Skeleton width={100} height={32} borderRadius={8} />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section Skeleton */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-200 dark:border-zinc-700">
            <Skeleton width={80} height={24} className="mb-6" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton width={90} height={20} />
                    <Skeleton width={40} height={20} />
                  </div>
                  <Skeleton height={12} borderRadius={20} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Evolutions Section Skeleton */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-200 dark:border-zinc-700">
          <Skeleton width={120} height={24} className="mb-6" />
          <div className="flex justify-center items-center gap-6 flex-wrap">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className="text-center">
                  <Skeleton
                    width={80}
                    height={80}
                    borderRadius={12}
                    className="mb-3"
                  />
                  <Skeleton width={80} height={14} className="mb-1" />
                  <Skeleton width={50} height={12} />
                </div>
                {i < 3 && (
                  <div className="flex items-center ml-7">
                    <ChevronRight className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mb-10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default PokemonSkeleton;
