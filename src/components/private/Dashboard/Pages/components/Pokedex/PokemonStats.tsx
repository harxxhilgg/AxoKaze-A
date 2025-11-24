import {
  typeColors,
  type ExtendedPokemonDetails,
  type PokemonType,
} from "../../../../../../types";

interface PokemonStatsProps {
  selectedPokemon: ExtendedPokemonDetails;
}

const PokemonStats: React.FC<PokemonStatsProps> = ({ selectedPokemon }) => {
  const getStatDisplayName = (statName: string) => {
    const statNames: Record<string, string> = {
      hp: "HP",
      attack: "Attack",
      defense: "Defense",
      "special-attack": "Sp. Attack",
      "special-defense": "Sp. Defense",
      speed: "Speed",
    };
    return statNames[statName] || statName;
  };

  const getPrimaryType = (types: PokemonType[]) => {
    return types[0]?.type.name || "normal";
  };

  const primaryType = getPrimaryType(selectedPokemon.types);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-200 dark:border-zinc-700">
      <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-6">
        Stats
      </h3>
      <div className="space-y-4">
        {selectedPokemon.stats.map((stat) => (
          <div key={stat.stat.name}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-display font-medium text-zinc-600 dark:text-zinc-400">
                {getStatDisplayName(stat.stat.name)}
              </span>
              <span className="font-display font-bold text-zinc-900 dark:text-zinc-100">
                {stat.base_stat}
              </span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${typeColors[primaryType]?.badge || "bg-gray-500"}`}
                style={{
                  width: `${Math.min((stat.base_stat / 200) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStats;
