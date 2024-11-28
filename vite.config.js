import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from "svelte-preprocess";

export default {
  base: Deno.env.get("REPO_NAME") || "/project",
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
