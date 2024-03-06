export function omit<
  T extends Record<string, any>,
  K extends string,
  K2 extends keyof T,
>(obj: T, keys: (K | K2)[]) {
  const result = { ...obj }

  keys.forEach((key) => {
    delete result[key]
  })

  return result as Omit<T, K>
}
