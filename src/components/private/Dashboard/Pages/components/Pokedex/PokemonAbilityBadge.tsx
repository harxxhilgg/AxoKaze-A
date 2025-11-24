interface PokemonAbilityBadgeProps {
  abilityName: string;
}

const PokemonAbilityBadge: React.FC<PokemonAbilityBadgeProps> = ({
  abilityName,
}) => {
  const getAbilityColor = (abilityName: string) => {
    const abilityColors: Record<string, string> = {
      static:
        "bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700/40",
      "lightning-rod":
        "bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700/40",
      overgrow:
        "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700/40",
      blaze:
        "bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700/40",
      torrent:
        "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700/40",
      swarm:
        "bg-gradient-to-r from-green-100 to-lime-100 dark:from-green-900/20 dark:to-lime-900/20 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700/40",
      "keen-eye":
        "bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700/40",
      intimidate:
        "bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700/40",
      "cute-charm":
        "bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 text-pink-800 dark:text-pink-200 border border-pink-300 dark:border-pink-700/40",
      synchronize:
        "bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-700/40",
      "inner-focus":
        "bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-900/20 dark:to-gray-900/20 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/40",
      pressure:
        "bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/20 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700/40",
      "flash-fire":
        "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 text-orange-800 dark:text-orange-200 border border-orange-300 dark:border-orange-700/40",
      "water-absorb":
        "bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/20 dark:to-teal-900/20 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700/40",
      "volt-absorb":
        "bg-gradient-to-r from-yellow-100 to-lime-100 dark:from-yellow-900/20 dark:to-lime-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700/40",
      levitate:
        "bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-700/40",
      guts: "bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 text-orange-800 dark:text-orange-200 border border-orange-300 dark:border-orange-700/40",
      "natural-cure":
        "bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700/40",
      "serene-grace":
        "bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 text-pink-800 dark:text-pink-200 border border-pink-300 dark:border-pink-700/40",
      "poison-point":
        "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-700/40",
      rivalry:
        "bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700/40",
      "clear-body":
        "bg-gradient-to-r from-slate-100 to-blue-100 dark:from-slate-900/20 dark:to-blue-900/20 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/40",
      "light-metal":
        "bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/20 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700/40",
      "solar-power":
        "bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700/40",
    };

    return (
      abilityColors[abilityName] ||
      "bg-gradient-to-r from-zinc-100 to-gray-100 dark:from-zinc-900/20 dark:to-gray-900/20 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700/40"
    );
  };

  return (
    <span
      className={`px-3 py-1 rounded-full font-display font-medium text-sm capitalize ${getAbilityColor(abilityName)}`}
    >
      {abilityName.replace("-", " ")}
    </span>
  );
};

export default PokemonAbilityBadge;
