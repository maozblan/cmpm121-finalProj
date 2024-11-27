import { GameMap } from "./models/map.ts";
import { Player } from "./models/player.ts";

// important variables
const MAPSIZE = 10;
export const player = new Player(0, 0);
export let gameState: GameState = {
  currentTurn: 0,
  currentIndex: 0,
  mapUpdateLedger: [{ map: new GameMap(MAPSIZE), turn: 0 }],
};

//a stand-in for document.cookie for testing
let document_cookie = "";

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
  return gameState.mapUpdateLedger[gameState.currentIndex].map;
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
  gameState.currentTurn = turn;
}

export function undo() {
  gameState.currentIndex--;
  if (gameState.currentIndex < 0) {
    gameState.currentIndex = 0;
  }
  gameState.currentTurn =
    gameState.mapUpdateLedger[gameState.currentIndex].turn;
  save("autosave");
}

export function redo() {
  gameState.currentIndex++;
  if (gameState.currentIndex > gameState.mapUpdateLedger.length - 1) {
    gameState.currentIndex = gameState.mapUpdateLedger.length - 1;
  }
  gameState.currentTurn =
    gameState.mapUpdateLedger[gameState.currentIndex].turn;
  save("autosave");
}

// save and load //////////////////////////////////////////////////////////////

export function save(slot: "autosave" | "save1" | "save2") {
  if (document_cookie === "") {
    const saveDataObject: SaveData = { autosave: "", save1: "", save2: "" };
    saveDataObject[slot] = GameStateStringify(gameState);
    document_cookie = JSON.stringify(saveDataObject);
    //console.log(saveDataObject);
  } else {
    const saveDataObject: SaveData = JSON.parse(document_cookie);
    saveDataObject[slot] = GameStateStringify(gameState);
    document_cookie = JSON.stringify(saveDataObject);
    //console.log(saveDataObject);
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
    gameState = tmp;
  }
}

export function updateMap(newMap: GameMap | null) {
  if (newMap === null) return;
  gameState.mapUpdateLedger.splice(gameState.currentIndex + 1);
  gameState.mapUpdateLedger.push({
    map: newMap.copy(),
    turn: gameState.currentTurn,
  });
  gameState.currentIndex = gameState.mapUpdateLedger.length - 1;
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