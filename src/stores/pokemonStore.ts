import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  EvolutionChainData,
  EvolutionChainItem,
  PokemonStore,
} from "../types";

// helper function to parse evolution chain
const parseEvolutionChain = (
  chain: EvolutionChainData
): EvolutionChainItem[] => {
  const evolutions: EvolutionChainItem[] = [];
  let current = chain;

  while (current) {
    const pokemonId = current.species.url.split("/").slice(-2, -1)[0];
    evolutions.push({
      name: current.species.name,
      id: pokemonId,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
    });

    current = current.evolves_to[0];
  }

  return evolutions;
};

export const usePokemonStore = create<PokemonStore>()(
  persist(
    (set, get) => ({
      // initial state
      allPokemon: [],
      selectedPokemon: null,
      evolutionChain: [],
      searchTerm: "",
      isLoadingList: false,
      isLoadingDetails: false,
      isLoadingEvolutions: false,
      hasLoadedOnce: false,

      // fetch all pokemon (gloabl caching - runs only once per app session)
      fetchAllPokemon: async () => {
        const { hasLoadedOnce } = get();
        if (hasLoadedOnce) return; // already cached

        set({ isLoadingList: true });

        try {
          const res = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=10000"
          );

          if (!res.ok) {
            throw new Error(`Failed to fetch pokemon list: ${res.status}`);
          }

          const data = await res.json();

          set({
            allPokemon: data.results,
            hasLoadedOnce: true,
            isLoadingList: false,
          });

          // toast.success("Pokemon database loaded!");
        } catch (error) {
          console.log("Error fetching pokemon list: ", error);
          toast.error("Failed to load pokemon database. Please try again.");
          set({ isLoadingList: false });
        }
      },

      fetchPokemonDetails: async (pokemonUrl: string) => {
        set({ isLoadingDetails: true });

        try {
          const res = await fetch(pokemonUrl);

          if (!res.ok) {
            throw new Error(`Failed to fetch pokemon details: ${res.status}`);
          }

          const data = await res.json();

          set({
            selectedPokemon: data,
            searchTerm: data.name,
            isLoadingDetails: false,
          });

          // automatically fetch evolution chain
          get().fetchEvolutionChain(data.species.url);
        } catch (error) {
          console.error("Error fetching pokemon details: ", error);
          toast.error("Failed to load pokemon details. Please try again.");
          set({ isLoadingDetails: false });
        }
      },

      fetchEvolutionChain: async (speciesUrl: string) => {
        set({ isLoadingEvolutions: true });

        try {
          const speciesResponse = await fetch(speciesUrl);
          const speciesData = await speciesResponse.json();

          const evolutionResponse = await fetch(
            speciesData.evolution_chain.url
          );
          const evolutionData = await evolutionResponse.json();

          const evolutions = parseEvolutionChain(evolutionData.chain);
          set({ evolutionChain: evolutions, isLoadingEvolutions: false });
        } catch (error) {
          console.error("Error fetching evolution chain:", error);
          set({ evolutionChain: [], isLoadingEvolutions: false });
        }
      },

      // set selected pokemon
      setSelectedPokemon: (pokemon) => {
        set({ selectedPokemon: pokemon });
      },

      // set search term
      setSearchTerm: (term) => {
        set({ searchTerm: term });
      },

      // clear selected pokemon
      clearSelectedPokemon: () => {
        set({ selectedPokemon: null, evolutionChain: [] });
      },

      // clear search and reset to initial state
      clearSearch: () => {
        set({
          selectedPokemon: null,
          evolutionChain: [],
          searchTerm: "",
        });
      },

      resetPokemonStore: () => {
        set({
          allPokemon: [],
          selectedPokemon: null,
          evolutionChain: [],
          searchTerm: "",
          isLoadingList: false,
          isLoadingDetails: false,
          isLoadingEvolutions: false,
          hasLoadedOnce: false,
        });
      },
    }),
    {
      name: "pokemon-store",
      partialize: (state) => ({
        selectedPokemon: state.selectedPokemon,
        evolutionChain: state.evolutionChain,
        searchTerm: state.searchTerm,
      }),
    }
  )
);
