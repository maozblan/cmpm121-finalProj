// import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// export default {
//   preprocess: vitePreprocess({
//     typescript: true,
//   }),
// };

import preprocess from 'svelte-preprocess';

export default {
  preprocess: preprocess(),
};