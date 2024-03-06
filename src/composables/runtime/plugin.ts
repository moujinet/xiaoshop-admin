import type { IAdminContext } from '~/composables/runtime/types'

/**
 * Define an admin plugin
 */
export function defineAdminPlugin(plugin: (ctx: IAdminContext) => void) {
  return (ctx: IAdminContext) => plugin(ctx)
}

/**
 * Load all admin plugins
 *
 * @param ctx IAdminContext
 */
export function loadPlugins(ctx: IAdminContext) {
  Object.values(import.meta.glob<(ctx: IAdminContext) => void>('~/plugins/**/*.ts', {
    eager: true,
    import: 'default',
  }),
  ).forEach(
    plugin => plugin(ctx),
  )
}
