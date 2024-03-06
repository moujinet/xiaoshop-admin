/**
 * Admin menu type
 */
export type TAdminMenuType = 'module' | 'group' | 'page' | 'action' | 'settings' | 'user'

/**
 * Admin menu meta
 */
export interface IAdminMenuMeta {
  id: string
  space: string
  module: string
  type: TAdminMenuType
  name: string
  path: string
  icon: string
  desc: string
}

/**
 * Admin menu
 */
export type TAdminMenu = IAdminMenuMeta & {
  sort: number
  isShow: boolean
  isPermission: boolean

  children?: TAdminMenu[]
}

/**
 * Admin menu definition
 */
export type TAdminMenuDefinition = Omit<Partial<TAdminMenu>, 'id' | 'name' | 'module' | 'children'> & {
  id: string
  name: string

  children?: TAdminMenuDefinition[]
}
