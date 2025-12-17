import { useCallback, useEffect, useRef, useState } from "react";
import { X, Search } from "lucide-react";
import { usePokemonStore } from "../../../../stores";
import SearchDropdown from "./components/Pokedex/PokemonSearchDropdown";
import PokemonHeader from "./components/Pokedex/PokemonHeader";
import PokemonAbout from "./components/Pokedex/PokemonAbout";
import PokemonStats from "./components/Pokedex/PokemonStats";
import PokemonEvolutions from "./components/Pokedex/PokemonEvolutions";
import PokemonSkeleton from "./components/Pokedex/PokemonSkeleton";
import { type BasicPokemon } from "../../../../types";

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
  const dropdownRef = useRef<HTMLDivElement>(null!);
  const dropdownItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

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
        .slice(0, 10);

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
    switch (e.key) {
      case "ArrowDown":
        if (!showDropdown || filteredPokemon.length === 0) return;
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const newIndex = prev < filteredPokemon.length - 1 ? prev + 1 : prev;
          scrollToHighlightedItem(newIndex);
          return newIndex;
        });
        break;

      case "ArrowUp":
        if (!showDropdown || filteredPokemon.length === 0) return;
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const newIndex = prev > 0 ? prev - 1 : -1;
          scrollToHighlightedItem(newIndex);
          return newIndex;
        });
        break;

      case "Enter":
        if (!showDropdown || filteredPokemon.length === 0) return;
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredPokemon.length
        ) {
          selectPokemon(filteredPokemon[highlightedIndex]);
        }
        break;

      case "Escape":
        e.preventDefault();
        setShowDropdown(false);
        setHighlightedIndex(-1);
        searchInputRef.current?.blur();
        break;
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Check if the blur is caused by clicking on dropdown
    const relatedTarget = e.relatedTarget as HTMLElement;
    const dropdown = dropdownRef.current;

    // If clicking inside dropdown, don't hide it
    if (dropdown && dropdown.contains(relatedTarget)) {
      return;
    }

    // Small delay to allow click events on dropdown items to fire first
    setTimeout(() => {
      setShowDropdown(false);
      setHighlightedIndex(-1);
    }, 200);
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

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* search Section */}
      <div className="relative mb-8">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onBlur={handleInputBlur}
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

        <SearchDropdown
          showDropdown={showDropdown}
          filteredPokemon={filteredPokemon}
          highlightedIndex={highlightedIndex}
          searchTerm={searchTerm}
          dropdownRef={dropdownRef}
          setItemRef={setItemRef}
          selectPokemon={selectPokemon}
          highlightSearchTerm={highlightSearchTerm}
        />
      </div>

      {/* pokemon Details */}
      {isLoadingDetails ? (
        <PokemonSkeleton />
      ) : selectedPokemon ? (
        <div className="space-y-8">
          <PokemonHeader selectedPokemon={selectedPokemon} />

          <div className="grid lg:grid-cols-2 gap-8">
            <PokemonAbout selectedPokemon={selectedPokemon} />
            <PokemonStats selectedPokemon={selectedPokemon} />
          </div>

          <PokemonEvolutions
            evolutionChain={evolutionChain}
            isLoadingEvolutions={isLoadingEvolutions}
          />
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
