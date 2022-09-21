/// <reference types="vitest" />
import packageJson from './package.json';
import { loadEnv, defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { urbitPlugin } from '@urbit/vite-plugin-urbit';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const app = process.env.APP || 'hodl';
  process.env.VITE_APP = app;
  process.env.VITE_STORAGE_VERSION =
    mode === 'dev' ? Date.now().toString() : packageJson.version;

  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL =
    process.env.SHIP_URL ||
    process.env.VITE_SHIP_URL ||
    'http://localhost:8080';
  console.log(SHIP_URL);

  const base = (mode: string, app: string) => {
    return '/apps/hodl/';
  };

  const plugins = (mode: string, app: string) => {
    if (mode === 'mock' || mode === 'staging') {
      return [reactRefresh(), pluginRewriteAll()];
    }

    return [
      urbitPlugin({
        base: 'hodl',
        target: SHIP_URL,
        changeOrigin: true,
        secure: false,
      }),
      reactRefresh(),
    ];
  };

  console.log(process.env.APP);
  console.log(mode, app, base(mode, app));

  return defineConfig({
    base: base(mode, app),
    build: {
      sourcemap: false,
    },
    plugins: plugins(mode, app),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/setup.ts',
      deps: {},
    },
  });
};
