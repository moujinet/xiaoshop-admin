/**
 * Transform id to path
 *
 * @param id string
 * @returns string
 */
export function transId2Path(id: string): string {
  return `/${id.split('.').splice(1).join('/')}`
}

/**
 * Transform path to id
 *
 * @param id string
 * @returns string
 */
export function transPath2Id(id: string): string {
  return id.replace(/^\//, '').replace(/\//g, '.')
}
