import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

import Pages from "vite-plugin-pages";
import generateSitemap from "vite-plugin-pages-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      dirs: "views",
      onRoutesGenerated: async (routes) => {
        console.log(routes);
        const dynRoutes = [];
        // const categories = await fetchCategories();

        generateSitemap({
          hostname: "https://maksakov.com/",
          readable: true,
          routes: [...routes],
        });
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
