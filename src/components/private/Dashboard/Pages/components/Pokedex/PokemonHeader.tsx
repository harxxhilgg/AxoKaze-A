import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  typeColors,
  type ExtendedPokemonDetails,
  type PokemonType,
} from "../../../../../../types";

interface PokemonHeaderProps {
  selectedPokemon: ExtendedPokemonDetails;
}

const PokemonHeader: React.FC<PokemonHeaderProps> = ({ selectedPokemon }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getPrimaryType = (types: PokemonType[]) => {
    return types[0]?.type.name || "normal";
  };

  const primaryType = getPrimaryType(selectedPokemon.types);
  const themeColors = typeColors[primaryType];

  return (
    <div className="relative">
      <div
        className={`absolute inset-0 rounded-3xl bg-linear-to-br ${themeColors?.glow || "from-blue-400 to-blue-600"} dark:${themeColors?.glowDark || "from-blue-600 to-blue-800"} blur-3xl transform scale-110 opacity-60`}
      ></div>

      <div className="relative text-center py-8">
        <h1 className="text-4xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-2 capitalize">
          {selectedPokemon.name}
        </h1>
        <p className="text-xl font-display font-medium text-zinc-600 dark:text-zinc-400 mb-6">
          #{selectedPokemon.id.toString().padStart(3, "0")}
        </p>

        <div className="flex justify-center gap-3 mb-8">
          {selectedPokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`px-4 py-2 rounded-full text-white font-display font-semibold capitalize shadow-lg ${typeColors[type.type.name]?.badge || "bg-gray-500"} border ${typeColors[type.type.name]?.border || "bg-gray-700"}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="flex justify-center select-none">
          <div className="relative w-64 h-64">
            {/* skeleton loader */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <SkeletonTheme
                  baseColor="rgba(156, 163, 175, 0.1)"
                  highlightColor="rgba(209, 213, 219, 0.1)"
                  direction="ltr"
                  borderRadius={20}
                >
                  <Skeleton height={256} width={256} />
                </SkeletonTheme>
              </div>
            )}

            {/* pokemon image */}
            <img
              src={
                selectedPokemon.sprites.other["official-artwork"]
                  .front_default || selectedPokemon.sprites.front_default
              }
              alt={selectedPokemon.name}
              className={`w-64 h-64 object-contain drop-shadow-2xl z-10 relative transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonHeader;
