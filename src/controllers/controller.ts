import { updateMap, gameMap, player, undo, redo } from "../game.ts";
import { displayMap } from "../views/views.ts";
import { GameMap } from "../models/map.ts";

// interface Cmd {
//   execute(): void;
// }
// const undoBuffer: Cmd[] = [];
// const redoBuffer: Cmd[] = [];

// TODO any action should be undoable or redoable
const actions: { [key: string]: () => void } = {
  w: () => playerMove("up"),
  a: () => playerMove("left"),
  s: () => playerMove("down"),
  d: () => playerMove("right"),
  1: () => setPlantType(1),
  2: () => setPlantType(2),
  ' ': nextTurn,
  f: plant,
  undo: undoCmd,
  redo: redoCmd,
};

export default function playerInteraction(event: KeyboardEvent | MouseEvent) {
  let key: string = "";
  if (event.type === "keydown") {
    key = (event as KeyboardEvent).key;
  } else if (event.type === "click") {
    key = (event.target as HTMLElement).id;
  }
  actions[key]?.();
}

function playerMove(direction: string) {
  console.log("player move", direction);
  player.move(direction, gameMap);
  displayMap(gameMap, player);
}

function nextTurn() {
  console.log("next turn");
  updateMap(gameMap.nextTurn());
  displayMap(gameMap, player);
}

function setPlantType(type: number){
  player.plantType = type;
}

// TODO currently no player location b/c no player
function plant() {
  if (gameMap.getCell(player.x, player.y).hasPlant) {
    console.log("reap plant");
    updateMap(gameMap.reapPlantOnCopy(player.x, player.y));
  } else {
    console.log("sow plant");
    updateMap(gameMap.placePlantOnCopy(player.x, player.y, player.plantType, 1));
  }
}

function undoCmd() {
  console.log("undo");
  undo();
  displayMap(gameMap, player);

}

function redoCmd() {
  console.log("redo");
  redo();
  displayMap(gameMap, player);
}
