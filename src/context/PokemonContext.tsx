// PokemonContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { openDB, IDBPDatabase } from 'idb';
import { PokedexPokemon, PokemonForList } from '../interfaces';

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

interface PokemonProviderProps {
  children: ReactNode;
}


export interface PokemonContextType {
  pokemons: PokedexPokemon[];
  addPokemon: (pokemonDetails: PokedexPokemon) => void;
  removePokemon: (pokemonId: number) => void;
  heighTypes:number[],
    timestampList:Date[],
    findCatchedPokemonById:(id:number)=>PokedexPokemon|undefined,
    removePokemonsById: (pokemonIds:number[])=>void,
    addNote:(newPokemon:PokedexPokemon)=>void,
    handleModifyPokedex:(
      isPokemonAdded: boolean,
      id: number,
      pokemonList: PokemonForList[]
    )=>void

}


// Function to initialize the database and return the `db` instance
async function initDB(): Promise<IDBPDatabase> {
  return openDB('PokemonDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('pokemons')) {
        db.createObjectStore('pokemons', { keyPath: 'id' });
      }
    },
  });
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [pokemons, setPokemons] = useState<PokedexPokemon[]>([]);
  const [heighTypes, setHeighTypes] = useState<number[]>([])
  const [timestampList, setTimestampList]=useState<Date[]>([])

  useEffect(() => {
    initDB()
      .then((db) => db.getAll('pokemons'))
      .then((allPokemons) => setPokemons(allPokemons as PokedexPokemon[]))
      .catch((error) => console.error('Failed to load pokemons:', error));
  }, []);

  useEffect(()=>{
    const differentHeights = new Set(pokemons.map(pokemon => pokemon.height))
    const timeStamp = new Set(pokemons.map(pokemon => pokemon.dateAdded).filter(date => !!date))
    setHeighTypes(Array.from(differentHeights))
    setTimestampList(Array.from(timeStamp))

  },[pokemons])

  const addPokemon = async (pokemonDetails: PokedexPokemon) => {
    // Ensure `pokemonDetails` is shaped correctly to match `CatchedPokemon`
    const newPokemon: PokedexPokemon = {
      id: pokemonDetails.id,
      name: pokemonDetails.name,
      sprite: pokemonDetails.sprite,
      height: pokemonDetails.height,
      weight: pokemonDetails.weight,
      hp: pokemonDetails.hp,
      speed: pokemonDetails.speed,
      attack: pokemonDetails.attack,
      defense: pokemonDetails.defense,
      specialAttack: pokemonDetails.specialAttack,
      specialDefense: pokemonDetails.specialDefense,
      types: pokemonDetails.types,
      dateAdded: new Date()

    };

    try {
      const db = await openDB("PokemonDB",1);
      await db.put('pokemons', newPokemon);
      setPokemons((prevPokemons) => [...prevPokemons, newPokemon]);
    } catch (error) {
      console.error('Failed to add pokemon:', error);
    }
  };
  
  const removePokemon = async (pokemonId: number) => {
    try {
      const db = await openDB('PokemonDB', 1);
      await db.delete('pokemons', pokemonId); 
      setPokemons((prevPokemons) => prevPokemons.filter(pokemon => pokemon.id !== pokemonId)); 
      console.log(`Pokemon with ID ${pokemonId} has been deleted successfully.`);
    } catch (error) {
      console.error('Failed to delete pokemon:', error);
    }
  };

  const removePokemonsById = async (pokemonIds: number[]) => {
    try {
      const db = await openDB('PokemonDB', 1);

      const deletePokemons = pokemonIds.map( id => db.delete("pokemons", id))
      Promise.all(deletePokemons)
      .then(()=>{
        setPokemons((prevPokemons) => prevPokemons.filter(pokemon => !pokemonIds.includes(pokemon.id))); 
        console.log(`Pokemons with IDs ${pokemonIds.join()} has been deleted successfully.`);



      })
    } catch (error) {
      console.error('Failed to delete pokemons:', error);
    }
  };

  const addNote=async (newPokemon:PokedexPokemon)=>{

    try{
      const db = await openDB("PokemonDB", 1)
      await db.put('pokemons', newPokemon);
      const updatedPokemons = await db.getAll("pokemons")
      setPokemons(updatedPokemons as PokedexPokemon[])


    }catch{
      console.error(`Could not add note to:${newPokemon.id}`)
    }

  }

  
  const findCatchedPokemonById = (id:number)=> pokemons.find((pokemon)=> pokemon.id===id)
  const handleModifyPokedex = (
    isPokemonAdded: boolean,
    id: number,
    pokemonList: PokemonForList[]
  ) => {

    const pokemon = pokemonList.find((pokemon) => pokemon.id === id);
    if (isPokemonAdded && pokemon) {
      removePokemon(pokemon.id);
      return;
    }
  
    if (pokemon) {
      console.log('adding pokemon: ', pokemon);
      addPokemon(pokemon);
    }
  };
  
  const contextValue = {
    pokemons,
    heighTypes,
    timestampList,
    addPokemon,
    findCatchedPokemonById,
    removePokemon,
    removePokemonsById,
    addNote,
    handleModifyPokedex

  };


  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
