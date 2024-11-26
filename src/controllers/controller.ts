import { updateMap, gameState, getCurrentMap, tryLoad, save, setTurn, player, undo, redo } from "../game.ts";
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
   loadautosave: () => {tryLoad("autosave"); displayMap(getCurrentMap(), player);},
   load1: () => {tryLoad("save1"); console.log("load1"); displayMap(getCurrentMap(), player);},
   load2: () => {tryLoad("save2"); console.log("load2"); displayMap(getCurrentMap(), player);},
   save1: () => {save("save1"); console.log("save1"); displayMap(getCurrentMap(), player);},
   save2: () => {save("save2"); console.log("save2"); displayMap(getCurrentMap(), player);}
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
  player.move(direction, getCurrentMap());
  displayMap(getCurrentMap(), player);
}

function nextTurn() {
  console.log("next turn");
  setTurn(gameState.currentTurn + 1);
  updateMap(getCurrentMap().nextTurn());
  displayMap(getCurrentMap(), player);
  console.log(getCurrentMap().playScenarioCompleted());
}

function setPlantType(type: number){
  player.plantType = type;
}

// TODO currently no player location b/c no player
function plant() {
  if (getCurrentMap().getCell(player.x, player.y).hasPlant) {
    console.log("reap plant");
    updateMap(getCurrentMap().reapPlantOnCopy(player.x, player.y));
  } else {
    console.log("sow plant");
    updateMap(getCurrentMap().placePlantOnCopy(player.x, player.y, player.plantType, 1));
  }
}

function undoCmd() {
  console.log("undo");
  undo();
  displayMap(getCurrentMap(), player);

}

function redoCmd() {
  console.log("redo");
  redo();
  displayMap(getCurrentMap(), player);
}
