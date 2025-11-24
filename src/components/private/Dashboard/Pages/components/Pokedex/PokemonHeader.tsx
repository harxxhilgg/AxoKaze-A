import {
  typeColors,
  type ExtendedPokemonDetails,
  type PokemonType,
} from "../../../../../../types";

interface PokemonHeaderProps {
  selectedPokemon: ExtendedPokemonDetails;
}

const PokemonHeader: React.FC<PokemonHeaderProps> = ({ selectedPokemon }) => {
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
              className={`px-4 py-2 rounded-full text-white font-display font-semibold capitalize ${typeColors[type.type.name]?.badge || "bg-gray-500"} shadow-lg`}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="flex justify-center">
          <img
            src={
              selectedPokemon.sprites.other["official-artwork"].front_default ||
              selectedPokemon.sprites.front_default
            }
            alt={selectedPokemon.name}
            className="w-64 h-64 object-contain drop-shadow-2xl z-10 relative"
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonHeader;
