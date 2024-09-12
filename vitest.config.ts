// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // Use jsdom for testing React components
    setupFiles: ["./vitest.setup.ts"], // Optional: setup file for global configurations
    globals: true, // Optional: if you want to use globals like `describe` and `it`
    include: ["src/**/*.test.tsx", "src/**/*.test.ts"], // Specify test file patterns
  },
});
