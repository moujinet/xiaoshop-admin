import NProgress from 'nprogress'
import './nprogress.less'

export default defineAdminPlugin(({ router }) => {
  router.beforeEach((to, from) => {
    if (to.path !== from.path)
      NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })
})
