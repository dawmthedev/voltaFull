# VoltaFull Monorepo

This repository contains the React client and the Express/Node server for the VoltaFull project. Both live in a single monorepo managed with npm workspaces.

## Prerequisites

- Node.js 18.x (see `.nvmrc` for the exact version)

## Setup



Install all server and client dependencies, run the test suite, and launch the dev environment:


```bash
./setup.sh
```

The script installs dependencies, runs `npm test` to verify everything is working,
and finally launches the development environment.

### Client environment variables

Create a `.env` file inside the `client` folder with your QuickBase token:

```env
REACT_APP_QB_TOKEN=<your-token>
```

This token will be loaded by the React app when interacting with QuickBase.

## Running the applications

### Start the server only

```bash
npm run server
```

### Start the client only

```bash
npm run client
```

To run both together:

```bash
npm run dev
# or simply
npm start
```

## Tests

Execute all unit tests for the client and server:

```bash
npm test
```
