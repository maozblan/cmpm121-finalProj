// src/i18n.js
import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

import en from './locale/en.json';
import es from './locale/es.json';
import zh from './locale/zh.json';
import ar from './locale/ar.json';


addMessages('en', en);
addMessages('es', es);
addMessages('zh', zh);
addMessages('ar', ar);

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});