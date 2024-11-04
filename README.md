# Initial thoughts on the project

## Pokedex

The actual caught pokemons in the pokedex will be stored

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

# Requirements

As a Pokémon Trainer I want to:

See all Pokémons that can be caught with their respective names and pictures

- Yes,limited to the first 150 as they are the best

- Which one of these were already caught by me
  (Indicator in both Table and Grid views as well as the Pokedex page)

- See all Pokémons that I've caught and thus added to my Pokédex
  Pokedex Page

- See the most important details of each Pokémon (caught and uncaught):
  (Available in Table View and Details View)
- Height, Weight, Health (HP), Speed, Attack, Defense, Special Attack, Special Defense and its types Done
- Details View (Done)
- When the Pokémon was first added to the Pokédex (done)

- Share any Pokémon with my fellow trainer colleagues, especially the ones already caught (Done, any pokemon can be acessed on the url pokemon/namepokemon (offline version only supports saved pokemons))

- Have access to my Pokédex with limited internet connectivy or none at all (Pokedex saved with IndexedDB in a PWA with vite-pwa)

- Have a quick overview of my progress within the Pokédex Done, can be improved

Manage my Pokédex according to my taste and needs: DONE
-Filter and Sort Pokémons by Name, Height Types and Timestamp Pending

- Remove one or multiple Pokémons at once
  Available in table view (one by one)
  Available in grid view (one by one and selection)
  Add selection on table View (NOT DONE)
  Attach a free-text Note to each Pokémon (only on Pokemon that were caught) (TODO: Add editing of the note)

- Alternate between different view modes: DONE Table and Grid
  An analytical view (e.g table) is mandatory but surely it's not the best option when the only nearby device at my disposal is my phone

- Test Coverage (BAD): Only component covered by test coverage is PokedexContainer, Shall add more tests

- Export all Pokémons from the Pokédex to CSV Done

# TODO:

- Add pagination
- Add lazy loading of images so they only appear when I am seeing them
- Make it pretty
- Add more tests

# How To Run

- npm install

- To run with possible offline version please build and then run serve :
  npm run build
  npm run serve
  (Please note that the port is set with the cross-env library because this was created on a Windows machine)
- to run locally and apply modifications npm run dev

Send messages for inquiries (PWA offline might no be completely functional)
