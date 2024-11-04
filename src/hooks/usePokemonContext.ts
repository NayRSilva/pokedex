// hooks/usePokemonContext.ts
import { useContext } from 'react';
import PokemonContext from '../context/PokemonContext';

const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};

export default usePokemonContext;
