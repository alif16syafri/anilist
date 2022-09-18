# Anime List App

Demo: https://anime-explorer-drab.vercel.app/

## Getting Started

### Prequisites
- Node
- NPM

### Start Development

```
npm install
npm start
```

### Build & Start in Production Mode

```
npm run build
serve -s build
```

## Project Features

### Routes Available

- `/animes`: Show the list of animes with paginated features
- `/anime/:id`: Show the selected anime information. Have a feature to add the anime into a new collecion.
- `/collections`: Show the list of collections with editable & deletable features
- `/collection/:id`: Show the list of animes in a collection with editable & deletable features
