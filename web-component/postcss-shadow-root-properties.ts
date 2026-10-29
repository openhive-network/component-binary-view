import type { PluginCreator } from 'postcss'

/**
 * Tailwind 4 gives its internal custom properties (`--tw-border-style`, `--tw-space-y-reverse`, …)
 * their initial values with `@property`, which a shadow root ignores; it sets them on elements only
 * in an `@supports` fallback for browsers without `@property`. This plugin drops that `@supports`
 * condition, so the initial values also apply inside the web component's shadow root.
 */
const shadowRootProperties: PluginCreator<void> = () => ({
  postcssPlugin: 'shadow-root-properties',
  OnceExit(root) {
    root.walkAtRules('layer', (layer) => {
      if (layer.params !== 'properties') return
      layer.walkAtRules('supports', (supports) => {
        supports.replaceWith(supports.nodes ?? [])
      })
    })
  }
})
shadowRootProperties.postcss = true

export default shadowRootProperties
