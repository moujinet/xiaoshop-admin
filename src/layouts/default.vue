<script lang="ts" setup>
import LayoutHeader from './components/layout/header.vue'
import LayoutSider from './components/layout/sider.vue'
import LayoutContent from './components/layout/content.vue'
import LayoutFooter from './components/layout/footer.vue'

defineOptions({
  name: 'DefaultLayout',
})

defineProps<{
  withSider?: boolean
}>()
</script>

<template>
  <TLayout direction="horizontal" class="layout">
    <LayoutHeader />
    <TLayout direction="vertical" :class="{ 't-layout--with-sider': withSider }">
      <slot name="sider">
        <LayoutSider />
      </slot>
      <TLayout direction="horizontal" class="layout-inner">
        <slot name="default">
          <LayoutContent />
        </slot>
        <LayoutFooter />
      </TLayout>
    </TLayout>
  </TLayout>
</template>

<style lang="less">
@import './styles/index.less';
</style>
