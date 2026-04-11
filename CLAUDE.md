# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue 3 + TypeScript + Vite admin template with Naive UI component library, Pinia state management, and dynamic routing from backend API.

## Commands

```bash
pnpm dev      # Start dev server (runs patch-package first)
pnpm build    # TypeScript check + production build
pnpm preview  # Preview production build
```

**Note**: Vite is overridden via pnpm overrides to use `rolldown-vite@7.2.5`.

## Architecture

### Entry Flow
`src/main.ts` → creates app with Pinia, Router, Naive UI, i18n → imports `./permission` for router guards

### Routing
- Hash-based routing (`createWebHashHistory`)
- Dynamic routes generated from backend API via `generatorDynamicRouter()` in `src/utils/generator-routers.js`
- Routes wrap around `BasicLayout` component
- 404 redirect for unmatched paths

### State Management (Pinia)
- `src/stores/system.ts` - Theme (dark/light), language, system info
- TagsView store (`@/store/tagsView`) - Tab navigation state (expected but not yet created)
- User store (`@/store/user`) - User/auth state (expected but not yet created)

### Custom Directives (`src/directives/`)
- `v-loading` - Loading state
- `v-auth` - Button permission (works with `authList` from user store)
- `v-drag` - Drag functionality
- `v-ripple` - Click ripple effect

### API Layer (`src/utils/request.js`)
- Uses `umi-request` with `extend()` for configuration
- Request interceptor adds `Authorization` header from localStorage token
- Response interceptor handles errors (notification for API errors, auto-redirect for 401/5000)
- Dev proxy: `/keer-api` → `http://192.168.0.73`

### Theme System (`src/layouts/theme.ts`)
- CSS variables for light/dark themes
- Naive UI theme overrides via `n-config-provider`
- Dark mode toggled via `theme-mode` attribute on `<html>`

### i18n (`src/i18n/`)
- vue-i18n with Chinese (zh-CN) and English (en-US) locales
- Legacy mode disabled

### Patches
`patches/naive-ui+2.41.0.patch` - Modifies naive-ui internals (scrollbar, date-picker, empty, form, image). **Run `patch-package` after installing dependencies**.

## Key Files

| File | Purpose |
|------|---------|
| `src/permission.js` | Router guards, title setting, token handling |
| `src/utils/generator-routers.js` | Converts backend menu data to Vue Router routes |
| `src/plugins/tab.js` | Tab management (refresh, close, open pages) |
| `src/layouts/Provider.vue` | Root layout with Naive UI providers and theme |

## Missing Modules

The codebase references modules that don't exist yet:
- `@/store/tagsView` - TagsView store for tab management
- `@/store/user` - User store for auth
- `@/config` - Configuration module

## Dependencies

- **UI**: naive-ui 2.41.0 (patched)
- **State**: pinia 3.x
- **Router**: vue-router 4.x
- **i18n**: vue-i18n 9.x
- **HTTP**: umi-request
- **Build**: Vite (rolldown-vite), TypeScript, vue-tsc
