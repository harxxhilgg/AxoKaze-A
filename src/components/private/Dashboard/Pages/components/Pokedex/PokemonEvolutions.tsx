import { ChevronRight } from "lucide-react";
import type { EvolutionChainItem } from "../../../../../../types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface PokemonEvolutionsProps {
  evolutionChain: EvolutionChainItem[];
  isLoadingEvolutions: boolean;
}

const PokemonEvolutions: React.FC<PokemonEvolutionsProps> = ({
  evolutionChain,
  isLoadingEvolutions,
}) => {
  if (evolutionChain.length <= 1 && !isLoadingEvolutions) return null;

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-200 dark:border-zinc-700">
      <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-6">
        Evolutions
      </h3>
      {isLoadingEvolutions ? (
        <div className="flex justify-center items-center gap-6 flex-wrap">
          <SkeletonTheme
            baseColor="rgba(156, 163, 175, 0.1)"
            highlightColor="rgba(209, 213, 219, 0.1)"
            direction="ltr"
          >
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
          </SkeletonTheme>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-6 flex-wrap">
          {evolutionChain.map((evolution, index) => (
            <div key={evolution.name} className="flex items-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-700 rounded-xl flex items-center justify-center mb-3 border border-zinc-200 dark:border-zinc-600">
                  <img
                    src={evolution.image}
                    alt={evolution.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="font-display font-semibold text-zinc-900 dark:text-zinc-100 text-sm capitalize">
                  {evolution.name}
                </p>
                <p className="font-display font-medium text-zinc-500 dark:text-zinc-400 text-xs">
                  #{evolution.id.padStart(3, "0")}
                </p>
              </div>
              {index < evolutionChain.length - 1 && (
                <div className="flex items-center ml-7">
                  <ChevronRight className="w-8 h-8 text-zinc-400 dark:text-zinc-500 mb-10" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonEvolutions;
