export interface BasicPokemon {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface ExtendedPokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  species: {
    url: string;
  };
}

export interface EvolutionChainItem {
  name: string;
  id: string;
  image: string;
}

export interface EvolutionChainData {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainData[];
}

// pokemon type colors for theming (darker, more subtle)
export const typeColors: Record<
  string,
  { glow: string; glowDark: string; badge: string; border: string }
> = {
  fire: {
    glow: "from-orange-500/40 via-red-500/30 to-orange-600/40",
    glowDark: "from-orange-700/30 via-red-700/20 to-orange-800/30",
    badge: "bg-orange-500",
    border: "border-orange-100",
  },
  water: {
    glow: "from-blue-500/40 via-cyan-500/30 to-blue-600/40",
    glowDark: "from-blue-700/30 via-cyan-700/20 to-blue-800/30",
    badge: "bg-blue-500",
    border: "border-blue-100",
  },
  grass: {
    glow: "from-green-500/40 via-emerald-500/30 to-green-600/40",
    glowDark: "from-green-700/30 via-emerald-700/20 to-green-800/30",
    badge: "bg-green-500",
    border: "border-green-100",
  },
  electric: {
    glow: "from-yellow-500/40 via-amber-500/30 to-yellow-600/40",
    glowDark: "from-yellow-700/30 via-amber-700/20 to-yellow-800/30",
    badge: "bg-yellow-500",
    border: "border-yellow-100",
  },
  psychic: {
    glow: "from-pink-500/40 via-purple-500/30 to-pink-600/40",
    glowDark: "from-pink-700/30 via-purple-700/20 to-pink-800/30",
    badge: "bg-pink-500",
    border: "border-pink-100",
  },
  ice: {
    glow: "from-cyan-400/40 via-blue-400/30 to-cyan-500/40",
    glowDark: "from-cyan-600/30 via-blue-600/20 to-cyan-700/30",
    badge: "bg-cyan-400",
    border: "border-cyan-100",
  },
  dragon: {
    glow: "from-purple-600/40 via-indigo-600/30 to-purple-700/40",
    glowDark: "from-purple-800/30 via-indigo-800/20 to-purple-900/30",
    badge: "bg-purple-600",
    border: "border-purple-100",
  },
  fairy: {
    glow: "from-pink-400/40 via-rose-400/30 to-pink-500/40",
    glowDark: "from-pink-600/30 via-rose-600/20 to-pink-700/30",
    badge: "bg-pink-400",
    border: "border-pink-100",
  },
  fighting: {
    glow: "from-red-600/40 via-orange-600/30 to-red-700/40",
    glowDark: "from-red-800/30 via-orange-800/20 to-red-900/30",
    badge: "bg-red-600",
    border: "border-orange-100",
  },
  poison: {
    glow: "from-purple-500/40 via-pink-500/30 to-purple-600/40",
    glowDark: "from-purple-700/30 via-pink-700/20 to-purple-800/30",
    badge: "bg-purple-500",
    border: "border-purple-100",
  },
  ground: {
    glow: "from-yellow-700/40 via-orange-600/30 to-yellow-800/40",
    glowDark: "from-yellow-900/30 via-orange-800/20 to-yellow-900/30",
    badge: "bg-yellow-700",
    border: "border-yellow-100",
  },
  flying: {
    glow: "from-indigo-500/40 via-purple-500/30 to-indigo-600/40",
    glowDark: "from-indigo-700/30 via-purple-700/20 to-indigo-800/30",
    badge: "bg-indigo-500",
    border: "border-indigo-100",
  },
  bug: {
    glow: "from-green-600/40 via-lime-600/30 to-green-700/40",
    glowDark: "from-green-800/30 via-lime-800/20 to-green-900/30",
    badge: "bg-green-600",
    border: "border-green-100",
  },
  rock: {
    glow: "from-yellow-800/40 via-stone-600/30 to-yellow-900/40",
    glowDark: "from-yellow-900/30 via-stone-800/20 to-stone-900/30",
    badge: "bg-stone-600",
    border: "border-stone-100",
  },
  ghost: {
    glow: "from-purple-700/40 via-indigo-700/30 to-purple-800/40",
    glowDark: "from-purple-900/30 via-indigo-900/20 to-purple-900/30",
    badge: "bg-purple-700",
    border: "border-purple-100",
  },
  steel: {
    glow: "from-slate-500/40 via-gray-500/30 to-slate-600/40",
    glowDark: "from-slate-700/30 via-gray-700/20 to-slate-800/30",
    badge: "bg-slate-500",
    border: "border-slate-100",
  },
  normal: {
    glow: "from-gray-500/40 via-slate-500/30 to-gray-600/40",
    glowDark: "from-gray-700/30 via-slate-700/20 to-gray-800/30",
    badge: "bg-gray-500",
    border: "border-gray-100",
  },
  dark: {
    glow: "from-gray-800/40 via-slate-800/30 to-gray-900/40",
    glowDark: "from-gray-900/30 via-slate-900/20 to-black/30",
    badge: "bg-gray-800",
    border: "border-gray-150",
  },
};

export interface PokemonStore {
  // state
  allPokemon: BasicPokemon[];
  selectedPokemon: ExtendedPokemonDetails | null;
  evolutionChain: EvolutionChainItem[];
  searchTerm: string;
  isLoadingList: boolean;
  isLoadingDetails: boolean;
  isLoadingEvolutions: boolean;
  hasLoadedOnce: boolean;

  // actions
  fetchAllPokemon: () => Promise<void>;
  fetchPokemonDetails: (pokemonUrl: string) => Promise<void>;
  fetchEvolutionChain: (speciesUrl: string) => Promise<void>;
  setSelectedPokemon: (pokemon: ExtendedPokemonDetails | null) => void;
  setSearchTerm: (term: string) => void;
  clearSelectedPokemon: () => void;
  clearSearch: () => void;
  resetPokemonStore: () => void;
}
