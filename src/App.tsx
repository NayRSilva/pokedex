import './App.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Root from './routes/Root';
import { PokemonProvider } from './context/PokemonContext';
import PokemonDetailsContainer from './pages/PokemonDetailsContainer';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import Pokemons from './pages/Pokemons';
import Pokedex from './pages/Pokedex';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />, // Root layout, rendering child routes
      children: [
        {
          index: true,
          element: <Navigate replace to="/home" />,
        },
        {
          path: '/home',
          element: <Pokemons />, // Show list of Pokémon
        },
        {
          path: '/pokedex',
          element: <Pokedex />,
        },
        {
          path: '/pokemon/:name',
          element: <PokemonDetailsContainer />, // Pokémon details page
        },
      ],
    },
  ]);

  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }: FallbackProps) => (
              <div>
                There was an error!
                <button onClick={resetErrorBoundary}>Try again</button>{' '}
                {/* Use `button` if `Button` is not imported */}
              </div>
            )}
          >
            <PokemonProvider>
              <RouterProvider router={router} />
            </PokemonProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
}

export default App;
