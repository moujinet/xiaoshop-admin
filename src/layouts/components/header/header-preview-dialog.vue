<script lang="ts" setup>
defineOptions({
  name: 'HeaderPreviewDialog',
})

interface App {
  name: string
  desc: string
  qrcode: string
}

const apps = ref<App[]>([])
const visible = defineModel<boolean>('visible', { default: false, required: true })

onMounted(async () => {
  setTimeout(() => {
    apps.value = [
      {
        name: '微信小程序',
        desc: '微信扫一扫访问',
        qrcode: 'https://www.qrcode-monkey.com/img/default-preview-qr.svg',
      },
      {
        name: 'H5',
        desc: 'H5扫一扫访问',
        qrcode: 'https://www.qrcode-monkey.com/img/default-preview-qr.svg',
      },
    ]
  }, 2000)
})
</script>

<template>
  <TDialog
    v-model:visible="visible"
    class="preview-apps-dialog"
    :close-btn="false"
    :header="false"
    :footer="false"
  >
    <div class="preview-apps">
      <div v-if="!apps.length" class="preview-apps__loading">
        <TLoading />
      </div>
      <div v-for="app in apps" v-else :key="app.name" class="preview-apps__card">
        <div class="preview-apps__card--qrcode">
          <TImage class="preview-apps__card--qrcode-img" :src="app.qrcode" />
        </div>
        <div class="preview-apps__card--name">
          {{ app.name }}
        </div>
        <div class="preview-apps__card--desc">
          {{ app.desc }}
        </div>
      </div>
    </div>
  </TDialog>
</template>

<style lang="less">
.preview-apps {
  display: flex;
  justify-content: space-between;

  &__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 80px;
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--td-size-6);
    border-radius: var(--td-radius-medium);
    background-color: var(--td-gray-color-1);
    gap: var(--td-size-4);

    &--qrcode {
      border-radius: var(--td-radius-medium);
      box-shadow: var(--td-shadow-2);

      &-img {
        border-radius: var(--td-radius-medium);
        border: 4px solid var(--td-brand-color);
        width: 160px;
        height: 160px;
      }
    }

    &--name {
      color: var(--td-text-color-primary);
      font-size: var(--td-font-size-title-medium);
      font-weight: bolder;
    }

    &--desc {
      color: var(--td-text-color-placeholder);
      font-size: var(--td-font-size-mark-small);
    }
  }

  &-dialog {
    .t-dialog__body {
      padding: 0;
    }
  }
}
</style>
