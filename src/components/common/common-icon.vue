<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'CommonIcon',
})

defineProps<{
  name: string
  inline?: boolean
}>()
</script>

<template>
  <Icon :icon="name" :inline="inline" class="t-icon" />
</template>
