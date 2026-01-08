// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import personal from "./src/data/personal.json";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import icon from "astro-icon";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Nunito Sans",
        cssVariable: "--font-sans",
        weights: [400, 500, 600, 700, 800],
      },
      {
        provider: fontProviders.google(),
        name: "Cascadia Code",
        cssVariable: "--font-code",
        weights: [400, 500, 600],
      },
    ],
  },

  integrations: [
    mdx(),
    icon(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
  ],

  site: personal.site,
});
