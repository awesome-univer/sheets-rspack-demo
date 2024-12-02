import { defineConfig } from '@rsbuild/core';
import packageJson from './package.json'

export default defineConfig({
  source: {
    define: {
      'process.env.UNIVER_VERSION': JSON.stringify(packageJson.dependencies['@univerjs/presets']),
    },
  },
  html: {
    template: './index.html',
  },
  server: {
    proxy: {
      '/universer-api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  }
});
