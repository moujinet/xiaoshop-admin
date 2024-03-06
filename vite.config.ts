import path from 'node:path'
import type { ConfigEnv, UserConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'

import { loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { ClientSideLayout } from 'vite-plugin-vue-layouts'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import { unheadVueComposablesImports } from '@unhead/vue'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

export default ({ mode }: ConfigEnv): UserConfig => {
  // eslint-disable-next-line node/prefer-global/process
  const root = process.cwd()
  const { VITE_BASE_URL } = loadEnv(mode, root)

  return {
    base: VITE_BASE_URL,

    build: {
      target: 'es2015',
      sourcemap: true,
    },

    resolve: {
      alias: {
        '~': `${path.resolve(__dirname, 'src')}/`,
        '~~': `${path.resolve(__dirname)}/`,
      },
    },

    server: {
      host: true,
      port: 3000,
    },

    esbuild: {
      pure: mode === 'production' ? ['console.log', 'debugger'] : [],
    },

    plugins: [
      // https://github.com/vue-macros/vue-macross
      VueMacros({
        plugins: {
          vue: Vue(),
          vueJsx: VueJsx(),
        },
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      ClientSideLayout({
        importMode: 'async',
      }),

      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        dts: 'src/typed-router.d.ts',
        routesFolder: [
          'src/pages',
          {
            src: 'src/modules',
            filePatterns: '**/pages/**/*',
            path: (file) => {
              const prefix = 'src/modules'
              return `${file.slice(file.lastIndexOf(prefix) + prefix.length + 1).replace('/pages', '')}`
            },
          },
        ],
        logs: true,
        exclude: ['**/components/**'],
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        dirs: [
          'src/composables',
          'src/composables/runtime',
          'src/utils',
        ],
        imports: ['vue', 'pinia', VueRouterAutoImports, unheadVueComposablesImports],
        dts: 'src/auto-imports.d.ts',
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
        vueTemplate: true,
        injectAtEnd: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      VueComponents({
        dts: 'src/vue-components.d.ts',
        dirs: ['src/components/**'],
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView'],
          },
        ],
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),

      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
        manifest: {
          name: 'XiaoShop 开源云链小商城',
          short_name: 'XiaoShop',
          theme_color: '#0055ff',
          icons: [
            {
              src: '/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
    ],
  }
}
