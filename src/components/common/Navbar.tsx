import NavButton from './NavButton';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-amber-500 text-blue-950">
      <h1>Pokémon App</h1>
      <div className="flex gap-2">
        <NavButton path="home" name="Pokemons" />
        <NavButton path="pokedex" name="My Pokedex" />
      </div>
    </nav>
  );
};

export default Navbar;
