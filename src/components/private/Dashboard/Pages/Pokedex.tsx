import { useCallback, useEffect, useRef, useState } from "react";
import { X, Search, ChevronRight } from "lucide-react";
import { usePokemonStore } from "../../../../stores";

interface BasicPokemon {
  name: string;
  url: string;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// Pokemon type colors for theming (darker, more subtle)
const typeColors: Record<
  string,
  { glow: string; glowDark: string; badge: string }
> = {
  fire: {
    glow: "from-orange-500/40 via-red-500/30 to-orange-600/40",
    glowDark: "from-orange-700/30 via-red-700/20 to-orange-800/30",
    badge: "bg-orange-500",
  },
  water: {
    glow: "from-blue-500/40 via-cyan-500/30 to-blue-600/40",
    glowDark: "from-blue-700/30 via-cyan-700/20 to-blue-800/30",
    badge: "bg-blue-500",
  },
  grass: {
    glow: "from-green-500/40 via-emerald-500/30 to-green-600/40",
    glowDark: "from-green-700/30 via-emerald-700/20 to-green-800/30",
    badge: "bg-green-500",
  },
  electric: {
    glow: "from-yellow-500/40 via-amber-500/30 to-yellow-600/40",
    glowDark: "from-yellow-700/30 via-amber-700/20 to-yellow-800/30",
    badge: "bg-yellow-500",
  },
  psychic: {
    glow: "from-pink-500/40 via-purple-500/30 to-pink-600/40",
    glowDark: "from-pink-700/30 via-purple-700/20 to-pink-800/30",
    badge: "bg-pink-500",
  },
  ice: {
    glow: "from-cyan-400/40 via-blue-400/30 to-cyan-500/40",
    glowDark: "from-cyan-600/30 via-blue-600/20 to-cyan-700/30",
    badge: "bg-cyan-400",
  },
  dragon: {
    glow: "from-purple-600/40 via-indigo-600/30 to-purple-700/40",
    glowDark: "from-purple-800/30 via-indigo-800/20 to-purple-900/30",
    badge: "bg-purple-600",
  },
  fairy: {
    glow: "from-pink-400/40 via-rose-400/30 to-pink-500/40",
    glowDark: "from-pink-600/30 via-rose-600/20 to-pink-700/30",
    badge: "bg-pink-400",
  },
  fighting: {
    glow: "from-red-600/40 via-orange-600/30 to-red-700/40",
    glowDark: "from-red-800/30 via-orange-800/20 to-red-900/30",
    badge: "bg-red-600",
  },
  poison: {
    glow: "from-purple-500/40 via-pink-500/30 to-purple-600/40",
    glowDark: "from-purple-700/30 via-pink-700/20 to-purple-800/30",
    badge: "bg-purple-500",
  },
  ground: {
    glow: "from-yellow-700/40 via-orange-600/30 to-yellow-800/40",
    glowDark: "from-yellow-900/30 via-orange-800/20 to-yellow-900/30",
    badge: "bg-yellow-700",
  },
  flying: {
    glow: "from-indigo-500/40 via-purple-500/30 to-indigo-600/40",
    glowDark: "from-indigo-700/30 via-purple-700/20 to-indigo-800/30",
    badge: "bg-indigo-500",
  },
  bug: {
    glow: "from-green-600/40 via-lime-600/30 to-green-700/40",
    glowDark: "from-green-800/30 via-lime-800/20 to-green-900/30",
    badge: "bg-green-600",
  },
  rock: {
    glow: "from-yellow-800/40 via-stone-600/30 to-yellow-900/40",
    glowDark: "from-yellow-900/30 via-stone-800/20 to-stone-900/30",
    badge: "bg-stone-600",
  },
  ghost: {
    glow: "from-purple-700/40 via-indigo-700/30 to-purple-800/40",
    glowDark: "from-purple-900/30 via-indigo-900/20 to-purple-900/30",
    badge: "bg-purple-700",
  },
  steel: {
    glow: "from-slate-500/40 via-gray-500/30 to-slate-600/40",
    glowDark: "from-slate-700/30 via-gray-700/20 to-slate-800/30",
    badge: "bg-slate-500",
  },
  normal: {
    glow: "from-gray-500/40 via-slate-500/30 to-gray-600/40",
    glowDark: "from-gray-700/30 via-slate-700/20 to-gray-800/30",
    badge: "bg-gray-500",
  },
  dark: {
    glow: "from-gray-800/40 via-slate-800/30 to-gray-900/40",
    glowDark: "from-gray-900/30 via-slate-900/20 to-black/30",
    badge: "bg-gray-800",
  },
};

const Pokedex = () => {
  const {
    allPokemon,
    selectedPokemon,
    evolutionChain,
    searchTerm,
    isLoadingList,
    isLoadingDetails,
    isLoadingEvolutions,
    fetchAllPokemon,
    fetchPokemonDetails,
    setSearchTerm,
    clearSearch,
  } = usePokemonStore();

  const [filteredPokemon, setFilteredPokemon] = useState<BasicPokemon[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get primary type for theming
  const getPrimaryType = (types: PokemonType[]) => {
    return types[0]?.type.name || "normal";
  };

  // Stat display names
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

  const filterPokemon = useCallback(
    (term: string) => {
      if (!term.trim()) {
        setFilteredPokemon([]);
        setShowDropdown(false);
        return;
      }

      const filtered = allPokemon
        .filter((pokemon) =>
          pokemon.name.toLowerCase().includes(term.toLowerCase())
        )
        .slice(0, 10); // limit to 10 results for better UX

      setFilteredPokemon(filtered);
      setShowDropdown(filtered.length > 0);
      setHighlightedIndex(-1);
    },
    [allPokemon]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchTerm(value);
    filterPokemon(value);
  };

  const scrollToHighlightedItem = (index: number) => {
    if (index >= 0 && dropdownItemRefs.current[index]) {
      dropdownItemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || filteredPokemon.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const newIndex = prev < filteredPokemon.length - 1 ? prev + 1 : prev;
          scrollToHighlightedItem(newIndex);
          return newIndex;
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const newIndex = prev > 0 ? prev - 1 : -1;
          scrollToHighlightedItem(newIndex);
          return newIndex;
        });
        break;
      case "Enter":
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredPokemon.length
        ) {
          selectPokemon(filteredPokemon[highlightedIndex]);
        }
        break;

      case "Escape":
        setShowDropdown(false);
        setHighlightedIndex(-1);
        searchInputRef.current?.blur();
        break;
    }
  };

  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      dropdownItemRefs.current[index] = el;
    },
    []
  );

  const selectPokemon = (pokemon: BasicPokemon) => {
    setSearchTerm(pokemon.name);
    setShowDropdown(false);
    setHighlightedIndex(-1);
    fetchPokemonDetails(pokemon.url);
  };

  const handleClearSearch = () => {
    clearSearch();
    setShowDropdown(false);
    setHighlightedIndex(-1);
    setFilteredPokemon([]);
  };

  // highlight search term in Pokemon names
  const highlightSearchTerm = (name: string, searchTerm: string) => {
    if (!searchTerm.trim()) {
      return <span className="font-bold">{name}</span>;
    }

    const lowerName = name.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchIndex = lowerName.indexOf(lowerSearchTerm);

    if (matchIndex === -1) {
      return <span className="font-bold">{name}</span>;
    }

    const beforeMatch = name.substring(0, matchIndex);
    const match = name.substring(matchIndex, matchIndex + searchTerm.length);
    const afterMatch = name.substring(matchIndex + searchTerm.length);

    return (
      <>
        <span className="font-bold">{beforeMatch}</span>
        <span className="font-display">{match}</span>
        <span className="font-bold">{afterMatch}</span>
      </>
    );
  };

  // get theme colors based on Pokemon type
  const primaryType = selectedPokemon
    ? getPrimaryType(selectedPokemon.types)
    : "normal";
  const themeColors = typeColors[primaryType];

  useEffect(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* search Section - always visible at top */}
      <div className="relative mb-8">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (searchTerm && filteredPokemon.length > 0) {
                setShowDropdown(true);
              }
            }}
            placeholder="Search for a Pokémon..."
            className={`
              w-full px-4 py-3 pl-12 rounded-lg font-display focus:outline-none focus:ring-2 transition-all
              ${
                selectedPokemon
                  ? "bg-white/90 dark:bg-black/20 text-white dark:text-white border-white/30 focus:ring-white/50 placeholder-white/70"
                  : "bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700 focus:ring-blue-500"
              }
            `}
            disabled={isLoadingList}
          />

          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search
              className={`w-6 h-6 ${selectedPokemon ? "text-white/70" : "text-zinc-400"}`}
            />
          </div>

          {/* clear search button */}
          {selectedPokemon && (
            <button
              onClick={handleClearSearch}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg cursor-pointer transition-colors active:scale-95 ${
                selectedPokemon
                  ? "text-white/70 hover:text-white hover:bg-white/10"
                  : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* search Dropdown */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg max-h-100 overflow-y-auto font-display"
          >
            {filteredPokemon.map((pokemon, index) => {
              const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
              const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

              return (
                <div
                  key={pokemon.name}
                  ref={setItemRef(index)}
                  onClick={() => selectPokemon(pokemon)}
                  className={`
                    flex items-center px-4 py-3 cursor-pointer transition-colors
                    ${
                      index === highlightedIndex
                        ? "bg-blue-50 dark:bg-blue-900/25"
                        : "hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
                    }
                    ${index === filteredPokemon.length - 1 ? "" : "border-b border-zinc-100 dark:border-zinc-700"}
                  `}
                >
                  <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                    <img
                      src={pokemonImageUrl}
                      alt={pokemon.name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        (target.nextElementSibling as HTMLElement)!.style.display =
                          "block";
                      }}
                    />
                    <span
                      className="text-xs font-medium text-zinc-600 dark:text-zinc-300"
                      style={{ display: "none" }}
                    >
                      {pokemon.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-zinc-900 dark:text-zinc-100 capitalize">
                    {highlightSearchTerm(pokemon.name, searchTerm)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pokemon Details - Only show when Pokemon is selected */}
      {isLoadingDetails ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-zinc-600 dark:text-zinc-400 font-display">
              Loading Pokémon...
            </p>
          </div>
        </div>
      ) : selectedPokemon ? (
        <div className="space-y-8">
          {/* Pokemon Header with Glow Effect */}
          <div className="relative">
            {/* Glow Background - Only behind Pokemon */}
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

              {/* Type Badges */}
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

              {/* Large Pokemon Image */}
              <div className="flex justify-center">
                <img
                  src={
                    selectedPokemon.sprites.other["official-artwork"]
                      .front_default || selectedPokemon.sprites.front_default
                  }
                  alt={selectedPokemon.name}
                  className="w-64 h-64 object-contain drop-shadow-2xl z-10 relative"
                />
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* About Section */}
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
                    {(selectedPokemon.height / 10).toFixed(1)} m
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-display font-medium text-zinc-600 dark:text-zinc-400">
                    Weight
                  </span>
                  <span className="font-display font-semibold text-zinc-900 dark:text-zinc-100">
                    {(selectedPokemon.weight / 10).toFixed(1)} kg
                  </span>
                </div>
                <div>
                  <span className="font-display font-medium text-zinc-600 dark:text-zinc-400 block mb-3">
                    Abilities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedPokemon.abilities.map((ability, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 rounded-full font-display font-medium text-zinc-700 dark:text-zinc-300 text-sm capitalize"
                      >
                        {ability.ability.name.replace("-", " ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
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
          </div>

          {/* Evolutions */}
          {evolutionChain.length > 1 && (
            <div className="bg-zinc-50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-200 dark:border-zinc-700">
              <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                Evolutions
              </h3>
              {isLoadingEvolutions ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
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
          )}
        </div>
      ) : !isLoadingList ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Discover Pokémon
          </h3>
          <p className="font-display font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Search for any Pokémon to see detailed information
          </p>
          <p className="font-display text-sm text-zinc-500 dark:text-zinc-500">
            Try "Charizard", "Pikachu", or any Pokémon name
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Pokedex;
