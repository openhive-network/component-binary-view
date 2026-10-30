# CLAUDE.md - component-binary-view

## Project Overview

**@hiveio/component-binary-view** is a reusable UI component library that provides an interactive binary/hexadecimal viewer for visualizing transaction data. It renders binary transaction data in a readable hex format with hierarchical structure visualization, color-coded nodes, and interactive selection.

Supports multiple deployment formats:
- **Web Component** - Custom `<binary-view>` HTML element
- **Vue Component** - Vue 3 plugin
- **Demo Website** - Static demo site

**Version:** 0.4.0 | **License:** MIT

## Tech Stack

- **Vue 3** - UI framework with Composition API
- **Pinia** - State management
- **TypeScript** - Static typing
- **Vite** (5.3.1) - Build tool
- **Tailwind CSS** (4) - Styling with the `bvc` prefix (`bvc:flex`)
- **Radix Vue** (1.9.7) - Headless UI primitives
- **@hiveio/wax** - Transaction binary conversion library

Vue, Pinia, Vuetify, vue-tsc, Tailwind, TypeScript, tsx, wax, React and Next come from the pnpm
catalogs of hive/common-ci-configuration (`npm-common-config` submodule, branch `develop`):
package.json files reference them as `catalog:<name>`, never with a version. The root and every
example have a `pnpm-workspace.yaml` symlink to `npm-common-config/pnpm-config/pnpm-workspace.yaml`
and their own `pnpm-lock.yaml`. Clone with `--recurse-submodules`.

## Directory Structure

```
src/
├── components/BinaryView/     # Core component
│   ├── BinaryView.vue         # Main component
│   ├── store.ts               # Pinia store (indexing, colors, highlighting)
│   ├── types.ts               # TypeScript interfaces
│   ├── components/            # Sub-components (KeyProp, HexProp, ActionButtons, ui/)
│   └── utils/                 # Helpers (colors.ts, shadcn.ts, shadowdom.ts)
├── App.vue                    # Demo app root
├── main.ts                    # Demo entry point
└── app.init.ts                # App initialization

web-component/                 # Web Component package
├── main.ts                    # Web Component wrapper
├── vite.config.ts             # Build config
└── package.template.json      # Template for npm package

vue-component/                 # Vue package
├── main.ts                    # Vue plugin export
├── vite.config.ts             # Build config
└── package.template.json

example/                       # Usage examples
├── vanilla/                   # Pure HTML/JS
├── react/                     # React integration
├── vue/                       # Vue integration
├── next/                      # Next.js
└── nuxt/                      # Nuxt
```

## Development Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server
pnpm build            # Build all (Web Component, Vue, demo)
pnpm build-ce         # Build Web Component only
pnpm build-vue        # Build Vue package only
pnpm type-check       # TypeScript type checking
pnpm lint             # Lint with ESLint
pnpm format           # Format with Prettier
pnpm prepack          # Generate package.json/README from templates
```

## Key Files

| File | Purpose |
|------|---------|
| `src/components/BinaryView/BinaryView.vue` | Main component |
| `src/components/BinaryView/store.ts` | Pinia store for state |
| `src/components/BinaryView/types.ts` | TypeScript interfaces |
| `web-component/main.ts` | Web Component wrapper |
| `vue-component/main.ts` | Vue plugin export |
| `vite.config.base.ts` | Shared Vite configuration |
| `src/components/BinaryView/assets/tailwind.css` | Tailwind theme, `bvc` prefix, sources |
| `web-component/tailwind.css` | Preflight + utilities for the web component's shadow root |
| `render-package.ts` | Template rendering (Eta) for package.json/README |

## Coding Conventions

**Vue Components:**
- Use `<script setup lang="ts">` (Composition API)
- Props via `defineProps`, events via `defineEmits`
- Path alias `@/` points to `/src/`

**Tailwind CSS:**
- All utilities prefixed with `bvc:` to prevent conflicts (Tailwind 4 prefixes are letters only)
- Not in cascade layers: as with Tailwind 3, source order decides between utilities and `BinaryView.css`
- Dark mode via class-based (`dark:` variant, the `dark` class on `.binary-data-body`), which also switches the CSS variables
- CSS variables for theming (HSL format)

**TypeScript:**
- Explicit interfaces: `IBinaryView`, `IBinaryViewProps`, `IBinaryViewNode`
- Strict typing, no `any` types

**Styling:**
- Component classes use `binary-view-*` naming
- Inline styles for dynamic colors
- Shadcn UI components in `/components/ui/`

**Component API:**
- **Props:** `data`, `rootnode`, `rowbytes`, `uppercase`, `dark`
- **Events:** `copy` (emitted on copy action)
- **Methods:** `getSelectedRange()` returns `{start, end}`

## CI/CD Notes

**GitLab CI** (`.gitlab-ci.yml`):

| Stage | Purpose |
|-------|---------|
| build | TypeScript check, build all outputs; `examples` builds every example from its frozen lockfile |
| deploy | GitLab Pages (main only), npm publish (main only) |

**Cache:** Based on `pnpm-lock.yaml`, caches `node_modules/` and `.pnpm-store/`

**Publish:** Publishes to GitLab npm registry using `CI_JOB_TOKEN`

**Build outputs:**
- `dist/` - Demo website (deployed to GitLab Pages)
- `dist-wc/` - Web Component package
- `dist-vue/` - Vue package
