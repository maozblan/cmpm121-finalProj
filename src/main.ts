import "./views/style.css";
import "./views/gameStyle.css";
import { mount } from "svelte";
import App from "./views/App.svelte";
import playerInteraction from "./controllers/controller.ts";
import "./locale/i18n.ts";

const APP_NAME = "cmpm121-final";
document.title = APP_NAME;

const app = mount(App, {
  target: document.getElementById("app")!,
});

// use controller to handle player interactions
document.addEventListener("keydown", playerInteraction);

export default app;

if ('serviceWorker' in navigator) {
  const BASE_PATH = location.pathname.replace(/\/$/, ''); // Get the base path dynamically
  navigator.serviceWorker
    .register(`${BASE_PATH}/service-worker.js`)
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
}

