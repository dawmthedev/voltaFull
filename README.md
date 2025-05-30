# VoltaFull Monorepo

This repository contains the React client and the Express/Node server for the VoltaFull project. Both live in a single monorepo managed with npm workspaces.

## Prerequisites

- Node.js 18.x (see `.nvmrc` for the exact version)

## Setup



Install all dependencies and launch the dev environment:

```bash
npm install
npm run dev
```

After making changes you can run the full test suite with:

```bash
npm test
```

### Client environment variables

The client now relies on MongoDB only and no QuickBase token is needed.

### Server environment variables

Create a `.env` file in `server` (copy `.env.example`) and provide the
following variables:

- `DATABASE_URL` – MongoDB connection string, e.g.
  `mongodb://<user>:<pass>@host:port/dbname`
- `PORT` – port the API listens on (default `4000`)
- `NODE_ENV` – environment mode (`development` by default)
- `ENCRYPTION_KEY` – secret used for encryption
- `EMAIL` – email account used to send notifications
- `PASSWORD` – password for the above account
- `SUPER_USER_EMAIL` – email granted admin privileges
- `OPENAI_API_KEY` – optional key for AI features
- `REACT_APP_STAGE` – environment stage for the client
- `OPENAI_COMPLETION_URL` – optional OpenAI completion endpoint
- `JWT_SECRET` – secret used to sign JWTs

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
