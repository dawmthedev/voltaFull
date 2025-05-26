# AGENTS.md - Project Overview and Setup

This **AGENTS.md** file provides guidance on how agents should interact with and contribute to this project. It outlines the file structure, testing procedures, and contribution guidelines for a React + MongoDB setup, with a focus on clean, iterative testing using Codex and Jest.

## 1. Project Structure Overview

- **Frontend**: The project consists of two main client folders:
  - **Client-old/**: The old client, from which features will be selectively removed.
  - **Client-new/**: The new client, where features from the old client will be re-integrated gradually. The new client is being built with **Chakra UI** and **Tailwind CSS** for UI components and styling.
- **Backend**: **Server/** powers the clients and is built using **Ts.ED** with MongoDB as the database.

- **Testing Framework**: Jest will be used for both client and server-side testing. All tests will reside in the **/tests** folder, which serves the monorepo's testing needs.

## 2. Key Files and Folders to Work In

- **/Client-old/**: Contains the legacy client. Features will be selectively extracted from here as needed and moved to **Client-new**.
- **/Client-new/**: The new client, which is slowly being developed with Chakra UI, Tailwind CSS, and integrated with the backend.
- **/Server/**: Contains the backend logic, handling all server-side operations and database interactions with MongoDB.
- **/tests/**: Shared test folder where Jest tests will be maintained for both frontend and backend code.

## 3. Contribution and Style Guidelines

- **Client-new Development**: As features are gradually moved from **Client-old/** to **Client-new**, ensure that Chakra UI and Tailwind CSS are used consistently. New UI components should adhere to these design systems.
- **Code Structure**: Maintain **clean, readable code** using **camelCase** for variables and function names. Ensure all code changes are accompanied by tests.
- **Commit Messages**: Use descriptive commit messages following the pattern: `[<VOLTA>] <message>` for clarity and consistency.
- **Testing**: Always write tests for any changes made to either the frontend or backend. Tests must pass before merging any changes.

## 4. Testing Instructions

- **Run tests**: Use `npm test` from the project root to execute all tests.
- **Run specific tests**: Use `npx jest --selectProjects=<project>` or add a path/pattern to focus on specific suites.
- **Iterative testing**: Write and run tests iteratively until all tests pass.
- **Validate changes**: Ensure the entire test suite passes before merging changes.
- **Linting**: After moving or modifying files, run the package's lint script (`npm run lint` within `client` or `npm run test:lint` within `server`) to verify ESLint rules.

### Setup notes

- The `setup.sh` script installs dependencies only. Tests should be run manually after making changes rather than during setup.

## 5. Migrating Parts of the Codebase

- **Selective migration**: Features and logic will be selectively brought from **Client-old/** to **Client-new** as needed. When moving components or features, ensure compatibility with the new client’s architecture and styling guidelines.
- **Adjusting imports and paths**: After migrating code, ensure all import paths are updated accordingly.
- **Test updates**: Update or write new tests for the migrated components to ensure they function as expected in the new client.

## 6. How to Present Your Work

- **Documenting**: Update documentation if changes affect the overall functionality or structure of the project.
- **PR messages**: Title PRs as `[<VOLTA>] <descriptive title>`, providing clear context on what was changed and why.
- **Exploring context**: Always explore the relevant parts of the codebase when implementing features or fixing bugs to ensure a comprehensive understanding.

## 7. Additional Recommendations

- Use **pnpm dlx turbo run** to efficiently navigate to specific packages.
- **pnpm install --filter <project_name>** ensures the package is added to the workspace, allowing Vite, ESLint, and TypeScript to recognize it.
