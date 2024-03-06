<script lang="ts" setup>
import HeaderPreviewDialog from './header-preview-dialog.vue'

defineOptions({
  name: 'HeaderLinks',
})

const visible = ref(false)

function showQRCodeDialog() {
  visible.value = true
}
</script>

<template>
  <TSpace>
    <TTooltip content="访问应用">
      <div class="header-link" @click="showQRCodeDialog">
        <CommonIcon class="header-link__icon" name="ph:qr-code" inline />
        访问应用
      </div>
    </TTooltip>

    <TTooltip content="使用帮助">
      <RouterLink class="header-link" to="/">
        <CommonIcon class="header-link__icon" name="ph:question" inline />
        使用帮助
      </RouterLink>
    </TTooltip>
  </TSpace>

  <HeaderPreviewDialog v-model:visible="visible" />
</template>

<style lang="less">
.header-link {
  display: flex;
  align-items: center;
  color: var(--td-font-white-2);
  font-size: var(--td-font-size-link-medium);
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
  gap: var(--td-size-2);

  &__icon {
    color: var(--td-success-color-4);
    font-size: var(--td-font-size-link-large);
  }

  &:hover {
    color: var(--td-font-white-1);

    .header-link__icon {
      color: var(--td-font-white-1);
    }
  }
}
</style>
