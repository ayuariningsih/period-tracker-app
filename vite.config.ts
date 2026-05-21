/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      // Automatically update Service Worker
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      // Files to cache
      workbox: {
        // Workbox is Google's Service Worker library
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        // Specifies file patterns to cache
        // ** means all directories, * means all files

        runtimeCaching: [
          {
            // API request caching
            urlPattern: /^https:\/\/api\.example\.com\/.*/i,
            // Caches API requests matching this pattern

            handler: "NetworkFirst",
            // NetworkFirst: Try network first, use cache if it fails
            // CacheFirst: Check cache first, make network request if not found
            // StaleWhileRevalidate: Show cache first, update in background

            options: {
              cacheName: "api-cache",
              // Name for this cache

              expiration: {
                maxEntries: 50,
                // Store maximum of 50 items in cache
                maxAgeSeconds: 60 * 60 * 24,
                // Cache expires after 24 hours (86400 seconds)
              },
              cacheableResponse: {
                statuses: [0, 200],
                // Only cache status codes 0 (CORS) and 200 (success)
              },
            },
          },
          {
            // Image caching
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            // Cache requests for image file extensions

            handler: "CacheFirst",
            // Images don't change often, so prioritize cache

            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
                // 30 days
              },
            },
          },
        ],
      },
      manifest: {
        name: "Menstruation Tracker App",
        // Full app name
        short_name: "Menstruation Tracker App",
        // Short name displayed on home screen
        description: "It is a Progressive Web App to track your Menstruation",
        start_url: "/",
        // The URL to load when the app starts
        theme_color: "#ffffff",
        // Color of the top bar
        background_color: "#ffffff",
        // Splash screen background color
        display: "standalone",
        // Makes it look like a native app (hides browser UI)
        orientation: "portrait",
        // Force portrait orientation
        icons: [
          {
            src: "pwa-192x192.png",
            // Small icon
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            // Large icon
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable", // Works in various environments
          },
        ],
      },
    }),
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
