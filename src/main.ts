import "./style.css";
import "./gameStyle.css";
import { img } from "./views/imgs.ts";
import { createMap } from "./views/views.ts";
import playerInteraction from "./controllers/controller.ts";
import {  getCurrentMap } from "./game.ts";


const APP_NAME = "cmpm121-final";
const app = document.querySelector<HTMLDivElement>("#app")!;

document.title = APP_NAME;
app.innerHTML = APP_NAME;
app.classList.add("col-div");

const controls = document.createElement("div");
controls.classList.add("row-div");
controls.id = "controls";
app.append(controls);

controls.innerHTML = `
  <h2> TURN: <span id="turn-count">0</span> </h2>
  <button id="undo">Undo</button>
  <button id="redo">Redo</button>
  <button id="loadautosave">Load Autosave</button>
  <button id="save1">save1</button>
  <button id="load1">load1</button>
  <button id="save2">save2</button>
  <button id="load2">load2</button>
`;
document.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
  button.addEventListener("click", playerInteraction);
});

const container = document.createElement("div");
container.classList.add("row-div");
app.append(container);

const field = document.createElement("div");
field.id = "field";
container.append(field);

const howToPlay = document.createElement("div");
howToPlay.innerHTML = `
  <h2>How to Play</h2>
  <p>Use WASD to move your character</p>
  <p>F to reap/sow plants on current tile</p>
  <p>SPACE to end turn</p>
  <p>each cell will randomly receive 3-7 sun and rain each turn</p>
  <p>your plants will grow accordingly</p>
  <h2>Goal</h2>
  <p>Balance plant 1 and plant 2 to grow both to appropriate levels</p>
  <p>while still keeping plant 2 greater than plant 1</p>
`;
howToPlay.style.marginLeft = "20px";
container.append(howToPlay);

const image = document.createElement("img");
image.src = img.sampleImage;
// app.append(image);

// linking to other systems
createMap(getCurrentMap());
document.addEventListener("keydown", playerInteraction);
