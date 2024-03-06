import { defu } from 'defu'
import { createHead } from '@unhead/vue'

import { type Component, createApp } from 'vue'
import type { Router } from 'vue-router/auto'
import { createRouter } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import type { _RouterOptions } from 'unplugin-vue-router/types'
import type { IAdminContext, IAdminOptions } from './types'

import { description as desc, name, version } from '~~/package.json'

export function createAdminClient(
  App: Component,
  routerOptions: _RouterOptions,
  userOptions: Partial<IAdminOptions> = {},
  ready?: (ctx: IAdminContext) => Promise<void>,
  rootContainer = '#app',
) {
  const options: IAdminOptions = defu(userOptions, {
    name,
    desc,
    version,
    debug: false,
  })

  async function createAdminContext(): Promise<IAdminContext> {
    const app = createApp(App)
    const pinia = createPinia()
    const head = createHead()

    app.use(pinia)
    app.use(head)

    // install all modules under `modules/`
    loadModules()

    const router = createRouter({
      ...routerOptions,
      extendRoutes: (r) => {
        const adminSpace = useAdminSpace()
        const routes = setupLayouts(r)
        return extendRoutesMeta(routes, adminSpace.menus)
      },
    }) as Router

    const ctx: IAdminContext = {
      options,
      app,
      router,
    }

    app.use(router)

    await ready?.(ctx)

    return ctx
  }

  ;(async () => {
    const ctx = await createAdminContext()
    await ctx.router.isReady()

    ctx.app.mount(rootContainer, true)
  })()
}
