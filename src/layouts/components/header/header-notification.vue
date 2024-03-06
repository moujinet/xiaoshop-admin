<script lang="ts" setup>
defineOptions({
  name: 'HeaderNotification',
})

const count = ref(9)
</script>

<template>
  <div class="header-notification">
    <TBadge :count="count">
      <CommonIcon class="header-notification__icon" :class="{ 'is-unread': count > 0 }" name="ph:envelope-simple" />
    </TBadge>
  </div>
</template>

<style lang="less">
.header-notification {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &__icon {
    display: flex;
    color: var(--td-font-white-2);
    font-size: var(--td-font-size-title-large);

    &.is-unread {
      color: var(--td-font-white-1);
    }
  }
}
</style>
