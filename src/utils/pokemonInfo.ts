import { PokemonStat } from 'pokenode-ts';
import { PokedexPokemon } from '../interfaces';

export const getPokemonStat = (stats: PokemonStat[], name: string) =>
  stats.find((status) => status.stat.name === name)?.base_stat || -1;

export const BASESPRITE =
  'https://bulbapedia.bulbagarden.net/wiki/Poké_Ball_(item)#/media/File:Bag_Poké_Ball_Sprite.png';

export const exportToCSV = (
  pokemonList: PokedexPokemon[],
  fileName: string
) => {
  const headers =
    [
      'id',
      'name',
      'sprite',
      'height',
      'weight',
      'hp',
      'speed',
      'attack',
      'defense',
      'specialAttack',
      'specialDefense',
      'types',
      'dateAdded',
      'note',
    ].join(',') + '\n';

  const rows = pokemonList
    .map((pokemon) => {
      const types = pokemon.types.join(';');
      const dateAdded = pokemon.dateAdded
        ? pokemon.dateAdded.toISOString()
        : '';
      return [
        pokemon.id,
        pokemon.name,
        pokemon.sprite,
        pokemon.height,
        pokemon.weight,
        pokemon.hp,
        pokemon.speed,
        pokemon.attack,
        pokemon.defense,
        pokemon.specialAttack,
        pokemon.specialDefense,
        types,
        dateAdded,
        pokemon.note,
      ].join(',');
    })
    .join('\n');

  // Create the full CSV content
  const csvContent = headers + rows;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link); // Append the link to the body
  link.click(); // Trigger the download
  document.body.removeChild(link); // Clean up the link element
};
