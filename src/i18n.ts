import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

// import translation packs 
import en from './locale/en.json';
import es from './locale/es.json';
import zh from './locale/zh.json';
import ar from './locale/ar.json';

// add translations to app
addMessages('en', en);
addMessages('es', es);
addMessages('zh', zh);
addMessages('ar', ar);

// initialize i18n and language
init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});