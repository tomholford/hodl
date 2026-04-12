/// <reference types="vitest/config" />
import packageJson from './package.json';
import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl'
import { urbitPlugin } from '@urbit/vite-plugin-urbit';
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-anonymous-default-export
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

  return defineConfig({
    base: '/apps/hodl/',
    server: {
      port: 3000,
    },
    build: {
      sourcemap: false,
    },
    plugins: [
      nodePolyfills(),
      basicSsl(),
      urbitPlugin({
        base: 'hodl',
        target: SHIP_URL,
        changeOrigin: true,
        secure: false,
      }),
      react(),
      svgr({
        include: '**/*.svg',
        svgrOptions: { exportType: 'named', ref: true },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/setup.ts',
    },
  });
};
