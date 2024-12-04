import "./style.css";
import "./gameStyle.css";
import { mount } from "svelte";
import App from "./views/App.svelte";
import playerInteraction from "./controllers/controller.ts";

const APP_NAME = "cmpm121-final";
document.title = APP_NAME;

const app = mount(App, {
  target: document.getElementById("app")!,
});

// use controller to handle player interactions
document.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
  button.addEventListener("click", playerInteraction);
});
document.addEventListener("keydown", playerInteraction);

export default app;
