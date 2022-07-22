/* eslint-disable import/no-extraneous-dependencies */
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';

function generateFileName(format) {
  return `kps.${format}.js`;
}

export default defineConfig({
  build: {
    lib: {
      name: 'kps-wc',
      entry: resolve(dirname('src/index.ts')),
      formats: ['es', 'umd', 'cjs'],
      fileName: generateFileName,
    },
  },
});
