export default defineAdminPlugin(({ options }) => {
  const optionsStore = useAdminOptionsStore()
  optionsStore.update(options)
})
