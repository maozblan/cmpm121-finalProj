import {
  gameState,
  getCurrentMap,
  tryLoad,
  save,
  setTurn,
  player,
  undo,
  redo,
} from "../game.ts";
import { MoveDirection } from "../models/player.ts";
import { PlantInfo } from "../models/PlantInfo.ts";
import { get } from "svelte/store";

const actions: { [key: string]: () => void } = {
  w: () => playerMove(MoveDirection.UP),
  a: () => playerMove(MoveDirection.LEFT),
  s: () => playerMove(MoveDirection.DOWN),
  d: () => playerMove(MoveDirection.RIGHT),
  " ": nextTurn,
  f: plant,
  undo: undo,
  redo: redo,
  loadautosave: () => {
    tryLoad("autosave");
  },
  load1: () => {
    console.log("input: load1");
    tryLoad("save1");
  },
  load2: () => {
    console.log("input: load2");
    tryLoad("save2");
  },
  save1: () => {
    console.log("input: save1");
    save("save1");
  },
  save2: () => {
    console.log("input: save2");
    save("save2");
  },
};

// adding all plant types to number keys (up to 9)
for (let i = 0; i < PlantInfo.length; i++) {
  actions[i + 1] = () => setPlantType(i);
}
// after loading this is called every turn
export default function playerInteraction(event: KeyboardEvent | MouseEvent) {
  let key: string = "";
  if (event.type === "keydown") {
    key = (event as KeyboardEvent).key;
  } else if (event.type === "click") {
    key = (event.target as HTMLElement).id;
    (event.target as HTMLButtonElement)!.blur();
  }
  actions[key]?.();
  document.dispatchEvent(new Event("update-visuals")); // TODO
}

function playerMove(direction: MoveDirection) {
  player.move(direction, getCurrentMap());
}

function nextTurn() {
  setTurn(get(gameState.currentTurn) + 1);
  getCurrentMap().nextTurn();
  if (getCurrentMap().playScenarioCompleted()) {
    alert("You win!");
  }
}

function setPlantType(type: number) {
  player.plantType = type;
}

function plant() {
  if (getCurrentMap().getCell(player.x, player.y).hasPlant) {
    getCurrentMap().reapPlant(player.x, player.y);
  } else {
    getCurrentMap().placePlant(player.x, player.y, player.plantType);
  }
  globalThis.dispatchEvent(new Event("map-update"));
}
