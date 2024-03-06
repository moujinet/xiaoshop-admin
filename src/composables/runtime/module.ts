import type { IAdminModule, TAdminModuleDefinition } from './types'

/**
 * Define admin module
 *
 * @param definition Admin module definition
 */
export function defineAdminModule(definition: TAdminModuleDefinition): () => void {
  if (!definition.id)
    throw new Error('Module id is required')

  if (!definition.name)
    throw new Error('Module name is required')

  if (!definition.space)
    throw new Error('Module space is required')

  return () => {
    if (definition.setup)
      definition.setup()

    const { getSpace, addModule, addModuleMenus } = useAdminSpace()

    const space = getSpace(definition.space)
    if (!space)
      throw new Error(`Space ${definition.space} not found`)

    // Normalize module
    const newModule: IAdminModule = {
      id: definition.id,
      space: definition.space,
      name: definition.name,
      icon: definition.icon || 'ph:cube-fill',
      desc: definition.desc || '',
      version: definition.version || '1.0.0',
      sort: definition.sort || 0,
    }

    // Add Module
    const moduleId = addModule(newModule)

    // Add Menus
    if (definition.menus)
      addModuleMenus(moduleId, definition.menus)
  }
}

/**
 * Load all admin modules
 */
export function loadModules() {
  Object.values(import.meta.glob<() => void>('~/modules/**/install.ts', {
    eager: true,
    import: 'default',
  }),
  ).forEach(
    module => module(),
  )
}
