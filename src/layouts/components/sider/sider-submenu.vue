<script lang="ts" setup>
import type { TAdminMenu } from '~/composables/runtime/types'

defineOptions({
  name: 'SiderSubmenu',
})

defineProps<{
  menus: TAdminMenu[]
}>()
</script>

<template>
  <template v-for="menu in menus" :key="menu.id">
    <template v-if="menu.isShow">
      <template v-if="!menu.children || !menu.children.length">
        <TMenuItem v-if="menu.type === 'page'" :name="menu.id" :value="menu.id" :to="{ path: menu.path }">
          <template v-if="menu.icon" #icon>
            <CommonIcon :name="menu.icon" />
          </template>
          {{ menu.name }}
        </TMenuItem>
      </template>

      <TSubmenu v-else :name="menu.id" :value="menu.id" :title="menu.name">
        <template v-if="menu.icon" #icon>
          <CommonIcon class="sub-menu__icon" :name="menu.icon" />
        </template>
        <SiderSubmenu v-if="menu.children" :menus="menu.children" />
      </TSubmenu>
    </template>
  </template>
</template>
