import "./style.css";
import "./gameStyle.css";
import { img } from "./views/imgs.ts";
import { createMap } from "./views/views.ts";
import { GameMap } from "./models/map.ts";

const APP_NAME = "cmpm121-final";
const app = document.querySelector<HTMLDivElement>("#app")!;

document.title = APP_NAME;
app.innerHTML = APP_NAME;
app.classList.add("col-div");

const title = document.createElement("h1");
app.append(title);

const controls = document.createElement("div");
controls.classList.add("row-div");
controls.id = "controls";
app.append(controls);

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
  <p>Left Click to sow plant</p
  <p>Right Click to reap plant</p>
  <p>Space to end turn</p>
`;
howToPlay.style.marginLeft = "20px";
container.append(howToPlay);

const image = document.createElement("img");
image.src = img.sampleImage;
// app.append(image);

// TUNEABLE GAME SETTINGS
const MAPSIZE = 10;

const gameMap: GameMap = new GameMap(MAPSIZE);
createMap(gameMap);
