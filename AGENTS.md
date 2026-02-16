# AGENTS.md

This repository contains a Vite + React + TypeScript codebase, plus two related
reference implementations in `aegnticdotai-home/` and `blog-entry-extracted/`.
Use this file as the canonical guidance for agentic changes in this repo.

## Quick Orientation

- Root app: `src/` (current production code)
- Reference React apps: `aegnticdotai-home/`, `blog-entry-extracted/`
- Styling: Tailwind v4 with custom CSS in `src/styles/`
- Animations: CSS keyframes in `src/styles/global.css`
- Icons: `lucide-react` + `Icon3D` component
- Data viz: `recharts` (used in research templates)

## Build / Dev / Preview Commands

Run commands from the directory that contains the relevant `package.json`.

### Root app (`/home/ae/AE/02_Showcase/aegnticdotai`)

- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

### Reference app: `aegnticdotai-home/`

- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

### Reference app: `blog-entry-extracted/`

- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Linting / Formatting

- No ESLint/Prettier configs are present in the repo.
- Do not introduce new linters/formatters unless explicitly requested.
- Preserve the existing formatting style (see Code Style Guidelines).

## Testing

- No test runner is configured in any `package.json`.
- There are no `test` scripts or `vitest/jest` configs.
- If tests are required in the future, add them only when requested.

### Running a Single Test

- Not available (no test framework configured).
- If a test framework is added later, update this file with the exact command.

## Environment Notes

- Vite environment variables are accessed via `import.meta.env`.
- `aegnticdotai-home/` and `blog-entry-extracted/` inject `GEMINI_API_KEY` via
  `vite.config.ts` as `process.env.GEMINI_API_KEY` and `process.env.API_KEY`.

## Code Style Guidelines

### General

- Language: TypeScript + React (functional components).
- Indentation: 4 spaces in TS/TSX, 2 spaces in JSON.
- Semicolons are used consistently; keep them.
- String quotes: prefer single quotes in TS/TSX.
- Prefer explicit, descriptive names over abbreviations.

### Imports

1. React and hooks first.
2. Third-party libraries next (e.g., `lucide-react`, `framer-motion`).
3. Local imports last, relative paths.
4. Keep imports grouped with a blank line between groups.

Example ordering:

- `import React, { useState } from 'react';`
- `import { Menu } from 'lucide-react';`
- `import Icon3D from './Icon3D';`

### Components

- Use `const ComponentName: React.FC<Props> = () => { ... }`.
- Export the component as default at the end of the file.
- Keep component files focused; extract helpers when logic grows.
- Prefer early returns for invalid states.

### Types and Interfaces

- Use `interface` for component props and shared shapes.
- Keep prop interfaces near the component definition.
- Use union types for controlled values (e.g., `'large' | 'small'`).
- Avoid `any`; if unavoidable, isolate it and explain via naming.

### State and Effects

- Prefer `useState` for local UI state.
- Use `useEffect` only when interacting with DOM, timers, or storage.
- Clean up global listeners in `useEffect` return functions.
- Avoid mutating state directly; always use setters with functional updates.

### Error Handling

- Use `try/catch` around `localStorage`, clipboard, and JSON parsing.
- Log actionable errors with context (component or feature prefix).
- Keep user-facing behavior graceful (no hard crashes in UI).

### Styling

- Tailwind classes live inline in JSX; keep class lists readable.
- Prefer semantic utility ordering: layout → spacing → typography → color → effects.
- Shared styles belong in `src/styles/global.css` or `wireframe.css`.
- Use design tokens in `@theme` where possible.

### Naming Conventions

- Components: `PascalCase`.
- Hooks: `useCamelCase`.
- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities.
- CSS classes: `kebab-case` or Tailwind utilities.

### DOM and Accessibility

- Use `aria-hidden`, `aria-label`, and semantic tags when needed.
- Prefer button elements for actions, anchor tags for navigation.

## Repo-Specific Patterns

- Navigation highlights active section by reading DOM positions.
- Animated effects rely on custom keyframes in `global.css`.
- Dev tools allow inline editing in dev mode; keep their state stable.

## What Not To Do

- Do not add new tooling configs (ESLint/Prettier/Testing) without request.
- Do not change formatting style or indentation width.
- Do not introduce new dependencies unless requested.
- Do not remove or rename sections in `App.tsx` without alignment.

## Cursor / Copilot Rules

- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md`
  files exist in this repository at the time of writing.
- If added later, update this file to include their guidance.
