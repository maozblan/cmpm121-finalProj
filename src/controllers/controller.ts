import {
  updateMap,
  gameState,
  getCurrentMap,
  tryLoad,
  save,
  setTurn,
  player,
  undo,
  redo,
  resetGame
} from "./game.ts";
import { MoveDirection } from "../models/player.ts";
import { PlantInfo } from "../models/PlantInfo.ts";
import { toggleTab } from "../views/tabs.ts";
import { get } from "svelte/store";

const actions: { [key: string]: () => void } = {
  w: () => playerMove(MoveDirection.UP),
  a: () => playerMove(MoveDirection.LEFT),
  s: () => playerMove(MoveDirection.DOWN),
  d: () => playerMove(MoveDirection.RIGHT),
  " ": nextTurn,
  nextTurn: () => actions[" "](),
  f: plant,
  cyclePlant: nextPlantType,
  undo: undo,
  redo: redo,
  loadautosave: () => {
    tryLoad("autosave");
  },
  load1: () => {
    console.log("input: load1");
    tryLoad("save1");
    toggleTab("load");
  },
  load2: () => {
    console.log("input: load2");
    tryLoad("save2");
    toggleTab("load");
  },
  save1: () => {
    console.log("input: save1");
    save("save1");
    toggleTab("save");
  },
  save2: () => {
    console.log("input: save2");
    save("save2");
    toggleTab("save");
  },
  save: () => toggleTab("save"),
  load: () => toggleTab("load"),
  help: () => toggleTab("help"),
};

// adding all plant types to number keys (up to 9)
if (PlantInfo.length > 9) {
  throw new Error("Too many plant types");
}
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
}

function playerMove(direction: MoveDirection) {
  player.move(direction, getCurrentMap());
}

function nextTurn() {
  setTurn(get(gameState).currentTurn + 1);
  updateMap(getCurrentMap().nextTurn());
  if (getCurrentMap().playScenarioCompleted()) {
    alert("You win!");
  }
}

function setPlantType(type: number) {
  player.plantType.set(type);
}

function nextPlantType() {
  player.plantType.update((type) => {
    return (type + 1) % PlantInfo.length
  });
}

function plant() {
  if (getCurrentMap().getCell(player.x, player.y).hasPlant) {
    updateMap(getCurrentMap().reapPlantOnCopy(player.x, player.y));
  } else {
    updateMap(
      getCurrentMap().placePlantOnCopy(player.x, player.y, get(player.plantType), 1)
    );
  }
}
