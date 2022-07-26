/* eslint-disable import/no-extraneous-dependencies */
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';

function generateFileName(format) {
  return `kps.${format}.js`;
}

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer,
        postcssNested,
      ],
    },
  },
  build: {
    lib: {
      name: 'kps-wc',
      entry: resolve(dirname('src/index.ts')),
      formats: ['es', 'umd', 'cjs'],
      fileName: generateFileName,
    },
  },
});
