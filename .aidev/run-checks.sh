#!/usr/bin/env bash
# Run the checks named after the suite and write test-results/<suite>/junit.xml.
#
#   .aidev/run-checks.sh <suite> <step>...
#
# This repository has no tests; its CI (.gitlab-ci.yml `build`) runs
# `pnpm install` and `npm run build`. Every run first installs node_modules
# offline and frozen (.aidev/pnpm-deps.sh), one junit case `install`. Steps,
# each one junit case (its log the failure body); `build` in package.json runs
# typecheck and the three builds in parallel, here they run one by one so each
# reports on its own:
#
#   lint       package.json's `lint` without --fix, so it reports instead of
#              rewriting the tree (eslint src, .gitignore as ignore file)
#   typecheck  `vue-tsc --build --force` (package.json `type-check`)
#   build      `vite build` (demo site, dist/)
#   build-ce   `vite build -c web-component/vite.config.ts --outDir dist-wc`
#   build-vue  `vite build -c vue-component/vite.config.ts --outDir dist-vue`
#   prepack    `pnpm run prepack` (tsx render-package.ts into dist-wc and
#              dist-vue), CI's `publish` step before `npm publish`
#
# The examples under example/ are not built: they have no lockfiles and
# install the local build by file:../../dist-*, so they cannot install offline.
#
# Runs offline in the image of .aidev/runtime/Dockerfile.
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1
root="$PWD"
suite="${1:?usage: $0 <suite> <step>...}"; shift
out="$root/test-results/$suite"
rm -rf "$out"; mkdir -p "$out"
cases="$out/cases.tsv"; : > "$cases"
source .aidev/junit-helpers.sh

status=0
record() { # name rc seconds log
    if [ "$2" -eq 0 ]; then
        printf 'case\t%s\tpass\t%s\t\n' "$1" "$3" >> "$cases"
    else
        status=1
        printf 'case\t%s\tfail\t%s\texit %s\t%s\n' "$1" "$3" "$2" "$4" >> "$cases"
    fi
}
step() {
    local name="$1"; shift
    local log="$out/$name.log" t0=$SECONDS rc=0
    echo "== $name" >&2
    ( cd "$root" && "$@" ) > "$log" 2>&1 < /dev/null || rc=$?
    [ "$rc" -eq 0 ] || tail -40 "$log" >&2
    record "$name" "$rc" "$((SECONDS - t0))" "$log"
    return "$rc"
}

# The install is a case of its own: a lockfile the image's store cannot serve
# fails here, not as a missing tool in a later step.
t0=$SECONDS
if ! ( source "$root/.aidev/pnpm-deps.sh" ) > "$out/install.log" 2>&1; then
    tail -40 "$out/install.log" >&2
    record install 1 "$((SECONDS - t0))" "$out/install.log"
    junit_write_cases "$out/junit.xml" "$suite" "$cases"
    exit 1
fi
record install 0 "$((SECONDS - t0))" "$out/install.log"

for s in "$@"; do
    case "$s" in
        lint) step lint pnpm exec eslint src --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --ignore-path .gitignore ;;
        typecheck) step typecheck pnpm exec vue-tsc --build --force ;;
        build) step build pnpm exec vite build ;;
        build-ce) step build-ce pnpm exec vite build -c web-component/vite.config.ts --outDir dist-wc ;;
        build-vue) step build-vue pnpm exec vite build -c vue-component/vite.config.ts --outDir dist-vue ;;
        prepack) step prepack pnpm run prepack ;;
        *) printf 'case\t%s\tfail\t0\tunknown step\n' "$s" >> "$cases"; status=1 ;;
    esac
done
junit_write_cases "$out/junit.xml" "$suite" "$cases"
exit "$status"
