import { loadGameData } from "../models/loadData.ts";
import { GameMap } from "../models/map.ts";
import { Player } from "../models/player.ts";
import { get, writable, type Writable } from "svelte/store";

// game variables
export const POINTS_TO_WIN: Writable<number> = writable(0);
export const MAPSIZE = 10;
export const player: Player = new Player(0, 0);
export const gameState: Writable<GameState> = writable({
  currentTurn: 0,
  currentIndex: 0,
  mapUpdateLedger: [{ map: new GameMap(MAPSIZE), turn: 0 }],
});

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
  map: GameMap;
  turn: number;
}

interface updateLedgerEntryStringStructure {
  map: string;
  turn: number;
}

interface GameState {
  currentTurn: number;
  currentIndex: number;
  mapUpdateLedger: updateLedgerEntry[];
}

// map state //////////////////////////////////////////////////////////////////

export function getCurrentMap(): GameMap {
  const state = get(gameState);
  return state.mapUpdateLedger[state.currentIndex].map;
}

interface GameStateStringStructure {
  currentTurn: number;
  currentIndex: number;
  mapUpdateLedger: updateLedgerEntryStringStructure[];
}

function mapStringify(map: GameMap): string {
  const bytes = new Uint8Array(map.exportBuffer());
  let str = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str);
}

function mapParse(str64: string): GameMap {
  const str = atob(str64);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  const tmpGameMap = new GameMap(MAPSIZE);

  tmpGameMap.loadBuffer(bytes.buffer);
  return tmpGameMap;
}

// update ledger //////////////////////////////////////////////////////////////

function updateLedgerStringify(
  ledger: updateLedgerEntry[]
): updateLedgerEntryStringStructure[] {
  const strStruct: updateLedgerEntryStringStructure[] = [];
  for (let i = 0; i < ledger.length; i++) {
    strStruct.push({ map: mapStringify(ledger[i].map), turn: ledger[i].turn });
  }
  return strStruct;
}

function updateLedgerParse(
  strStruct: updateLedgerEntryStringStructure[]
): updateLedgerEntry[] {
  const tmpLedger: updateLedgerEntry[] = [];
  for (let i = 0; i < strStruct.length; i++) {
    tmpLedger.push({
      map: mapParse(strStruct[i].map),
      turn: strStruct[i].turn,
    });
  }
  return tmpLedger;
}

// game state /////////////////////////////////////////////////////////////////

function GameStateStringify(state: GameState): string {
  const strStruct: GameStateStringStructure = {
    currentTurn: state.currentTurn,
    currentIndex: state.currentIndex,
    mapUpdateLedger: updateLedgerStringify(state.mapUpdateLedger),
  };
  return JSON.stringify(strStruct);
}

function GameStateParse(str: string): GameState {
  const strStruct: GameStateStringStructure = JSON.parse(str);

  const tmpState: GameState = {
    currentTurn: strStruct.currentTurn,
    currentIndex: strStruct.currentIndex,
    mapUpdateLedger: updateLedgerParse(strStruct.mapUpdateLedger),
  };
  return tmpState;
}

export function setTurn(turn: number) {
  gameState.update((state) => {
    return { ...state, currentTurn: turn };
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
  console.log("undo");
  const ind = Math.max(get(gameState).currentIndex - 1, 0);
  gameState.update((state) => {
    return {
      ...state,
      currentIndex: ind,
      currentTurn: state.mapUpdateLedger[ind].turn,
    };
  });
  save("autosave");
}

export function redo() {
  const max = get(gameState).mapUpdateLedger.length - 1;
  const ind = Math.min(get(gameState).currentIndex + 1, max);
  gameState.update((state) => {
    return {
      ...state,
      currentIndex: ind,
      currentTurn: state.mapUpdateLedger[ind].turn,
    };
  });
  save("autosave");
}

// save and load //////////////////////////////////////////////////////////////

export function save(slot: "autosave" | "save1" | "save2") {
  if (document_cookie === "") {
    const saveDataObject: SaveData = { autosave: "", save1: "", save2: "" };
    saveDataObject[slot] = GameStateStringify(get(gameState));
    document_cookie = JSON.stringify(saveDataObject);
  } else {
    const saveDataObject: SaveData = JSON.parse(document_cookie);
    saveDataObject[slot] = GameStateStringify(get(gameState));
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
    gameState.update(() => {
      return { ...tmp };
    });
  }
}

export function updateMap(newMap: GameMap | null) {
  if (newMap === null) return;
  const gs = get(gameState);
  gs.mapUpdateLedger.splice(gs.currentIndex + 1);
  gs.mapUpdateLedger.push({
    map: newMap.copy(),
    turn: gs.currentTurn,
  });
  gs.currentIndex = gs.mapUpdateLedger.length - 1;
  gameState.update(() => {
    return { ...gs };
  });
  save("autosave");
}

// reset function /////////////////////////////////////////////////////////////
export function resetGame() {
  gameState.update(() => {
    return {
      currentTurn: 0,
      currentIndex: 0,
      mapUpdateLedger: [{ map: new GameMap(MAPSIZE), turn: 0 }],
    };
  });
  save("autosave");
}

// save between sessions //////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  document_cookie = JSON.parse(localStorage.getItem("savestate") || "");
});

globalThis.addEventListener("beforeunload", function () {
  save("autosave");
  localStorage.setItem("savestate", JSON.stringify(document_cookie));
});
