<script lang="ts" setup>
import SiderSubmenu from '../sider/sider-submenu.vue'

defineOptions({
  name: 'LayoutSider',
})

const route = useRoute()

const activeModule = ref(route.meta.module)
const activeMenu = ref(route.meta.id)

watch(
  () => route.fullPath,
  async () => {
    activeModule.value = route.meta.module
    activeMenu.value = route.meta.id
  },
)

const { activeSpaceMenus } = storeToRefs(useAdminSpace())
const mainMenu = computed(() => activeSpaceMenus.value.filter(m => m.isShow && m.type === 'module'))
const subMenu = computed(() => mainMenu.value.find(m => m.module === activeModule.value)?.children || [])
const defaultExpandedKeys = computed(() => subMenu.value.map(m => m.id))
</script>

<template>
  <TAside v-if="mainMenu.length > 1" class="layout-sider-main">
    <TTooltip
      v-for="menu in mainMenu"
      :key="menu.id"
      :content="menu.desc"
      placement="right"
    >
      <RouterLink
        class="layout-sider-main__menu"
        :class="{ 'is-active': activeModule === menu.id }"
        :to="menu.path"
      >
        <i class="layout-sider-main__menu--icon">
          <CommonIcon :name="activeModule === menu.id ? `${menu.icon}-fill` : menu.icon" />
        </i>
        <span>{{ menu.name }}</span>
      </RouterLink>
    </TTooltip>
  </TAside>

  <TAside v-if="subMenu.length > 0" class="layout-sider-sub">
    <TMenu
      class="layout-sider-sub__menu"
      width="100%"
      :default-expanded="defaultExpandedKeys"
      :value="activeMenu"
    >
      <SiderSubmenu :menus="subMenu" />
    </TMenu>
  </TAside>
</template>
