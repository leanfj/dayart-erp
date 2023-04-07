import { configDefaults, defineConfig } from "vitest/config";
require('dotenv').config(
  {
      path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development'
  }
);
export default defineConfig({
  define: {},
  test: {
    clearMocks: true,
    globals: true,
    setupFiles: ['dotenv/config']
  },
});
