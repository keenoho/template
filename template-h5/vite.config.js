import { btoa } from 'buffer';
import process from 'process';
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import portfinder from 'portfinder';
import postcssImport from 'postcss-import';
import postcssPx2rem from 'postcss-plugin-px2rem';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import viteEjsPlugin from '@keenoho/vite-plugin-ejs';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import legacy from '@vitejs/plugin-legacy';

const rootPath = process.cwd();
const resolvePath = (filePath) => path.resolve(rootPath, filePath);

// ejs
function ejsRender() {
  return viteEjsPlugin(function (config) {
    const appConf = config.env;
    return {
      appConf: btoa(encodeURIComponent(JSON.stringify(appConf))),
      ...config.env,
    };
  });
}

// external
function externalsGenerator(mode) {
  if (mode != 'development') {
    return {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      dayjs: 'dayjs',
      'crypto-js': 'CryptoJS',
      clipboard: 'ClipboardJS',
      'decimal.js': 'Decimal',
      uuid: 'uuid',
      md5: 'MD5',
      '@keenoho/sdk': 'Keenoho',
    };
  }

  return {};
}

// useable port
function findUsablePort(start = 3000, stop = 4999) {
  return new Promise((r, j) => {
    portfinder.getPort(
      {
        port: start,
        stopPort: stop,
      },
      (err, port) => {
        if (err) {
          j(err);
        } else {
          r(port);
        }
      }
    );
  });
}

/**
 * 启动
 * command: serve, build, preview
 * mode: development production test
 * */
export default defineConfig(async ({ mode }) => {
  const port = await findUsablePort();

  return {
    root: rootPath,
    base: '/',
    mode,
    plugins: [
      ejsRender(), // ejs
      vue(), // vue
      viteExternalsPlugin(externalsGenerator(mode)), // extranal
      AutoImport({
        imports: ['vue', 'vue-router', 'vuex'],
        resolvers: [],
      }),
      Components({
        resolvers: [],
      }),
      legacy(),
    ],
    publicDir: 'public',
    envDir: 'env',
    envPrefix: ['CONFIG'],
    css: {
      modules: {
        scopeBehaviour: 'global',
        generateScopedName: '[local]_[hash:base64:8]',
        localsConvention: 'camelCaseOnly',
      },
      postcss: {
        plugins: [
          autoprefixer(),
          postcssImport(),
          postcssPx2rem({
            rootValue: 100,
            exclude: /(node_modules)/i,
            selectorBlackList: ['html', 'body', 'keep-px'],
          }),
        ],
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.css', '.less', '.vue'],
      alias: {
        '@': resolvePath('./src'),
      },
    },
    server: {
      cors: true,
      host: '0.0.0.0',
      port,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,request-origin',
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      assetsInlineLimit: 0,
      cssCodeSplit: true,
      emptyOutDir: true,
      sourcemap: false,
      modulePreload: true,
      rollupOptions: {},
    },
    preview: {
      open: true,
      cors: true,
      host: '0.0.0.0',
      port,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,request-origin',
      },
    },
  };
});
