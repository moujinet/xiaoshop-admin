import type { NavigationGuard, RouteLocationNormalized } from 'unplugin-vue-router/types'

export interface IRouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}
