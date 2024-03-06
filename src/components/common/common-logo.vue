<script lang="ts" setup>
defineOptions({
  name: 'CommonLogo',
})

const options = useAdminOptionsStore()
</script>

<template>
  <RouterLink class="common-logo" to="/" :title="options.desc">
    <img src="../../assets/images/logo.png" :alt="options.name">
    <h1>{{ options.name }}</h1>
  </RouterLink>
</template>

<style lang="less">
.common-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  user-select: none;

  img {
    width: 20px;
    height: 20px;
  }

  h1 {
    color: var(--td-text-color-anti);
    font-size: var(--td-font-size-title-medium);
    line-height: 1;
    padding: 0;
    margin: 0 0 0 .5em;
    text-transform: uppercase;
  }
}
</style>
