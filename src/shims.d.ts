import 'vue-router/auto'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module 'vue-router' {
  interface RouteMeta {
    id?: string
    space?: string
    module?: string
    title?: string
    desc?: string
    icon?: string
    isPermission?: boolean
    isLayout?: boolean
  }
}
