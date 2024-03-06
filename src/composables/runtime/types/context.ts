import type { App } from 'vue'
import type { Router } from 'vue-router/auto'

/**
 * Admin options
 */
export interface IAdminOptions {
  name: string
  desc: string
  version: string
  debug?: boolean
}

/**
 * Admin context
 */
export interface IAdminContext {
  options: Readonly<IAdminOptions>

  app: App
  router: Router
}
