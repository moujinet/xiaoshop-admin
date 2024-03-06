<script lang="ts" setup>
import headerMenus from '../header/header-menus.vue'
import HeaderNotification from '../header/header-notification.vue'
import HeaderUsermenus from '../header/header-usermenus.vue'
import HeaderLinks from '../header/header-links.vue'

defineOptions({
  name: 'LayoutHeader',
})
</script>

<template>
  <THeader class="layout-header">
    <div class="layout-header__logo">
      <CommonLogo />
    </div>

    <headerMenus />

    <div class="layout-header__user">
      <HeaderLinks />
      <TDivider layout="vertical" />
      <HeaderUsermenus />
      <HeaderNotification />
    </div>
  </THeader>
</template>
