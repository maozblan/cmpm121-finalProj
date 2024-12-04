import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from "svelte-preprocess";

export default {
  // eslint-disable-next-line no-undef
  base: process.env.REPO_NAME || "/project/",
  assetsInclude: ['**/*.png', '**/*.yaml'],
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
  build: {
    target: "esnext",
  },
  resolve: {
    dedupe: ["svelte"], // Ensure only one copy of Svelte is loaded by Vite
  }
};
