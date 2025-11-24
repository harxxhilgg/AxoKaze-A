import PokemonAbilityBadge from "./PokemonAbilityBadge";
import type { ExtendedPokemonDetails } from "../../../../../../types";

interface PokemonAboutProps {
  selectedPokemon: ExtendedPokemonDetails;
}

const PokemonAbout: React.FC<PokemonAboutProps> = ({ selectedPokemon }) => {
  // Convert height to feet and inches
  const formatHeight = (heightInDecimeters: number) => {
    const heightInCm = heightInDecimeters;
    const heightInInches = heightInCm / 2.54;
    const feet = Math.floor(heightInInches / 12);
    const inches = Math.round(heightInInches % 12);
    return `${feet}'${inches}" (${(heightInDecimeters / 10).toFixed(1)} m)`;
  };

  // Convert weight to pounds
  const formatWeight = (weightInHectograms: number) => {
    const weightInKg = weightInHectograms / 10;
    const weightInLbs = weightInKg * 2.20462;
    return `${weightInLbs.toFixed(1)} lbs (${weightInKg.toFixed(1)} kg)`;
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-200 dark:border-zinc-700">
      <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-6">
        About
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-display font-medium text-zinc-600 dark:text-zinc-400">
            Height
          </span>
          <span className="font-display font-semibold text-zinc-900 dark:text-zinc-100">
            {formatHeight(selectedPokemon.height)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-display font-medium text-zinc-600 dark:text-zinc-400">
            Weight
          </span>
          <span className="font-display font-semibold text-zinc-900 dark:text-zinc-100">
            {formatWeight(selectedPokemon.weight)}
          </span>
        </div>
        <div>
          <span className="font-display font-medium text-zinc-600 dark:text-zinc-400 block mb-3">
            Abilities
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedPokemon.abilities.map((ability, index) => (
              <PokemonAbilityBadge
                key={index}
                abilityName={ability.ability.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonAbout;
