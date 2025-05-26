# AGENTS.md - Volta CRM Guidelines

This file defines instructions for Codex and contributors working on the Volta CRM monorepo. Follow these guidelines to ensure smooth collaboration and consistent quality.

## Vision

Volta CRM aims to be a scalable multi-role SaaS solution. Development should proceed through small, modular iterations with a focus on a thoughtful user experience. The UI uses a sand-toned color scheme with strong contrast and avoids unnecessary bloat.

## Environment Setup

1. Use **Node.js 18.x**. The exact version is specified in the `volta` block of `package.json`.
2. Run `./setup.sh` to install dependencies for all workspaces. This script does **not** run tests.
3. Start development:
   ```bash
   npm run dev      # run client and server together
   npm run server   # run only the server
   npm run client   # run only the client
   ```
4. Configure environment variables such as `DATABASE_URL` using `server/.env.example`.

## Project Structure

- **client/** – React frontend using Chakra UI and Tailwind CSS.
- **server/** – Ts.ED backend with MongoDB.
- **tests/** – Shared Jest tests for client and server.
- **package.json** – Workspace configuration that ties the projects together.

## Task Guidelines for Codex

- Break tasks into **1–5 file changes** to limit merge conflicts.
- Explore related files for context before editing.
- Follow camelCase naming for variables and functions.
- Commit messages must follow: `[VOLTA] <message>`.
- Title pull requests as: `[VOLTA] <descriptive title>`.
- Provide environment setup and test commands in responses.
- Write or update tests alongside any code changes.

## Testing Workflow

1. Run the full suite:
   ```bash
   npm test
   ```
2. Run specific projects:
   ```bash
   npx jest --selectProjects=client
   npx jest --selectProjects=server
   ```
3. Lint code:
   ```bash
   npm run lint        # inside client
   npm run test:lint   # inside server
   ```
4. Ensure all tests pass before committing changes.

**Setup Note**: `setup.sh` only installs dependencies. Tests must be run manually after modifications.

## CI/CD Guidelines

A typical pipeline should:

1. Install dependencies with `npm install`.
2. Run linting for the client and server packages.
3. Execute `npm test` to ensure all Jest suites succeed.
4. Build the applications before deployment if required.

## Prompting Rules for Codex

- Keep changes scoped to 1–5 files per task.
- Always run tests and mention their results. Include a note if network access prevents running commands.
- Uphold the design principles of minimal bloat and high-contrast sand-toned UI.
- Seek modular, incremental improvements when implementing features.

### Additional Recommendations

- Use `pnpm dlx turbo run` for working with workspaces quickly.
- `pnpm install --filter <project>` helps Vite, ESLint, and TypeScript recognize dependencies for a single package.
