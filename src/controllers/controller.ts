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
} from "../game.ts";
import { MoveDirection } from "../models/player.ts";

const actions: { [key: string]: () => void } = {
  w: () => playerMove(MoveDirection.UP),
  a: () => playerMove(MoveDirection.LEFT),
  s: () => playerMove(MoveDirection.DOWN),
  d: () => playerMove(MoveDirection.RIGHT),
  1: () => setPlantType(0),
  2: () => setPlantType(1),
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
  document.dispatchEvent(new Event("update-visuals"));
}

function playerMove(direction: MoveDirection) {
  player.move(direction, getCurrentMap());
}

function nextTurn() {
  setTurn(gameState.currentTurn + 1);
  updateMap(getCurrentMap().nextTurn());
  console.log(getCurrentMap().playScenarioCompleted());
}

function setPlantType(type: number) {
  player.plantType = type;
}

function plant() {
  if (getCurrentMap().getCell(player.x, player.y).hasPlant) {
    updateMap(getCurrentMap().reapPlantOnCopy(player.x, player.y));
  } else {
    updateMap(
      getCurrentMap().placePlantOnCopy(player.x, player.y, player.plantType, 1)
    );
  }
}
