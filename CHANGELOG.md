# Changelog

## 0.5.0

Dependency versions now come from the pnpm catalogs of hive/common-ci-configuration. This release
breaks consumers of 0.4.0:

- **Tailwind 4, class prefix `bvc:`.** The component's utility classes changed from `bvc-tw-flex`
  to `bvc:flex`. Stylesheets or tests that target or override `bvc-tw-*` classes must use the
  `bvc:` form (escaped in CSS selectors, e.g. `.bvc\:flex`).
- **Vue 3.5 and Pinia 4.** `@hiveio/component-binary-view` depends on `vue` `^3.5.44` and `pinia`
  `^4.1.0` (was Pinia 2). Vue applications must upgrade Pinia to 4 so the component shares the
  application's Pinia instance. Vuetify (used only to build the demo) moved to 4.
- **wax 1.28.** The component is built against `@hiveio/wax` 1.28.8 (was 1.27.6); pass it binary
  data produced by wax 1.28.
- **React example.** `example/react` moved from Create React App to Vite and React 19; the web
  component itself is unchanged for React users.
