# @hiveio/component-binary-view

Binary view representation of the transaction

## Development

### Project Setup

Dependency versions come from the pnpm catalogs of [common-ci-configuration](https://gitlab.syncad.com/hive/common-ci-configuration), checked out as the `npm-common-config` submodule:

```sh
git submodule update --init --remote npm-common-config
pnpm install
```

### Run development server

```sh
pnpm dev
```

### Build for production

This command builds Web Component, Vue Component and static website built in Vue for representative purposes

```sh
pnpm build
```

### Prepare for publish

After building, you should generate package.json and README files for components

```sh
pnpm prepack
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
