import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

const noCrossorigin = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html) {
      return html.replace(" crossorigin ", " ");
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react(), noCrossorigin(), visualizer()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // Animation libraries
          'animation': ['framer-motion'],

          // CrowdStrike/Foundry specific
          'crowdstrike': ['@crowdstrike/foundry-js'],

          // Shoelace UI components
          'shoelace': [
            '@shoelace-style/shoelace'
          ],

          // Other large dependencies (add as needed)
          // You can identify these using the visualizer plugin
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
});
