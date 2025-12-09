import { type ExtendedPokemonDetails } from "../../../../../../types";

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

  const getStatColor = (statValue: number) => {
    if (statValue >= 180) return "bg-gradient-to-r from-pink-500 to-rose-500"; // Mythical
    if (statValue >= 150)
      return "bg-gradient-to-r from-purple-500 to-violet-600"; // Legendary
    if (statValue >= 130)
      return "bg-gradient-to-r from-emerald-500 to-green-600"; // Exceptional
    if (statValue >= 110) return "bg-gradient-to-r from-blue-500 to-cyan-500"; // Excellent
    if (statValue >= 90) return "bg-gradient-to-r from-teal-500 to-blue-500"; // Great
    if (statValue >= 70) return "bg-gradient-to-r from-yellow-500 to-amber-500"; // Good
    if (statValue >= 50)
      return "bg-gradient-to-r from-orange-500 to-yellow-500"; // Average
    if (statValue >= 30) return "bg-gradient-to-r from-red-500 to-orange-500"; // Below Average
    return "bg-gradient-to-r from-red-700 to-red-500"; // Poor
  };

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
                className={`h-3 rounded-full transition-all duration-1000 ${getStatColor(stat.base_stat)}`}
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
