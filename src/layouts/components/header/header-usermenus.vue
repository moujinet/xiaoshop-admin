<script lang="tsx" setup>
import type { DropdownProps } from 'tdesign-vue-next'
import CommonIcon from '~/components/common/common-icon.vue'

defineOptions({
  name: 'HeaderUsermenus',
})

const user = reactive({
  username: 'admin',
})

const userMenus: DropdownProps['options'] = [
  {
    content: '个人设置',
    prefixIcon: () => <CommonIcon class="header-usermenus__icon" name="ph:user" />,
    divider: true,
  },
  {
    content: '退出登录',
    prefixIcon: () => <CommonIcon class="header-usermenus__icon" name="ph:sign-out" />,
  },
]
</script>

<template>
  <TDropdown :options="userMenus" trigger="click" placement="bottom-right">
    <div class="header-usermenus">
      {{ user.username }}
      <CommonIcon class="header-usermenus__arrow" name="ph:caret-down" />
    </div>
  </TDropdown>
</template>

<style lang="less">
.header-usermenus {
  display: flex;
  cursor: pointer;
  align-items: center;
  transition: all 0.3s;
  gap: var(--td-size-3);
  color: var(--td-font-white-1);

  &__arrow {
    display: flex;
    color: var(--td-font-white-3);
  }

  &__icon {
    color: var(--td-font-gray-4)
  }
}
</style>
