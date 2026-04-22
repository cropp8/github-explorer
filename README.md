# 🛸 GitHub Explorer

A fully accessible GitHub profile explorer built with Vue 3, TypeScript, and Pinia. Designed to demonstrate clean architecture, reactive state management, and inclusive UX patterns.

🚀 **[Live Demo on Netlify](https://cropp8-ghx.netlify.app/)**

## 🛠️ Tech Stack

- **Framework:** Vue 3 (Composition API with `<script setup>`)
- **Language:** TypeScript — strict typing on all API responses, store state, and composables
- **State Management:** Pinia (modular `github` and `toast` stores)
- **Routing:** Vue Router 5
- **Styling:** Tailwind CSS 4 (mobile-first, dark mode support)
- **Icons:** Lucide Vue
- **HTTP Client:** Axios
- **Build Tool:** Vite 8
- **Linting:** oxlint + ESLint + Prettier

## ✨ Key Features

- **Smart Search:** Keyboard-navigable history dropdown with `ArrowUp`, `ArrowDown`, `Enter`, and `Escape` support.

- **Persistent History:** Last 5 unique searches saved to `localStorage` for quick access.

- **Custom Toast System:** Global notification bus built from scratch using a Pinia store and `<Teleport>` — no third-party libraries.

- **Dynamic Pagination:** Server-side pagination for repository lists, driven by `route.query.page`.

- **Responsive Layout:** 12-column grid that transitions seamlessly from mobile to desktop.

- **Theme Switching:** Full dark/light mode with system preference detection (`prefers-color-scheme`) and `localStorage` persistence.

## 🏗️ Architectural Decisions

### 1. The Service Layer

Rather than calling Axios directly from Pinia stores, I implemented a Service Pattern (`src/services/githubService.ts`). This decouples HTTP logic from state management, making both independently testable.

### 2. Global Toast Bus

Instead of a third-party library, I built a custom toast system using a Pinia store (`toast.ts`) and a `<Teleport>` container (`ToastContainer.vue`). This allows any part of the app — including logic outside of components — to trigger non-blocking notifications.

### 3. Combined Route Watcher

To avoid redundant API calls during navigation, `UserProfileView` uses a unified `watch` on both `route.params.username` and `route.query.page`. It intelligently distinguishes between a username change (full profile reset) and a page change (repository list refresh only).

## ♿ Accessibility (A11y)

Accessibility was a core requirement, not an afterthought:

- **Keyboard Navigation:** The search history dropdown supports `ArrowUp`, `ArrowDown`, `Enter`, and `Escape` via `aria-activedescendant` and `role="combobox"` / `role="listbox"`.

- **Screen Reader Support:** `aria-live="polite"` on the toast container and `role="status"` on loading overlays.

- **Focus Management:** `focus-visible` rings on all interactive elements; focus is programmatically moved to the results container on route transition.

- **Semantic HTML:** `<main>`, `<header>`, `<footer>`, `<nav>`, `<form role="search">`, and `<label>` landmarks throughout.

## 🚦 Getting Started

```sh
git clone https://github.com/cropp8/github-explorer.git
npm install
npm run dev
```

```sh
npm run build   # type-check + production build
npm run lint    # oxlint + eslint with auto-fix
npm run format  # prettier
```

## ⚠️ API Constraints

The GitHub Public API allows 60 unauthenticated requests/hour. To raise this to 5,000/hour, create a `.env.local` file in the project root:

```
VITE_GITHUB_TOKEN=your_personal_access_token
```

A classic token with no scopes (read-only public data) is sufficient. If the limit is reached, the app handles the `403` response and notifies the user via the toast system.

## 🔮 Future Improvements

- **Vitest:** Add unit tests for Pinia store logic.

- **Skeleton Loaders:** Replace the global spinner with content-specific skeleton screens.

- **GitHub OAuth:** Add auth flow to raise the API rate limit to 5,000/hr for all users.
- **Component-Driven CSS Architecture:** Centralized BaseLink UI component. to encapsulate global styling logic and standard accessibility attributes into a single reusable unit.

- **Mobile UX Optimization:** implementing media queries (e.g., @media (hover: hover)) to disable persistent "sticky" hover states on touch devices to provide more native feel.

- **Nuxt 3 Migration:** Re-architect with Nuxt to leverage SSR for SEO and utilize Nitro/useCookie for robust state persistence.
