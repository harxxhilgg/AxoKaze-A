import { useState } from "react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import type { BasicPokemon } from "../../../../../../types";

interface SearchDropdownProps {
  showDropdown: boolean;
  filteredPokemon: BasicPokemon[];
  highlightedIndex: number;
  searchTerm: string;
  dropdownRef: React.RefObject<HTMLDivElement>;
  setItemRef: (index: number) => (el: HTMLDivElement | null) => void;
  selectPokemon: (pokemon: BasicPokemon) => void;
  highlightSearchTerm: (name: string, searchTerm: string) => React.ReactNode;
}

const SearchResultItem = ({
  pokemon,
  pokemonId,
  isHighlighted,
  isLast,
  searchTerm,
  onClick,
  highlightSearchTerm,
  itemRef,
}: {
  pokemon: BasicPokemon;
  pokemonId: string;
  isHighlighted: boolean;
  isLast: boolean;
  searchTerm: string;
  onClick: () => void;
  highlightSearchTerm: (name: string, searchTerm: string) => React.ReactNode;
  itemRef: (el: HTMLDivElement | null) => void;
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <div
      ref={itemRef}
      onClick={onClick}
      className={`
        flex items-center px-4 py-3 cursor-pointer transition-colors
        ${isHighlighted ? "bg-blue-50 dark:bg-blue-900/25" : "hover:bg-blue-50/50 dark:hover:bg-blue-900/10"}
        ${isLast ? "" : "border-b border-zinc-100 dark:border-zinc-700"}
      `}
    >
      <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center mr-3 overflow-hidden relative">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Ring size={16} stroke={2} color="currentColor" />
          </div>
        )}

        <img
          src={pokemonImageUrl}
          alt={pokemon.name}
          className={`w-8 h-8 object-contain transition-opacity duration-200 ${imageLoading ? "opacity-0" : "opacity-100"}`}
          onLoad={async () => {
            // await new Promise((resolve) => setTimeout(resolve, 99999)); // test only
            setImageLoading(false);
          }}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
          }}
          style={{ display: imageError ? "none" : "block" }}
        />

        {imageError && (
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {pokemon.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <span className="text-zinc-900 dark:text-zinc-100 capitalize">
        {highlightSearchTerm(pokemon.name, searchTerm)}
      </span>
    </div>
  );
};

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  showDropdown,
  filteredPokemon,
  highlightedIndex,
  searchTerm,
  dropdownRef,
  setItemRef,
  selectPokemon,
  highlightSearchTerm,
}) => {
  if (!showDropdown) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg max-h-100 overflow-y-auto font-display"
    >
      {filteredPokemon.map((pokemon, index) => {
        const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];

        return (
          <SearchResultItem
            key={pokemon.name}
            pokemon={pokemon}
            pokemonId={pokemonId}
            isHighlighted={index === highlightedIndex}
            isLast={index === filteredPokemon.length - 1}
            searchTerm={searchTerm}
            onClick={() => selectPokemon(pokemon)}
            highlightSearchTerm={highlightSearchTerm}
            itemRef={setItemRef(index)}
          />
        );
      })}
    </div>
  );
};

export default SearchDropdown;
