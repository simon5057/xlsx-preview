import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'xlsxPreview',
      formats: ['es', 'cjs', 'umd', 'iife'],
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: ['exceljs'],
      output: [
        {
          format: 'es',
          entryFileNames: 'xlsxPreview.mjs',
          dir: 'dist',
          exports: 'named',
        },
        {
          format: 'cjs',
          entryFileNames: 'xlsxPreview.cjs',
          dir: 'dist',
          exports: 'named',
        },
        {
          format: 'umd',
          name: 'xlsxPreview',
          entryFileNames: 'xlsxPreview.umd.js',
          dir: 'dist',
          exports: 'named',
          globals: {
            exceljs: 'ExcelJS',
          },
        },
        {
          format: 'iife',
          name: 'xlsxPreview',
          entryFileNames: 'xlsxPreview.iife.js',
          dir: 'dist',
          globals: {
            exceljs: 'ExcelJS',
          },
        },
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

