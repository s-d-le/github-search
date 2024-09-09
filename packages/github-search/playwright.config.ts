import { defineConfig } from "@playwright/test";

const config = defineConfig({
  name: "GitHub Search",
  testDir: "./__tests__",
  retries: 1,
});
export default config;
