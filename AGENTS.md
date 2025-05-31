# AGENTS.md - Volta CRM Guidelines

This file defines instructions for Codex and all contributors working on the Volta CRM monorepo. Follow these rules for consistent, high-quality code and a clean history.

## Overview

Volta CRM is a multi-role customer management platform. The repository is a Node.js monorepo with:

- **client/** – React front end using Chakra UI, Tailwind and Redux Toolkit.
- **server/** – Ts.ED REST API backed by MongoDB via Mongoose.
- **tests/** – Shared Jest suites for both packages.

Core features include project tracking, accounts payable, user management and authentication. The architecture is modular so new modules can be added easily.

### Application Flow

1. **Registration and Login** – users register and authenticate through the
   routes exposed by `AuthenticationController`. Once logged in, the React client
   stores the session token and directs users to `/dashboard`.
2. **Dashboard** – `client/src/routes.tsx` defines the main routes under the
   dashboard. Pages include projects, accounts payable, user management and
   technician tasks.
3. **API Calls** – pages dispatch Redux thunks located in `client/src/store` to
   call the REST endpoints implemented in `server/src/controllers/rest`.

### Key Features

- **Project Tracking** – create and update projects via `ProjectController` and
  manage payroll allocations.
- **Accounts Payable** – `AccountsPayableController` and its service handle
  allocations and payment status.
- **User Management** – admins invite and manage users using `AdminController`
  and related services.
- **Technician Tasks** – technicians can view assigned tasks from the payroll and
  project modules.
- **Authentication** – `AuthenticationController` issues tokens and verifies
  registrations.

### Backend Consistency

The server uses Ts.ED controllers paired with dedicated services and Mongoose
models, ensuring each resource follows a typed schema. Services such as
`AccountsPayableService` migrate legacy data and validate percentage totals while
`AdminService` manages session cookies. Running `npm --workspace server run
barrels` keeps controller exports aligned, and tests under `tests/server` guard
behavior.

## Environment Setup

1. Use **Node.js 18.x** (enforced by the `volta` block in `package.json`).
2. Run `./setup.sh` to install all workspace dependencies. The script does not run tests.
3. Start development:
   ```bash
   npm run dev      # run client and server together
   npm run server   # run only the server
   npm run client   # run only the client
   ```
4. Configure environment variables such as `DATABASE_URL` using `server/.env.example`.

## Scaling Notes

- Server controllers live under `server/src/controllers/rest` and use services in `server/src/services`.
- Mongoose models are in `server/src/models`.
- Client pages live under `client/src/pages` and are routed from `client/src/routes.tsx`.
- Redux slices are located in `client/src/store`.
- Run `npm --workspace server run barrels` if you add or move server controllers so barrel files stay updated.

## Contribution Guidelines

- Break tasks into **1–5 file changes** to reduce conflicts.
- Commit messages: `[VOLTA] <message>`.
- Pull request titles: `[VOLTA] <descriptive title>`.
- Explore related files for context before editing.
- Follow camelCase naming for variables and functions.
- Provide setup and test commands in your Codex responses.
- Write or update tests alongside any code changes.

## Testing Workflow

1. Run the full suite:
   ```bash
   npm test
   ```
2. Lint code:
   ```bash
   npm run lint        # client
   npm run test:lint   # server
   ```
3. Run specific projects if needed:
   ```bash
   npx jest --selectProjects=client
   npx jest --selectProjects=server
   ```
4. Ensure all tests pass before committing.

**Setup Note**: `setup.sh` only installs dependencies. Tests must be executed manually after modifications.

## CI/CD Guidelines

1. Install dependencies with `npm install`.
2. Lint the client and server packages.
3. Run `npm test` to ensure all Jest suites succeed.
4. Build the apps before deployment if required.

## Prompting Rules for Codex

- Keep changes scoped to 1–5 files per task.
- Always run tests and mention results. Include a note if network access prevents running commands.
- Uphold minimal-bloat design with a sand-toned, high-contrast UI.
- Seek modular, incremental improvements when adding features.

## UI/UX Guidelines

### Visual Design System

- Use a consistent color palette:
  ```css
  colors: {
    primary: '#3182CE',    // Brand blue
    accent: '#38B2AC',     // Teal accent
    neutral: '#1A202C',    // Dark text
    surface: '#F7FAFC',    // Light background
  }
  ```
- Maintain spacing rhythm with Tailwind's spacing scale
- Use elevation levels via shadow utilities:
  - Cards: `shadow-md`
  - Modals: `shadow-lg`
  - Dropdowns: `shadow-sm`

### Component Guidelines

- Cards and panels should use rounded-lg for consistency
- Forms should implement:
  ```tsx
  <FormControl className="space-y-4">
    <FormLabel className="text-sm font-medium text-gray-700">
    <Input className="w-full px-3 py-2 border rounded-md" />
    <FormHelperText className="text-xs text-gray-500" />
  </FormControl>
  ```
- Tables should use sticky headers and virtualization for large datasets

### Animation Principles

- Use subtle transitions for state changes:
  ```tsx
  className = "transition-all duration-200 ease-in-out";
  ```
- Progressive loading sequences:
  ```tsx
  <Transition
    show={isOpen}
    enter="transition duration-100 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
  />
  ```
- Skeleton loading states for async content

### Performance Guidelines

- Implement code-splitting at route level
- Use React.lazy() for heavy components
- Optimize images with next/image or similar
- Cache expensive computations with useMemo
- Debounce scroll/resize event handlers

### Responsive Design

- Mobile-first approach using Tailwind breakpoints
- Critical tap targets minimum 44x44px
- Drawer navigation on mobile, sidebar on desktop
- Maintain 16px base font size for readability
