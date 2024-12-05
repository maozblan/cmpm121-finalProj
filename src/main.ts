import "./style.css";
import "./gameStyle.css";
import { mount } from "svelte";
import App from "./views/App.svelte";
import playerInteraction from "./controllers/controller.ts";
import { createMap } from "./views/view.ts";
import { getCurrentMap } from "./game.ts";

const APP_NAME = "cmpm121-final";
document.title = APP_NAME;

const app = mount(App, {
  target: document.getElementById("app")!,
});

// use controller to handle player interactions
document.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
  button.addEventListener("click", playerInteraction);
});
createMap(getCurrentMap()); // TODO
document.addEventListener("keydown", playerInteraction);

export default app;
