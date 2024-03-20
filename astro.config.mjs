import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import moonlightTheme from "./src/utils/moonlight.json";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), mdx()],
  markdown: {
    shikiConfig: {
      theme: moonlightTheme,
    },
  },
});
