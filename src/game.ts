import { GameMap } from "./models/map.ts";
import { Player } from "./models/player.ts";
// TUNEABLE GAME SETTINGS
const MAPSIZE = 10;

interface SaveData {
  autosave: GameState | null;
  save1: GameState | null;
  save2: GameState | null;
}



interface updateLedgerIntry {
  map: GameMap;
  turn: number;
}

interface GameState {
  gameMap: GameMap;
  currentTurn: number;
  currentIndex: number;
  mapUpdateLedger: updateLedgerIntry[];
}


const tmpMap = new GameMap(MAPSIZE);
const tmpLedger: updateLedgerIntry = {map: tmpMap, turn: 0};
export let gameState: GameState = {
  gameMap: tmpMap,
  currentTurn: 0,
  currentIndex: 0,
  mapUpdateLedger: [tmpLedger]
}

export function save(slot: "autosave"|"save1"|"save2"){
  if(document.cookie === ""){
    const saveDataObject: SaveData = {autosave: null, save1: null, save2: null};
    saveDataObject[slot] = gameState;
    document.cookie = JSON.stringify(saveDataObject);
    console.log(saveDataObject);
    console.log(JSON.stringify(saveDataObject));
    console.log(document.cookie);
  }
  else{
    const saveDataObject: SaveData = JSON.parse(document.cookie);
    saveDataObject[slot] = gameState;
    document.cookie = JSON.stringify(saveDataObject);
    console.log(saveDataObject);
    console.log(JSON.stringify(saveDataObject));
    console.log(document.cookie);
  }
}

export function tryLoad(slot: "autosave"|"save1"|"save2"){
  if(document.cookie !== ""){
    const saveDataObject: SaveData = JSON.parse(document.cookie);
    console.log("loaded");
    if(saveDataObject[slot] !== null){
      gameState = saveDataObject[slot];
    }
  }
}

export function updateMap(newMap: GameMap | null){
  if(newMap !== null){
    gameState.gameMap = newMap;
    gameState.mapUpdateLedger.splice(gameState.currentIndex + 1);
    gameState.mapUpdateLedger.push({map: newMap, turn: gameState.currentTurn});
    gameState.currentIndex = gameState.mapUpdateLedger.length - 1;
    save("autosave");
  }
  document.dispatchEvent(new Event("update"));
}

export function setTurn(turn: number){
  gameState.currentTurn = turn;
}

export function undo(){
  gameState.currentIndex--;
  if(gameState.currentIndex < 0){
    gameState.currentIndex = 0;
  }
  gameState.gameMap = gameState.mapUpdateLedger[gameState.currentIndex].map;
  gameState.currentTurn = gameState.mapUpdateLedger[gameState.currentIndex].turn;
  save("autosave");
  document.dispatchEvent(new Event("update"));
}

export function redo(){
  gameState.currentIndex++;
  if(gameState.currentIndex > gameState.mapUpdateLedger.length - 1){
    gameState.currentIndex = gameState.mapUpdateLedger.length - 1;
  }
  gameState.gameMap = gameState.mapUpdateLedger[gameState.currentIndex].map;
  gameState.currentTurn = gameState.mapUpdateLedger[gameState.currentIndex].turn;
  save("autosave");
  document.dispatchEvent(new Event("update"));
}
export const player = new Player(0, 0);
