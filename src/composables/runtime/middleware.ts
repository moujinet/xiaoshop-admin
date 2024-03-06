import type { IAdminContext, IRouteMiddleware } from './types'

/**
 * Define an admin middleware
 *
 * @param middleware IRouteMiddleware
 */
export function defineAdminMiddleware(middleware: IRouteMiddleware): (ctx: IAdminContext) => void {
  return ({ router }) => {
    router.beforeEach((to, from, next) => {
      if (!middleware(to, from))
        next()
    })
  }
}

/**
 * Load all admin route middleware
 *
 * @param ctx IAdminContext
 */
export function loadMiddlewares(ctx: IAdminContext) {
  Object.values(import.meta.glob<(ctx: IAdminContext) => void>('~/middleware/**/*.ts', {
    eager: true,
    import: 'default',
  }),
  ).forEach(
    middleware => middleware(ctx),
  )
}
