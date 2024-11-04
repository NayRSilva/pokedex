// tests/PokedexContainer.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock the usePokemonContext hook before importing the component
vi.mock('../hooks/usePokemonContext.ts', () => {
  return {
    __esModule: true,
    default: () => ({
      pokemons: [
        {
          id: 1,
          name: 'Pikachu',
          height: 40,
          dateAdded: new Date('2022-01-01'),
          types: ['electrict'],
        },
        {
          id: 2,
          name: 'Bulbasaur',
          height: 70,
          dateAdded: new Date('2022-01-02'),
          types: ['grass'],
        },
        {
          id: 3,
          name: 'Charmander',
          height: 60,
          dateAdded: new Date('2022-01-03'),
          types: ['fire'],
        },
      ],
      heighTypes: [40, 60, 70], // Make sure this matches the expected structure
    }),
  };
});

// Now import the component after the mock
import PokedexContainer from '../components/Pokedex/PokedexContainer';
import { MemoryRouter } from 'react-router-dom';

describe('PokedexContainer', () => {
  it('filters by name correctly', () => {
    render(
      <MemoryRouter>
        <PokedexContainer />
      </MemoryRouter>
    );

    // Simulate user typing in the name filter
    fireEvent.change(screen.getByPlaceholderText('Filter by name'), {
      target: { value: 'Pika' },
    });

    // Expect only Pikachu to be displayed
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });

  it('filters by type correctly', async () => {
    render(
      <MemoryRouter>
        <PokedexContainer />
      </MemoryRouter>
    );

    // Select the type filter (e.g., for Grass type)
    const heightSelect = screen.getByText('Filter by height');
    fireEvent.mouseDown(heightSelect);

    // Select the height option (e.g., 60 cm)
    const heightOption = await screen.findByText('60 cm');
    fireEvent.click(heightOption);

    // Check that only Bulbasaur is displayed
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
  });

  describe('PokedexContainer', () => {
    it('filters by date added correctly', async () => {
      render(
        <MemoryRouter>
          <PokedexContainer />
        </MemoryRouter>
      );

      // Open the date added filter dropdown
      const dateSelect = screen.getByText('Filter by date added');
      fireEvent.mouseDown(dateSelect);

      const dateOption = await screen.findByText('Sat Jan 01 2022');
      fireEvent.click(dateOption);

      // Check that only Bulbasaur is displayed
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
      expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
    });
  });
});
