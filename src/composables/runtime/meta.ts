import type { RouteRecordRaw } from 'vue-router/auto'
import type { TAdminMenu } from './types'

/**
 * Extend routes meta
 *
 * @param userRoutes RouteRecordRaw[]
 * @param menus TAdminMenu[]
 *
 * @returns RouteRecordRaw[]
 */
export function extendRoutesMeta(userRoutes: RouteRecordRaw[], menus: TAdminMenu[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  userRoutes.forEach((r) => {
    const route = { ...r }
    const meta = _deepFind(menus, route)

    if (meta) {
      route.meta = {
        ...route.meta,
        id: meta.id,
        space: meta.space,
        module: meta.module,
        title: meta.name,
        desc: meta.desc,
        icon: meta.icon,
        isPermission: meta.isPermission,
      }
    }

    if (route.children && route.children.length > 0)
      route.children = extendRoutesMeta(route.children, menus) || []

    routes.push(route)
  })

  return routes
}

/**
 * Deep find menu by route name
 *
 * @param menus TAdminMenu[]
 * @param route RouteRecordRaw
 *
 * @returns TAdminMenu | undefined
 */
function _deepFind(menus: TAdminMenu[], route: RouteRecordRaw): TAdminMenu | undefined {
  const target = ((route.name || route.path) as string).replace(/\/+$/, '')

  let matched: TAdminMenu | undefined

  for (const menu of menus) {
    if (transId2Path(menu.id) === target) {
      matched = menu
      break
    }

    if (menu.children && menu.children.length > 0)
      matched = _deepFind(menu.children, route) || matched
  }

  return matched
}
