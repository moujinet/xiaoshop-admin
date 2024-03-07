import type { IAdminModule, IAdminSpace, TAdminMenu, TAdminMenuDefinition, TAdminMenuType } from './types'

export const useAdminSpace = defineStore('space', () => {
  const spaces = ref<IAdminSpace[]>([
    { id: 'shop', name: '店铺', desc: '店铺管理', icon: 'ph:storefront', sort: 0 },
    { id: 'app', name: '应用', desc: '应用管理', icon: 'ph:vibrate', sort: 1 },
    { id: 'settings', name: '管理', desc: '系统管理', icon: 'ph:faders', sort: 99 },
  ])
  const menus = ref<Record<string, TAdminMenu>>({})
  const defaultPaths = ref<Record<string, string>>({})

  /**
   * Create new space
   *
   * @param space IAdminSpace
   */
  function createSpace(space: IAdminSpace) {
    if (!spaces.value.find(s => s.id === space.id)) {
      spaces.value.push({
        id: space.id,
        name: space.name,
        desc: space.desc || '',
        icon: space.icon || 'ph:squares-four',
        sort: space.sort || spaces.value.length,
      })
    }
  }

  /**
   * Get space by ID
   *
   * @param id string
   * @returns IAdminSpace
   */
  function getSpace(id: string): IAdminSpace | undefined {
    return spaces.value.find(s => s.id === id)
  }

  /**
   * Add new module to space
   *
   * @param module IAdminModule
   * @returns string Module full ID
   */
  function addModule(module: IAdminModule): string {
    const moduleId = `${module.space}.${module.id}`

    if (menus.value[moduleId])
      throw new Error(`Module ${module.id} already exists` + ` in space ${module.space}`)

    const topMenu: TAdminMenu = {
      id: moduleId,
      space: module.space,
      module: moduleId,
      type: 'module',
      name: module.name,
      icon: module.icon,
      desc: module.desc,
      sort: module.sort,
      path: '',
      isShow: true,
      isPermission: true,
      children: [],
    }

    menus.value[moduleId] = topMenu

    return moduleId
  }

  /**
   * Add menus to module
   *
   * @param moduleId string
   * @param userMenus TAdminMenuDefinition[]
   */
  function addModuleMenus(moduleId: string, userMenus: TAdminMenuDefinition[]) {
    const module = menus.value[moduleId]

    if (!module)
      throw new Error(`Module ${moduleId} not found`)

    userMenus.forEach((menu) => {
      if (!module.children?.find(m => m.id === menu.id))
        module.children?.push(_normalizeMenu(menu, moduleId, moduleId))
    })

    module.children?.sort((a, b) => a.sort - b.sort)
    module.path = _getMenuLeadPath(module.children || []).path
  }

  /**
   * Get all menus
   */
  const getAllMenus = computed(() => Object.values(menus.value).sort((a, b) => a.sort - b.sort))

  /**
   * Get default module path
   *
   * @param spaceId string
   * @returns string
   */
  function getDefaultModulePath(spaceId: string): string {
    if (!defaultPaths.value[spaceId]) {
      defaultPaths.value[spaceId] = getAllMenus.value.find(
        m => m.space === spaceId && m.type === 'module',
      )?.path || ''
    }

    return defaultPaths.value[spaceId]
  }

  /**
   * Normalize menu
   *
   * @param menu TAdminMenuDefinition
   * @param module string
   * @param parent string
   * @returns TAdminMenu
   */
  function _normalizeMenu(
    menu: TAdminMenuDefinition,
    module: string,
    parent?: string,
  ): TAdminMenu {
    const menuId = parent ? `${parent}.${menu.id}` : menu.id
    const newMenu: TAdminMenu = {
      id: menuId,
      space: module.split('.')[0],
      module,
      type: menu.type || _getMenuType(menu),
      name: menu.name,
      icon: menu.icon || '',
      desc: menu.desc || '',
      sort: menu.sort || 0,
      path: '',
      isShow: menu.isShow === undefined ? true : menu.isShow,
      isPermission: menu.isPermission === undefined ? true : menu.isPermission,
    }

    if (menu.children && menu.children.length > 0) {
      newMenu.children = menu.children
        .sort((a, b) => (a.sort || 0) - (b.sort || 0))
        .map(m => _normalizeMenu(m, module, menuId))
      newMenu.path = menu.path || _getMenuLeadPath(newMenu.children).path
    }

    newMenu.path = menu.path || transId2Path(menuId)

    return newMenu
  }

  /**
   * Get menu type
   *
   * @param menu TAdminMenuDefinition
   * @returns TAdminMenuType
   */
  function _getMenuType(menu: TAdminMenuDefinition): TAdminMenuType {
    if (menu.children && menu.children.length > 0)
      return 'group'
    else if (menu.path?.startsWith('#'))
      return 'action'

    return 'page'
  }

  /**
   * Get menu lead path
   *
   * @param menus TAdminMenu[]
   * @returns TAdminMenu
   */
  function _getMenuLeadPath(menus: TAdminMenu[]): TAdminMenu {
    if (menus[0].children && menus[0].children.length > 0)
      return _getMenuLeadPath(menus[0].children)

    return menus[0]
  }

  return {
    // Get all spaces
    spaces: computed(() => spaces.value.sort((a, b) => a.sort - b.sort)),
    // Get all menus
    menus: getAllMenus,
    // Get space by ID
    getSpace,
    // Create new space
    createSpace,
    // Add new module to space
    addModule,
    // Add menus to module
    addModuleMenus,
    // Get default module path
    getDefaultModulePath,
  }
})
