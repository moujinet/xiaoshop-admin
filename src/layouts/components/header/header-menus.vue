<script lang="ts" setup>
defineOptions({
  name: 'HeaderMenus',
})

const store = useAdminSpace()
</script>

<template>
  <TSpace class="header-menus">
    <TTooltip v-for="space in store.spaces" :key="space.id" :content="space.desc">
      <div
        class="header-menu-item"
        :class="{ 'is-active': space.id === store.activeSpaceId }"
        @click="store.switchToSpace(space.id)"
      >
        <CommonIcon
          class="header-menu-item__icon"
          :name="space.id === store.activeSpaceId ? `${space.icon}-fill` : space.icon"
        />
        <span>{{ space.name }}</span>
      </div>
    </TTooltip>
  </TSpace>
</template>

<style lang="less">
.header-menu {
  // .header-menus
  &s {
    user-select: none;
  }

  &-item {
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--td-size-6);
    transition: all 0.3s;
    color: var(--td-font-white-2);
    border-radius: 0 0 var(--td-radius-large) var(--td-radius-large);

    &__icon {
      font-size: var(--td-font-size-title-large);
      margin-right: var(--td-size-2);
    }

    &:hover {
      color: var(--td-font-white-1);
    }

    &.is-active {
      color: var(--td-font-white-1);
      background-color: var(--x-primary-color);
    }
  }
}
</style>
