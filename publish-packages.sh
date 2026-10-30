#!/bin/sh
# Publish each rendered package directory (dist-wc, dist-vue) unless its version is
# already in the registry, so a main push without a version bump does not fail.
#
#   sh publish-packages.sh <packageDir>...
#
# npm view runs inside the package directory so it reads the same .npmrc (registry
# and token) as npm publish. Any registry error other than E404 (the package was
# never published) fails, as does a failing npm publish.
set -eu

[ "$#" -gt 0 ] || { echo "Usage: sh publish-packages.sh <packageDir>..." >&2; exit 2; }

root="$(pwd)"
err="$(mktemp)"
trap 'rm -f "$err"' EXIT

for dir in "$@"; do
  cd "$root/$dir"
  name="$(node -p "require('./package.json').name")"
  version="$(node -p "require('./package.json').version")"

  if published="$(npm view "$name@$version" version 2>"$err")"; then
    if [ "$published" = "$version" ]; then
      echo "Skipping $name@$version: already published"
      continue
    fi
  elif ! grep -q E404 "$err"; then
    cat "$err" >&2
    echo "Cannot check whether $name@$version is published" >&2
    exit 1
  fi

  echo "Publishing $name@$version"
  npm publish
done
