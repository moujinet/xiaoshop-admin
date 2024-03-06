<script lang="ts" setup>
defineOptions({
  name: 'LayoutFooter',
})

const options = useAdminOptionsStore()
</script>

<template>
  <TFooter class="layout-footer">
    <div>
      Copyright &copy; 2023-{{ new Date().getFullYear() }} {{ options.name }} All Rights Reserved.
    </div>

    <TSpace class="layout-footer__links" size="small">
      <template #separator>
        <TDivider layout="vertical" />
      </template>

      <RouterLink to="/" target="_blank">
        技术支持
      </RouterLink>
      <RouterLink to="/" target="_blank">
        意见反馈
      </RouterLink>
      <RouterLink to="/" target="_blank">
        版本更新
      </RouterLink>
    </TSpace>
  </TFooter>
</template>
