import { loadGameData } from "./models/loadData.ts";
import { GameMap } from "./models/map.ts";
import { Player } from "./models/player.ts";
import { get, writable, type Writable } from "svelte/store";

// game variables
export const POINTS_TO_WIN: Writable<number> = writable(0);
export const MAPSIZE = 10;
export const player: Player = new Player(0, 0);
export const gameMap: GameMap = new GameMap(MAPSIZE);
export const gameState: GameState = {
  currentTurn: writable(0),
  currentIndex: 0,
  mapUpdateLedger: writable([{ map: gameMap.exportBuffer(), turn: 0 }]),
};

// a stand-in for document.cookie for testing
let document_cookie = "";

// game data from external DSL
export let gameData: null | DataStructure;
loadGameData().then((data) => {
  gameData = data;
  POINTS_TO_WIN.update((state) => {
    state = data.win_conditions.point_requirement;
    return state;
  });
});
export const chanceOfRain: Writable<number> = writable(0);

interface SaveData {
  autosave: string;
  save1: string;
  save2: string;
}

interface updateLedgerEntry {
  map: ArrayBuffer;
  turn: number;
}

// interface updateLedgerEntryStringStructure {
//   map: string;
//   turn: number;
// }

interface GameState {
  currentTurn: Writable<number>;
  currentIndex: number;
  mapUpdateLedger: Writable<updateLedgerEntry[]>;
}

// interface GameStateStringStructure {
//   currentTurn: number;
//   currentIndex: number;
//   mapUpdateLedger: updateLedgerEntry[];
// }

// map state //////////////////////////////////////////////////////////////////

export function getCurrentMap(): GameMap {
  return gameMap;
  // const state = get(gameState);
  // return state.mapUpdateLedger[state.currentIndex].map;
}

// function mapStringify(map: GameMap): string {
//   const bytes = new Uint8Array(map.exportBuffer());
//   let str = "";
//   for (let i = 0; i < bytes.byteLength; i++) {
//     str += String.fromCharCode(bytes[i]);
//   }
//   return btoa(str);
// }

// function mapParse(str64: string): void {
//   const str = atob(str64);
//   const bytes = new Uint8Array(str.length);
//   for (let i = 0; i < str.length; i++) {
//     bytes[i] = str.charCodeAt(i);
//   }
//   gameMap.loadBuffer(bytes.buffer);
// }

// update ledger //////////////////////////////////////////////////////////////

// function updateLedgerStringify(
//   ledger: updateLedgerEntry[]
// ): updateLedgerEntryStringStructure[] {
//   const strStruct: updateLedgerEntryStringStructure[] = [];
//   for (let i = 0; i < ledger.length; i++) {
//     strStruct.push({ map: mapStringify(gameMap), turn: ledger[i].turn });
//   }
//   return strStruct;
// }

// function updateLedgerParse(
//   strStruct: updateLedgerEntryStringStructure[]
// ): updateLedgerEntry[] {
//   const tmpLedger: updateLedgerEntry[] = [];
//   for (let i = 0; i < strStruct.length; i++) {
//     tmpLedger.push({
//       map: mapParse(strStruct[i].map),
//       turn: strStruct[i].turn,
//     });
//   }
//   return tmpLedger;
// }

// game state /////////////////////////////////////////////////////////////////

function GameStateStringify(state: GameState): string {
  return JSON.stringify({
    currentTurn: get(state.currentTurn),
    currentIndex: state.currentIndex,
    mapUpdateLedger: state.mapUpdateLedger,
  });
}

function GameStateParse(str: string): GameState {
  const strStruct = JSON.parse(str);
  return {
    ...strStruct,
    currentTurn: writable(strStruct.currentTurn),
  };
}

export function setTurn(turn: number) {
  gameState.currentTurn.update(() => {
    return turn;
  });
  let tempChance: number = 0;
  if (gameData) {
    const repEvent = gameData.events.repeating_event;
    if (
      turn >= repEvent.starting_turn &&
      (turn - repEvent.starting_turn) % repEvent.every === 0
    ) {
      tempChance = repEvent.chance_of_rain!;
    }
    const oneEvent = gameData.events.one_time_event;
    if (turn === oneEvent.turn) {
      tempChance = oneEvent.chance_of_rain!;
    }
  }
  chanceOfRain.update(() => {
    return tempChance;
  });
}

export function undo() {
  const ind = Math.max(gameState.currentIndex - 1, 0);
  console.log("undo: map loaded", ind, get(gameState.mapUpdateLedger), gameState.currentIndex);
  gameState.currentIndex = ind;
  gameState.currentTurn.update(() => {
    return get(gameState.mapUpdateLedger)[ind].turn;
  });
  gameMap.loadBuffer(get(gameState.mapUpdateLedger)[ind].map);
  save("autosave");
}

export function redo() {
  const max = get(gameState.mapUpdateLedger).length - 1;
  const ind = Math.min(gameState.currentIndex + 1, max);
  gameState.currentIndex = ind;
  gameState.currentTurn.update(() => {
    return get(gameState.mapUpdateLedger)[ind].turn;
  });
  gameMap.loadBuffer(get(gameState.mapUpdateLedger)[ind].map);
  save("autosave");
}

// save and load //////////////////////////////////////////////////////////////

export function save(slot: "autosave" | "save1" | "save2") {
  if (document_cookie === "") {
    const saveDataObject: SaveData = { autosave: "", save1: "", save2: "" };
    saveDataObject[slot] = GameStateStringify(gameState);
    document_cookie = JSON.stringify(saveDataObject);
  } else {
    const saveDataObject: SaveData = JSON.parse(document_cookie);
    saveDataObject[slot] = GameStateStringify(gameState);
    document_cookie = JSON.stringify(saveDataObject);
  }
}

export function tryLoad(slot: "autosave" | "save1" | "save2") {
  if (document_cookie === "") {
    console.log("tryLoad(): document_cookie is empty");
    return;
  }
  const saveDataObject: SaveData = JSON.parse(document_cookie);
  if (saveDataObject[slot] !== "") {
    const tmp: GameState = GameStateParse(saveDataObject[slot]);
    gameState.mapUpdateLedger = tmp.mapUpdateLedger;
    gameState.currentIndex = tmp.currentIndex;
    gameState.currentTurn.update(() => {
      return get(tmp.currentTurn);
    });
  }
}

// save between sessions //////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  document_cookie = JSON.parse(localStorage.getItem("savestate") || "");
});

globalThis.addEventListener("map-update", function () {
  gameState.mapUpdateLedger.update((state) => {
    state.splice(gameState.currentIndex + 1);
    state.push({ map: gameMap.exportBuffer(), turn: get(gameState.currentTurn) });
    return state;
  });
  gameState.currentIndex++;
  console.log("map-update", gameState.currentIndex, get(gameState.mapUpdateLedger));
  save("autosave");
});

globalThis.addEventListener("beforeunload", function () {
  save("autosave");
  localStorage.setItem("savestate", JSON.stringify(document_cookie));
});
