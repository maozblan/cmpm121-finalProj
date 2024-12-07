import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from "svelte-preprocess";

export default {
  // eslint-disable-next-line no-undef
  base: "/cmpm121-finalProj",
  assetsInclude: ['**/*.png', '**/*.yaml'],
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        // Disable hashes in filenames
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  resolve: {
    dedupe: ["svelte"], // Ensure only one copy of Svelte is loaded by Vite
  }
};
