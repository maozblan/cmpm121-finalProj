import { gameData, gameMap } from "../game.ts";

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
  ' ': nextTurn,
  f: plant,
};

export default function playerInteraction(event: KeyboardEvent) {
  actions[event.key]?.();
}

function playerMove(direction: string) {
  console.log("player move", direction);
}

function nextTurn() {
  console.log("next turn");
  gameMap.nextTurn();
  gameData.turn++;
  document.dispatchEvent(new Event("update"));
}

// TODO currently no player location b/c no player
function plant() {
  const mock = { x: 0, y: 0 };
  if (gameMap.getCell(mock.x, mock.y).hasPlant) {
    console.log("reap plant");
    gameMap.reapPlant(mock.x, mock.y);
  } else {
    console.log("sow plant");
    gameMap.placePlant(mock.x, mock.y, 0, 1);
  }
}
