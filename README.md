# VoltaFull Monorepo

This repository contains the React client and the Express/Node server for the VoltaFull project. Both live in a single monorepo managed with npm workspaces.

## Prerequisites

- Node.js 18.x (see `.nvmrc` for the exact version)

## Setup



Install all server and client dependencies and launch the dev environment:


```bash
./setup.sh
```

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
```

## Tests

Execute all unit tests for the client and server:

```bash
npm test
```
