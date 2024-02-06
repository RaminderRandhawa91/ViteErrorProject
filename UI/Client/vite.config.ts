import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import buildSanitize from "./vite-plugin-build-sanitize";
import fs from 'fs';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const mpa = require('vite-plugin-mpa')
const htmlTemplate = require('vite-plugin-html-template')



function viteImportmapPlugin() {
  const assetUrl = "./assets/vue.esm-browser.js";

  if (doesFileExist(assetUrl)) {
    const importmapObj = {
      "vue": `${assetUrl}`
    }

    const keys = Object.keys(importmapObj);
    return {
      name: 'vite-plugin-importmap',
      enforce: 'pre',
      // 1. insert to optimizeDeps.exclude to prevent pre-transform
      config(config) {
        config.optimizeDeps = {
          ...(config.optimizeDeps ?? {}),
          exclude: [...(config.optimizeDeps?.exclude ?? []), ...keys],
        };
      },
      // 2. push a plugin to rewrite the 'vite:import-analysis' prefix
      configResolved(resolvedConfig) {
        const VALID_ID_PREFIX = `/@id/`;
        const reg = new RegExp(`${VALID_ID_PREFIX}(${keys.join('|')})`, 'g');
        resolvedConfig.plugins.push({
          name: 'vite-plugin-importmap-replace-idprefix',
          transform: (code) =>
            reg.test(code) ? code.replace(reg, (m, s1) => s1) : code,
        });
      },
      // 3. rewrite the id before 'vite:resolve' plugin transform to 'node_modules/...'
      resolveId: (id) => importmapObj[id] && { id, external: true },
      // 4. inject importmap script to head-prepend before '@vite/client' scripts tag
      transformIndexHtml: {
        enforce: 'pre',
        transform: (html) => ({
          html,
          tags: [
            {
              tag: 'script',
              attrs: { type: 'importmap' },
              injectTo: 'head-prepend',
              children: JSON.stringify({ imports: importmapObj }, null, 2),
            }
          ],
        }),
      },
    };
  }
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteImportmapPlugin(),
    VueI18nPlugin({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      compositionOnly: true,
      include: resolve(__dirname, "./src/assets/locales/**"),
    }),
    mpa.default({
      open: "./page1.html",
    }),
    htmlTemplate.default({
      pages: {
        page1: {
          title: "Page 1",
        },
        page2: {
          title: "Page 2",
        }
      }
    }),
    buildSanitize(),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "devextreme/ui": "devextreme/esm/ui",
      '@bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  build: {
    target: "esnext",
    outDir: "../../TestProject/wwwroot",
    emptyOutDir: false,
    commonjsOptions: {
      esmExternals: ['vue']
    },

    rollupOptions: {
      treeshake: false,
      cache: false,
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:50808/TestProject1",
        changeOrigin: true,
      }
    }
  },
});

// Check if file exists
function doesFileExist(path) {  
  try {
    let resolvedPath = `${path}`
    if (fs.existsSync(resolvedPath)) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
}

