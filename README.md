# VoltaFull Monorepo

This repository contains the React client and the Express/Node server for the VoltaFull project. Both live in a single monorepo managed with npm workspaces.

## Prerequisites

- Node.js 18.x (see `.nvmrc` for the exact version)

## Setup



Install all dependencies, run the test suite, and launch the dev environment:

```bash
npm install
npm test
npm run dev
```

### Client environment variables

The client now relies on MongoDB only and no QuickBase token is needed.

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

Run all unit tests for both projects with:

```bash
npm test
```

This command runs Jest across the `client` and `server` workspaces. To test a
single project only, use the `--selectProjects` option:

```bash
npx jest --selectProjects=client
npx jest --selectProjects=server
```
