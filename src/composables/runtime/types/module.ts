import type { TAdminMenuDefinition } from './menu'

/**
 * Admin module
 */
export interface IAdminModule {
  id: string
  space: string
  name: string
  icon: string
  desc: string
  version: string
  sort: number
}

/**
 * Admin module definition
 */
export type TAdminModuleDefinition = Omit<Partial<IAdminModule>, 'id' | 'name' | 'space' | 'sort'> & {
  id: string
  space: string
  name: string
  sort?: number
  menus?: TAdminMenuDefinition[]

  setup?: () => void
}
