interface AdminOptionsState {
  name: string
  desc: string
  version: string
  debug: boolean
}

/**
 * Admin Options Store
 */
export const useAdminOptionsStore = defineStore('options', {
  state: (): AdminOptionsState => {
    return {
      name: '',
      desc: '',
      version: '',
      debug: false,
    }
  },
  actions: {
    update(options: Partial<AdminOptionsState>) {
      this.$patch(options)
    },
  },
})
