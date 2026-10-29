# Automated contributions

This directory configures the automated development platform that contributes to this
repository. This note says which branches it uses here and how its work reaches the
project's main line.

## Branches

- `aidev/integration` — the integration branch. Automated work lands here and nowhere else.
- `main` — the project's main line; reached from `aidev/integration` only by merge request (`aidev handoff`). Merge it **keeping the source branch**: `aidev/integration` is protected for that reason.
- `ai/*` — one branch per task, created and deleted by the platform. Do not commit to them.
- `session/*` — a session's accumulated work, landed on the integration branch as a batch.

## How work reaches the main line

Task and session branches never reach `aidev/integration` through merge requests; the platform
lands them after its own verification. `aidev/integration` reaches `main` by this project's
usual process, merge requests included — the platform never merges into any other branch.

The project's own CI (`.gitlab-ci.yml`) runs `build` (`pnpm install` + `npm run build`) on every
branch, so it also runs on `ai/*` and `session/*` branches; `pages` and `publish` run on `main`
only. Its only job image is `node:18`; Node images are not pinned by this profile (the test
runtime takes Node from common-ci-configuration), so there is no job image to pin by digest.

## Suites run before work lands

Declared in `.aidev/project.yaml` under `verification`, all through `.aidev/run-checks.sh`,
which writes `test-results/<slot>/junit.xml` (one case per step, the step's log as the
failure body). Every run first installs dependencies offline from the lockfile
(`.aidev/pnpm-deps.sh`), one case `install`; the slots name the steps after it:

- `quick` — lint typecheck build build-ce build-vue prepack
- `full` — lint typecheck build build-ce build-vue prepack
- `baseline` — typecheck build build-ce build-vue
- `canary` — lint typecheck build build-ce build-vue prepack
- `static` — lint typecheck
- `coverage` — build build-ce build-vue
- `system` — build build-ce build-vue prepack

Steps: `lint` is package.json's `lint` without `--fix` (so it reports instead of rewriting the
tree); `typecheck` is `vue-tsc --build --force`; `build`, `build-ce` and `build-vue` are the three
`vite build`s package.json's `build` runs in parallel (demo site into `dist/`, web component into
`dist-wc/`, Vue plugin into `dist-vue/`), here one by one so each reports on its own; `prepack` is
`pnpm run prepack` (`tsx render-package.ts` into `dist-wc/` and `dist-vue/`), CI's publish step
before `npm publish`. The repository has **no tests**, so the slots repeat build evidence. There
is no coverage tooling: `coverage` runs the builds.

The examples under `example/` are not built by any slot: they have no lockfiles and install the
local build through `file:../../dist-*`, so they cannot be installed offline. A change that
gives them lockfiles should add a step for them (and rebuild the image).

## Test runtime

`.aidev/runtime/Dockerfile` builds on common-ci-configuration's `node-test-tools:develop` (Node
and pnpm come from there; this repository pins no Node of its own in it) and adds a pnpm store
filled from `pnpm-lock.yaml` by `pnpm fetch`. Rebuild and re-pin it with
`.aidev/runtime/build.sh --push` when the Dockerfile or the files it copies change, or to follow a
new `node-test-tools:develop`, and put the printed `repo@sha256:…` into `environment.image`.

## Known state at onboarding (2026-10-29)

- Every step passes offline: `install`, `lint` (eslint, no findings), `typecheck`, the three
  builds and `prepack`.
