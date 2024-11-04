export interface PokedexPokemon {
  id: number;
  name: string;
  sprite: string;
  height: number;
  weight: number;
  hp: number;
  speed: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  types: string[]; // Array of type names
  dateAdded?: Date;
  note?: string;
}

export interface PokemonForList extends PokedexPokemon {
  caught: boolean;
}
